import { responseError } from "./function.helper.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "./status-code.helper.js";

/**
 * Để ở cuối để gom tất cả các lỗi có trong dự án
 */
export const appErorr = (err, req, res, next) => {
    console.log(`Error from middleware: `, err);

    if (err instanceof jwt.JsonWebTokenError) {
        err.code = statusCodes.UNAUTHORIZED; // 401 => FE logout người dùng
        err.message = "Invalid Token";
    }
    if (err instanceof jwt.TokenExpiredError) {
        err.code = statusCodes.FORBIDDEN; // 403 => FE sẽ gọi api POST: api/auth/refresh-token
        err.message = "Token Expired";
    }

    // Xử lý mã lỗi Prisma hoặc JWT
    let statusCode = err.code;
    if (typeof statusCode !== 'number' || statusCode < 100 || statusCode > 599) {
        statusCode = statusCodes.INTERNAL_SERVER_ERROR; // Mặc định 500
    }

    const response = responseError(err?.message, statusCode);
    res.status(response.statusCode).json(response);
};
