import { getMovies } from "@/controllers/movieController";
import express from "express";

const movieRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Movies
 *     description: API endpoints for managing movies
 * 
 * /movies:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Retrieve a list of movies
 *     description: Retrieve a list of movies with their schedules, genres, and languages.
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Bad Request
 */
movieRouter.get("/", getMovies);

export { movieRouter };

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - MovieId
 *         - Title
 *         - DurationMinutes
 *         - Status
 *       properties:
 *         MovieId:
 *           type: string
 *           description: Unique identifier for the movie
 *         Title:
 *           type: string
 *           description: The title of the movie
 *         DurationMinutes:
 *           type: integer
 *           description: Duration of the movie in minutes
 *         Status:
 *           type: string
 *           description: Current status of the movie (e.g., "available", "unavailable")
 *         schedules:
 *           type: array
 *           description: A list of movie schedules
 *           items:
 *             $ref: '#/components/schemas/Schedule'
 *         genres:
 *           type: array
 *           description: A list of genres associated with the movie
 *           items:
 *             $ref: '#/components/schemas/Genre'
 *         language:
 *           type: object
 *           description: Language of the movie
 *           properties:
 *             LanguageId:
 *               type: string
 *             Name:
 *               type: string
 *     Schedule:
 *       type: object
 *       required:
 *         - ScheduleId
 *         - StartTime
 *         - EndTime
 *       properties:
 *         ScheduleId:
 *           type: string
 *         StartTime:
 *           type: string
 *           format: time
 *         EndTime:
 *           type: string
 *           format: time
 *     Genre:
 *       type: object
 *       required:
 *         - GenreId
 *         - Name
 *       properties:
 *         GenreId:
 *           type: string
 *         Name:
 *           type: string
 *     Language:
 *       type: object
 *       required:
 *         - LanguageId
 *         - Name
 *       properties:
 *         LanguageId:
 *           type: string
 *         Name:
 *           type: string
 */