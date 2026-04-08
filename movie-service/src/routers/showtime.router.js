import express from 'express';
import { showtimeController } from '../controllers/showtime.controller.js';
import { protect } from '@moviet/shared/middlewares/protect.middleware.js';

const showtimeRouter = express.Router();

/**
 * @swagger
 * /showtimes/{id}:
 *   get:
 *     summary: Get showtime detail by id
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Get showtime detail success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Showtime not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
showtimeRouter.get('/:id', showtimeController.getShowtimeDetail);

/**
 * @swagger
 * /showtimes/{id}/book:
 *   post:
 *     summary: Book seats for a showtime (after payment success)
 *     tags: [Showtimes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingToken
 *             properties:
 *               bookingToken:
 *                 type: string
 *                 description: Token do payment-service trả về từ API /payment/momo/confirm
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       201:
 *         description: Book seats success
 *       400:
 *         description: Invalid input or seats already booked
 *       401:
 *         description: Unauthorized
 */
showtimeRouter.post('/:id/book', protect, showtimeController.bookSeats);

export default showtimeRouter;
