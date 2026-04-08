import { showtimeService } from '../services/showtime.service.js';
import { responseSuccess } from '@moviet/shared/helpers/response.helper.js';

export const showtimeController = {
    getShowtimesByMovieId: async (req, res, next) => {
        try {
            const result = await showtimeService.getShowtimesByMovie(req);
            const response = responseSuccess(result, 'Get showtimes by movie ID successfully');
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    getShowtimeDetail: async (req, res, next) => {
        try {
            const result = await showtimeService.getShowtimeDetail(req);
            const response = responseSuccess(result, 'Get showtime detail successfully');
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    }
};
