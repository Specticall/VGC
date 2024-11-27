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
 *     description: Retrieve a list of movies with their schedules, genres, languages, and additional metadata.
 *     responses:
 *       200:
 *         description: A list of movies with related details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
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
 *         - Price
 *         - Status
 *         - ReleaseDate
 *       properties:
 *         MovieId:
 *           type: string
 *           example: "02e54c0a-5264-46c8-94b5-26b94df9600f"
 *         Title:
 *           type: string
 *           example: "Venom: The Last Dance"
 *         Tagline:
 *           type: string
 *           example: "'Til death do they part."
 *         DurationMinutes:
 *           type: integer
 *           example: 109
 *         Price:
 *           type: string
 *           example: "59495"
 *         Poster:
 *           type: string
 *           format: uri
 *           example: "https://image.tmdb.org/t/p/original/aosm8NMQ3UyoBVpSxyimorCQykC.jpg"
 *         Backdrop:
 *           type: string
 *           format: uri
 *           example: "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg"
 *         Trailer:
 *           type: string
 *           nullable: true
 *           example: null
 *         Status:
 *           type: string
 *           description: (NOW_SHOWING, COMING_SOON, END_OF_SHOWING)
 *           example: "NOW_SHOWING"
 *         AgeRestriction:
 *           type: string
 *           description: (SU, R13, D17)
 *           example: "R13"
 *         ReleaseDate:
 *           type: string
 *           format: date-time
 *           example: "2024-10-22T00:00:00.000Z"
 *         VoteAverage:
 *           type: string
 *           example: "6.43"
 *           description: From scale 0 t0 10
 *         VoteCount:
 *           type: integer
 *           example: 894
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-11-27T05:40:30.323Z"
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-11-27T05:40:30.323Z"
 *         language:
 *           $ref: '#/components/schemas/Language'
 *         genres:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genre'
 *         schedules:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Schedule'
 *     Schedule:
 *       type: object
 *       required:
 *         - ScheduleId
 *         - StartTime
 *         - EndTime
 *       properties:
 *         ScheduleId:
 *           type: string
 *           example: "bf53de61-4308-4c44-b36b-6d55d17198d8"
 *         StartTime:
 *           type: string
 *           format: date-time
 *           example: "2024-11-27T10:05:00.000Z"
 *         EndTime:
 *           type: string
 *           format: date-time
 *           example: "2024-11-27T12:25:00.000Z"
 *         RoomId:
 *           type: string
 *           example: "0d808814-c697-4f6c-83c2-1fa83efb0bb3"
 *         MovieId:
 *           type: string
 *           example: "02e54c0a-5264-46c8-94b5-26b94df9600f"
 *         room:
 *           $ref: '#/components/schemas/Room'
 *     Genre:
 *       type: object
 *       required:
 *         - GenreId
 *         - Name
 *       properties:
 *         GenreId:
 *           type: string
 *           example: "12"
 *         Name:
 *           type: string
 *           example: "Adventure"
 *     Language:
 *       type: object
 *       required:
 *         - LanguageId
 *         - Name
 *       properties:
 *         LanguageId:
 *           type: string
 *           example: "en"
 *         Name:
 *           type: string
 *           example: "English"
 *     Room:
 *       type: object
 *       required:
 *         - RoomId
 *         - Name
 *         - SeatCapacity
 *       properties:
 *         RoomId:
 *           type: string
 *           example: "0d808814-c697-4f6c-83c2-1fa83efb0bb3"
 *         Name:
 *           type: string
 *           example: "R2"
 *         SeatCapacity:
 *           type: integer
 *           example: 170
 *         CinemaId:
 *           type: string
 *           example: "c961e4eb-c4fd-453d-89ea-e5e46ebfe8b1"
 */