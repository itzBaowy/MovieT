import prisma from '../prisma/connect.prisma.js';
import { BadRequestException, NotFoundException } from '@moviet/shared/helpers/exception.helper.js';

export const movieService = {
    getMovies: async (req) => {
        const { status, tag } = req.query;
        const where = {};
        if (status) where.status = status;
        if (tag) where.tags = { has: tag };

        return await prisma.movie.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
    },

    getMovieDetail: async (req) => {
        const { id } = req.params;
        const movie = await prisma.movie.findUnique({ where: { id } });
        if (!movie) throw new NotFoundException("Phim không tồn tại");
        return movie;
    },

    createMovie: async (req) => {
        const body = req.body;
        // Basic validation could be added here or in shared validate.helper
        return await prisma.movie.create({
            data: body
        });
    },

    updateMovie: async (req) => {
        const { id } = req.params;
        const body = req.body;
        
        try {
            return await prisma.movie.update({
                where: { id },
                data: body
            });
        } catch (error) {
            throw new NotFoundException("Phim không tồn tại để cập nhật");
        }
    },

    deleteMovie: async (req) => {
        const { id } = req.params;
        try {
            await prisma.movie.delete({ where: { id } });
            return { id };
        } catch (error) {
            throw new NotFoundException("Phim không tồn tại để xóa");
        }
    }
};
