import prisma from '../prisma/connect.prisma.js';
import jwt from 'jsonwebtoken';
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException } from '@moviet/shared/helpers/exception.helper.js';

const orderBookingLocks = new Map();

const runWithOrderLock = async (orderId, action) => {
    const previous = orderBookingLocks.get(orderId) || Promise.resolve();
    const currentTask = previous
        .catch(() => null)
        .then(async () => await action());

    orderBookingLocks.set(orderId, currentTask);

    try {
        return await currentTask;
    } finally {
        if (orderBookingLocks.get(orderId) === currentTask) {
            orderBookingLocks.delete(orderId);
        }
    }
};

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
    },

    bookSeats: async (req) => {
        const userId = req.user?.id;
        const { id: showtimeId } = req.params;
        const { bookingToken } = req.body || {};
        const bookingSecret = process.env.PAYMENT_BOOKING_SECRET;

        if (!userId) {
            throw new UnauthorizedException('Vui lòng đăng nhập để đặt vé');
        }

        if (!bookingToken) {
            throw new BadRequestException('Thiếu booking token hợp lệ');
        }

        if (!bookingSecret) {
            throw new BadRequestException('Thiếu PAYMENT_BOOKING_SECRET trong environment');
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(bookingToken, bookingSecret);
        } catch (error) {
            throw new ForbiddenException('Booking token không hợp lệ hoặc đã hết hạn');
        }

        if (decodedToken.userId !== userId) {
            throw new ForbiddenException('Booking token không thuộc về người dùng hiện tại');
        }

        if (decodedToken.showtimeId !== showtimeId) {
            throw new BadRequestException('Booking token không khớp suất chiếu');
        }

        const tokenSeats = Array.isArray(decodedToken.seats) ? decodedToken.seats : [];
        if (tokenSeats.length === 0) {
            throw new BadRequestException('Booking token không chứa ghế hợp lệ');
        }

        const normalizedSeats = [...new Set(tokenSeats.map((seat) => String(seat).trim().toUpperCase()))].filter(Boolean);
        const amount = Number(decodedToken.amount || 0);
        const orderId = String(decodedToken.orderId || `TICKET_${Date.now()}`);
        const paymentType = String(decodedToken.paymentType || 'MOMO');

        if (normalizedSeats.length === 0) {
            throw new BadRequestException('Danh sách ghế không hợp lệ');
        }

        return await runWithOrderLock(orderId, async () => {
            const showtime = await prisma.showtime.findUnique({
                where: { id: showtimeId },
                include: {
                    movie: true,
                    cinema: true,
                },
            });

            if (!showtime) {
                throw new NotFoundException('Không tìm thấy suất chiếu');
            }

            const existingTicket = await prisma.ticket.findFirst({
                where: {
                    userId,
                    orderId,
                },
                include: {
                    showtime: {
                        include: {
                            movie: true,
                            cinema: true,
                        },
                    },
                },
            });

            if (existingTicket) {
                return existingTicket;
            }

            const alreadyBooked = normalizedSeats.filter((seat) => showtime.bookedSeats.includes(seat));
            if (alreadyBooked.length > 0) {
                throw new BadRequestException(`Ghế đã được đặt: ${alreadyBooked.join(', ')}`);
            }

            const updatedBookedSeats = [...new Set([...showtime.bookedSeats, ...normalizedSeats])];

            const expectedAmount = normalizedSeats.length * (showtime.price || 0);
            if (amount !== expectedAmount) {
                throw new BadRequestException('Số tiền thanh toán không khớp với giá vé thực tế');
            }

            await prisma.showtime.update({
                where: { id: showtimeId },
                data: {
                    bookedSeats: updatedBookedSeats,
                },
            });

            const finalAmount = expectedAmount;

            return await prisma.ticket.create({
                data: {
                    userId,
                    showtimeId,
                    orderId: orderId || `TICKET_${Date.now()}`,
                    amount: finalAmount,
                    seats: normalizedSeats,
                    status: 'PAID',
                    paymentType,
                },
                include: {
                    showtime: {
                        include: {
                            movie: true,
                            cinema: true,
                        },
                    },
                },
            });
        });
    }
};
