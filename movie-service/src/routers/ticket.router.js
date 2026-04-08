import express from 'express';
import { ticketController } from '../controllers/ticket.controller.js';
import { protect } from '@moviet/shared/middlewares/protect.middleware.js';

const ticketRouter = express.Router();

/**
 * @swagger
 * /tickets/my:
 *   get:
 *     summary: Get current user tickets
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get my tickets success
 *       401:
 *         description: Unauthorized
 */
ticketRouter.get('/my', protect, ticketController.getMyTickets);

export default ticketRouter;
