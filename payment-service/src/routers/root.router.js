import express from 'express';
import paymentRouter from './payment.router.js';

const rootRouter = express.Router();

rootRouter.use('/payment', paymentRouter);

export default rootRouter;
