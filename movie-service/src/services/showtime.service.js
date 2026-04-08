import prisma from '../prisma/connect.prisma.js';
import { NotFoundException } from '@moviet/shared/helpers/exception.helper.js';

export const showtimeService = {
    getShowtimesByMovie: async (req) => {
        const { id: movieId } = req.params;
        // Find showtimes grouped/filtered by movie
        const showtimes = await prisma.showtime.findMany({
            where: { movieId },
            include: {
                cinema: true
            },
            orderBy: [
                { date: 'asc' },
                { time: 'asc' }
            ]
        });

        // Group by cinema for grouping in the UI
        const grouped = [];
        for (const st of showtimes) {
            let cinemaGroup = grouped.find(g => g.cinema.id === st.cinemaId);
            if (!cinemaGroup) {
                cinemaGroup = {
                    cinema: st.cinema,
                    showtimes: []
                };
                grouped.push(cinemaGroup);
            }
            cinemaGroup.showtimes.push(st);
        }

        return grouped;
    },

    getShowtimeDetail: async (req) => {
        const { id: showtimeId } = req.params;
        const showtime = await prisma.showtime.findUnique({
            where: { id: showtimeId },
            include: {
                movie: true,
                cinema: true
            }
        });

        if (!showtime) {
            throw new NotFoundException('Không tìm thấy suất chiếu');
        }

        return showtime;
    }
};
