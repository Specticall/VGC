import { login, loginWithGoogle, register } from "src/controllers/authController";
import express from "express";

const authRouter = express.Router();

authRouter.post("/login/google", loginWithGoogle);
authRouter.post("/login", login);
authRouter.post("/register", register);

export { authRouter };

/**
 * @swagger
 * tags:
 *   - name: Google Login
 *     description: Log into an account using google
 *
 * /login/google:
 *   get:
 *     tags:
 *       - Casts
 *     summary: Login into an account using google
 *     description: Converts access token into a jwt token.
 *     responses:
 *       200:
 *         description: JWT Token
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
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
