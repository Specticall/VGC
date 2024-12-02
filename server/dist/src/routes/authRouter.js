"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const authController_1 = require("../controllers/authController");
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/login/google", authController_1.loginWithGoogle);
authRouter.post("/login", authController_1.login);
authRouter.post("/register", authController_1.register);
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
//# sourceMappingURL=authRouter.js.map