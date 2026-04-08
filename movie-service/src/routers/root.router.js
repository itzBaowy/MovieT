import express from 'express';
import movieRouter from './movie.router.js';
import showtimeRouter from './showtime.router.js';
import ticketRouter from './ticket.router.js';

const rootRouter = express.Router();

rootRouter.use('/movies', movieRouter);
rootRouter.use('/showtimes', showtimeRouter);
rootRouter.use('/tickets', ticketRouter);

export default rootRouter;
