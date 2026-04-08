import express from 'express';
import { paymentController } from '../controllers/payment.controller.js';

const paymentRouter = express.Router();

/**
 * @swagger
 * /payment/momo/create:
 *   post:
 *     summary: Create MoMo payment request
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount: { type: number, example: 120000 }
 *               orderInfo: { type: string, example: "Thanh toan ve phim" }
 *               extraData: { type: string, example: "" }
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
paymentRouter.post('/momo/create', paymentController.createMomoPayment);

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
