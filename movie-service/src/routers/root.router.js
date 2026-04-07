import express from 'express';
import movieRouter from './movie.router.js';

const rootRouter = express.Router();

rootRouter.use('/movies', movieRouter);

export default rootRouter;
