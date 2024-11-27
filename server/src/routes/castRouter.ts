import { getCasts } from "@/controllers/castController";
import express from "express";

const castRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Casts
 *     description: API endpoints for managing cast members
 * 
 * /casts:
 *   get:
 *     tags:
 *       - Casts
 *     summary: Retrieve a list of cast members
 *     description: Retrieve a list of all cast members with their respective details such as name, image, and character.
 *     responses:
 *       200:
 *         description: A list of cast members
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
 *                     $ref: '#/components/schemas/Cast'
 *       500:
 *         description: Internal Server Error
 */
castRouter.get("/", getCasts);

export { castRouter };

/**
 * @swagger
 * components:
 *   schemas:
 *     Cast:
 *       type: object
 *       required:
 *         - CastId
 *         - Name
 *         - Character
 *       properties:
 *         CastId:
 *           type: string
 *           description: Unique identifier for the cast member
 *         Name:
 *           type: string
 *           description: Name of the cast member
 *         Image:
 *           type: string
 *           nullable: true
 *           description: Image URL of the cast member (if available)
 *         Character:
 *           type: string
 *           description: Character played by the cast member in the movie
 */