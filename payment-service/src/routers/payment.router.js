import express from 'express';
import { paymentController } from '../controllers/payment.controller.js';
import { protect } from '@moviet/shared/middlewares/protect.middleware.js';

const paymentRouter = express.Router();

/**
 * @swagger
 * /payment/momo/create:
 *   post:
 *     summary: Create MoMo payment request
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - extraData
 *             properties:
 *               amount: { type: number, example: 120000 }
 *               orderInfo: { type: string, example: "Thanh toan ve phim" }
 *               extraData:
 *                 type: string
 *                 description: JSON string chứa showtimeId và seats
 *                 example: '{"showtimeId":"67f3f73e9f7c5a0de6505d12","seats":["F3","F4"]}'
 *               orderId: { type: string, example: "ORDER_123456" }
 *     responses:
 *       200:
 *         description: Create payment success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
paymentRouter.post('/momo/create', protect, paymentController.createMomoPayment);

/**
 * @swagger
 * /payment/momo/confirm:
 *   post:
 *     summary: Confirm paid MoMo order and issue secure booking token
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: MOVIET_1775664013978
 *               momoResult:
 *                 type: object
 *                 description: Toàn bộ query params trả về từ MoMo redirect (dùng khi IPN chưa về)
 *                 properties:
 *                   orderId: { type: string, example: MOVIET_1775664013978 }
 *                   amount: { type: string, example: "240000" }
 *                   resultCode: { type: string, example: "0" }
 *                   message: { type: string, example: "Successful." }
 *                   signature: { type: string, example: "<momo-signature>" }
 *     responses:
 *       200:
 *         description: Confirm payment success and return booking token
 *       400:
 *         description: Invalid order data or payment not confirmed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
paymentRouter.post('/momo/confirm', protect, paymentController.confirmMomoPayment);

/**
 * @swagger
 * /payment/result:
 *   get:
 *     summary: MoMo redirect result endpoint
 *     tags: [Payment]
 *     responses:
 *       302:
 *         description: Redirect to frontend payment result page
 */
paymentRouter.get('/result', paymentController.handleMomoResult);

/**
 * @swagger
 * /payment/momo-ipn:
 *   post:
 *     summary: MoMo instant payment notification (IPN)
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: IPN handled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode: { type: integer, example: 0 }
 *                 message: { type: string, example: "Success" }
 */
paymentRouter.post('/momo-ipn', paymentController.handleMomoIpn);

export default paymentRouter;
