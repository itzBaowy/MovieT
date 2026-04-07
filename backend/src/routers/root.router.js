import express from 'express';
import authRouter from './auth.router.js';

const rootRouter = express.Router();

rootRouter.use('/v1/auth', authRouter);

export default rootRouter;
