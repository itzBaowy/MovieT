import { responseSuccess } from '@moviet/shared/helpers/response.helper.js';
import { ticketService } from '../services/ticket.service.js';

export const ticketController = {
    getMyTickets: async (req, res, next) => {
        try {
            const result = await ticketService.getMyTickets(req);
            const response = responseSuccess(result, 'Get my tickets successfully');
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },
};
