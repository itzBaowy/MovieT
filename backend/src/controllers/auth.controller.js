import { authService } from '../services/auth.service.js';
import { responseSuccess } from '../common/helpers/response.helper.js';

export const authController = {
  register: async (req, res, next) => {
    try {
      const result = await authService.register(req);
      const response = responseSuccess(result, `Register successful`, 201);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authService.login(req);
      const response = responseSuccess(result, `Login successful`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const result = await authService.refreshToken(req);
      const response = responseSuccess(result, `Refresh token successful`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  getInfo: async (req, res, next) => {
    try {
      const result = await authService.getInfo(req);
      const response = responseSuccess(result, `Get info successful`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  updateInfo: async (req, res, next) => {
    try {
      const result = await authService.updateInfo(req);
      const response = responseSuccess(result, `Update info successful`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
};
