import express from 'express';
import { movieController } from '../controllers/movie.controller.js';
import { showtimeController } from '../controllers/showtime.controller.js';
import { protect } from '@moviet/shared/middlewares/protect.middleware.js';

const movieRouter = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Get movies success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
movieRouter.get('/', movieController.getMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie detail
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Get movie detail success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
movieRouter.get('/:id', movieController.getMovieDetail);

/**
 * @swagger
 * /movies/{id}/showtimes:
 *   get:
 *     summary: Get showtimes by movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Get showtimes success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
movieRouter.get('/:id/showtimes', showtimeController.getShowtimesByMovieId);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create new movie (Admin)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               thumbnail: { type: string }
 *               trailer: { type: string }
 *               description: { type: string }
 *               rating: { type: number }
 *               duration: { type: number }
 *               releaseDate: { type: string, format: 'date-time' }
 *               director: { type: string }
 *               actors: { type: array, items: { type: string } }
 *               tags: { type: array, items: { type: string } }
 *               status: { type: string, enum: [COMING_SOON, SHOWING, ENDED] }
 *     responses:
 *       201:
 *         description: Create movie success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 */
movieRouter.post('/', protect, movieController.createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update movie (Admin)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [COMING_SOON, SHOWING, ENDED] }
 *     responses:
 *       200:
 *         description: Update movie success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Movie not found
 *       401:
 *         description: Unauthorized
 */
movieRouter.put('/:id', protect, movieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete movie (Admin)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete movie success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Movie not found
 *       401:
 *         description: Unauthorized
 */
movieRouter.delete('/:id', protect, movieController.deleteMovie);

export default movieRouter;
