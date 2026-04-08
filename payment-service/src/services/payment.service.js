import crypto from 'crypto';
import { BadRequestException } from '@moviet/shared/helpers/exception.helper.js';

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
        const amount = Number(req.body?.amount);
        const orderInfo = req.body?.orderInfo || 'Thanh toan don hang';
        const extraData = req.body?.extraData || '';

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

        return {
            resultCode: 0,
            message: 'Success',
        };
    },
};
