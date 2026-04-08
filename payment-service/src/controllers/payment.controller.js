import { responseSuccess } from '@moviet/shared/helpers/response.helper.js';
import { paymentService } from '../services/payment.service.js';

export const paymentController = {
    createMomoPayment: async (req, res, next) => {
        try {
            const result = await paymentService.createMomoPayment(req);
            const response = responseSuccess(result, 'Create MoMo payment success');
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    handleMomoResult: async (req, res, next) => {
        try {
            const redirectUrl = await paymentService.buildResultRedirectUrl(req);
            res.redirect(redirectUrl);
        } catch (error) {
            next(error);
        }
    },

    handleMomoIpn: async (req, res, next) => {
        try {
            const result = await paymentService.handleMomoIpn(req);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};
