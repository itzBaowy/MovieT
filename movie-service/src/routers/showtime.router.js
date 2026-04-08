import express from 'express';
import { showtimeController } from '../controllers/showtime.controller.js';

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

export default showtimeRouter;
