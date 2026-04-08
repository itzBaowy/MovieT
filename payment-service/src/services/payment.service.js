import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { BadRequestException, ForbiddenException, UnauthorizedException } from '@moviet/shared/helpers/exception.helper.js';

const momoOrderStore = new Map();

const buildMomoCreateRawSignature = ({
    accessKey,
    amount,
    extraData,
    ipnUrl,
    orderId,
    orderInfo,
    partnerCode,
    redirectUrl,
    requestId,
    requestType,
}) => {
    return `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
};

const buildMomoIpnRawSignature = (payload) => {
    const orderedKeys = [
        'accessKey',
        'amount',
        'extraData',
        'message',
        'orderId',
        'orderInfo',
        'orderType',
        'partnerCode',
        'payType',
        'requestId',
        'responseTime',
        'resultCode',
        'transId',
    ];

    return orderedKeys
        .filter((key) => payload[key] !== undefined && payload[key] !== null)
        .map((key) => `${key}=${payload[key]}`)
        .join('&');
};

const signWithHmacSha256 = (rawSignature, secretKey) => {
    return crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
};

const verifyMomoResultSignature = (momoResult) => {
    const secretKey = process.env.MOMO_SECRET_KEY;
    const accessKey = process.env.MOMO_ACCESS_KEY;

    if (!secretKey || !accessKey) {
        throw new BadRequestException('Thiếu MOMO_SECRET_KEY hoặc MOMO_ACCESS_KEY trong environment');
    }

    const receivedSignature = momoResult?.signature;
    if (!receivedSignature) return false;

    const signaturePayload = {
        ...momoResult,
        accessKey,
    };

    const rawSignature = buildMomoIpnRawSignature(signaturePayload);
    const expectedSignature = signWithHmacSha256(rawSignature, secretKey);

    return expectedSignature === receivedSignature;
};

const buildQueryStringFromObject = (obj) => {
    const query = new URLSearchParams();

    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            query.append(key, String(value));
        }
    });

    return query.toString();
};

export const paymentService = {
    createMomoPayment: async (req) => {
        const userId = req.user?.id;
        const amount = Number(req.body?.amount);
        const orderInfo = req.body?.orderInfo || 'Thanh toan don hang';
        const extraData = req.body?.extraData || '';

        if (!userId) {
            throw new UnauthorizedException('Vui lòng đăng nhập để thanh toán');
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            throw new BadRequestException('amount phải là số dương hợp lệ');
        }

        const partnerCode = process.env.MOMO_PARTNER_CODE;
        const accessKey = process.env.MOMO_ACCESS_KEY;
        const secretKey = process.env.MOMO_SECRET_KEY;
        const momoApiUrl = process.env.MOMO_API_URL;
        const redirectUrl = process.env.MOMO_REDIRECT_URL;
        const ipnUrl = process.env.MOMO_IPN_URL;

        if (!partnerCode || !accessKey || !secretKey || !momoApiUrl || !redirectUrl || !ipnUrl) {
            throw new BadRequestException('Thiếu cấu hình MoMo environment variables');
        }

        const providedOrderId = req.body?.orderId;
        const requestId = `${Date.now()}`;
        const orderId = providedOrderId || `MOVIET_${requestId}`;
        const requestType = 'captureWallet';

        const rawSignature = buildMomoCreateRawSignature({
            accessKey,
            amount,
            extraData,
            ipnUrl,
            orderId,
            orderInfo,
            partnerCode,
            redirectUrl,
            requestId,
            requestType,
        });

        const signature = signWithHmacSha256(rawSignature, secretKey);

        const momoRequestBody = {
            partnerCode,
            partnerName: 'MovieT',
            storeId: 'MovieT',
            requestId,
            amount: String(amount),
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang: 'vi',
            requestType,
            autoCapture: true,
            extraData,
            signature,
        };

        const momoResponse = await fetch(momoApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(momoRequestBody),
        });

        const momoResult = await momoResponse.json();

        if (!momoResponse.ok) {
            throw new BadRequestException(momoResult?.message || 'MoMo create payment failed');
        }

        momoOrderStore.set(orderId, {
            orderId,
            userId,
            amount,
            paid: false,
            createdAt: Date.now(),
            extraData,
        });

        return {
            orderId,
            requestId,
            amount,
            paymentUrl: momoResult?.payUrl,
            deeplink: momoResult?.deeplink,
            qrCodeUrl: momoResult?.qrCodeUrl,
            resultCode: momoResult?.resultCode,
            message: momoResult?.message,
            raw: momoResult,
        };
    },

    buildResultRedirectUrl: async (req) => {
        const frontendBaseUrl = process.env.FRONTEND_PAYMENT_RESULT_URL;

        if (!frontendBaseUrl) {
            throw new BadRequestException('Thiếu FRONTEND_PAYMENT_RESULT_URL trong environment');
        }

        const queryString = buildQueryStringFromObject(req.query || {});
        return queryString ? `${frontendBaseUrl}?${queryString}` : frontendBaseUrl;
    },

    handleMomoIpn: async (req) => {
        const payload = req.body || {};
        const receivedSignature = payload.signature;
        const secretKey = process.env.MOMO_SECRET_KEY;
        const accessKey = process.env.MOMO_ACCESS_KEY;

        if (!secretKey || !accessKey) {
            throw new BadRequestException('Thiếu MOMO_SECRET_KEY hoặc MOMO_ACCESS_KEY trong environment');
        }

        if (!receivedSignature) {
            return {
                resultCode: 97,
                message: 'Invalid signature',
            };
        }

        const signaturePayload = {
            ...payload,
            accessKey,
        };

        const rawSignature = buildMomoIpnRawSignature(signaturePayload);
        const expectedSignature = signWithHmacSha256(rawSignature, secretKey);

        if (expectedSignature !== receivedSignature) {
            return {
                resultCode: 97,
                message: 'Invalid signature',
            };
        }

        if (Number(payload.resultCode) === 0 && payload.orderId) {
            const existingOrder = momoOrderStore.get(payload.orderId) || {};
            momoOrderStore.set(payload.orderId, {
                ...existingOrder,
                orderId: payload.orderId,
                amount: Number(payload.amount || existingOrder.amount || 0),
                paid: true,
                paidAt: Date.now(),
            });
        }

        return {
            resultCode: 0,
            message: 'Success',
        };
    },

    confirmMomoPayment: async (req) => {
        const userId = req.user?.id;
        const { orderId, momoResult } = req.body || {};
        const bookingSecret = process.env.PAYMENT_BOOKING_SECRET;

        if (!userId) {
            throw new UnauthorizedException('Vui lòng đăng nhập để xác nhận thanh toán');
        }

        if (!bookingSecret) {
            throw new BadRequestException('Thiếu PAYMENT_BOOKING_SECRET trong environment');
        }

        if (!orderId) {
            throw new BadRequestException('Thiếu dữ liệu xác nhận booking');
        }

        const order = momoOrderStore.get(orderId);
        if (!order) {
            throw new BadRequestException('Không tìm thấy giao dịch MoMo');
        }

        if (order.userId && order.userId !== userId) {
            throw new ForbiddenException('Bạn không có quyền xác nhận giao dịch này');
        }

        if (!order.paid) {
            const isValidMomoResult = momoResult && verifyMomoResultSignature(momoResult);

            if (!isValidMomoResult) {
                throw new BadRequestException('Giao dịch chưa được MoMo xác nhận thành công');
            }

            if (Number(momoResult.resultCode) !== 0) {
                throw new BadRequestException('Giao dịch MoMo không thành công');
            }

            if (String(momoResult.orderId || '') !== String(orderId)) {
                throw new BadRequestException('Mã đơn hàng không khớp kết quả MoMo');
            }

            if (Number(momoResult.amount) !== Number(order.amount)) {
                throw new BadRequestException('Số tiền MoMo trả về không khớp');
            }

            momoOrderStore.set(orderId, {
                ...order,
                paid: true,
                paidAt: Date.now(),
            });
        }

        let parsedExtraData = {};
        try {
            parsedExtraData = order.extraData ? JSON.parse(order.extraData) : {};
        } catch (error) {
            throw new BadRequestException('extraData giao dịch không hợp lệ');
        }

        const showtimeId = String(parsedExtraData.showtimeId || '');
        const tokenSeatsRaw = Array.isArray(parsedExtraData.seats) ? parsedExtraData.seats : [];
        const normalizedSeats = [...new Set(tokenSeatsRaw.map((seat) => String(seat).trim().toUpperCase()))].filter(Boolean);

        if (!showtimeId || normalizedSeats.length === 0) {
            throw new BadRequestException('Thiếu dữ liệu showtime/seats trong order đã thanh toán');
        }

        const bookingToken = jwt.sign(
            {
                userId,
                orderId,
                showtimeId,
                seats: normalizedSeats,
                amount: Number(order.amount),
                paymentType: 'MOMO',
            },
            bookingSecret,
            { expiresIn: '10m' },
        );

        return {
            bookingToken,
            orderId,
        };
    },
};
