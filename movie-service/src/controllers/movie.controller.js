import { movieService } from '../services/movie.service.js';
import { responseSuccess } from '@moviet/shared/helpers/response.helper.js';

export const movieController = {
    getMovies: async (req, res, next) => {
        try {
            const result = await movieService.getMovies(req);
            const response = responseSuccess(result, "Get movies success");
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    getMovieDetail: async (req, res, next) => {
        try {
            const result = await movieService.getMovieDetail(req);
            const response = responseSuccess(result, "Get movie detail success");
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    createMovie: async (req, res, next) => {
        try {
            const result = await movieService.createMovie(req);
            const response = responseSuccess(result, "Create movie success", 201);
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    updateMovie: async (req, res, next) => {
        try {
            const result = await movieService.updateMovie(req);
            const response = responseSuccess(result, "Update movie success");
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    },

    deleteMovie: async (req, res, next) => {
        try {
            const result = await movieService.deleteMovie(req);
            const response = responseSuccess(result, "Delete movie success");
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    }
};
