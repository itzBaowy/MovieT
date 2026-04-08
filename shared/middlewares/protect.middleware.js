import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../helpers/exception.helper.js';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Trả về ForbiddenException (403) để FE biết cần Refresh Token
        next(new Error("Token Expired")); // Will be handled by appErorr to set 403
      } else {
        next(new UnauthorizedException("Token không hợp lệ"));
      }
    }
  } else {
    next(new UnauthorizedException("Vui lòng đăng nhập để tiếp tục"));
  }
};