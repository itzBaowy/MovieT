import prisma from '../prisma/connect.prisma.js';
import { UnauthorizedException } from '@moviet/shared/helpers/exception.helper.js';

export const ticketService = {
    getMyTickets: async (req) => {
        const userId = req.user?.id;

        if (!userId) {
            throw new UnauthorizedException('Vui lòng đăng nhập để xem vé');
        }

        return await prisma.ticket.findMany({
            where: { userId },
            include: {
                showtime: {
                    include: {
                        movie: true,
                        cinema: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    },
};
