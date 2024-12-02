"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Router = void 0;
const express_1 = __importDefault(require("express"));
const s3Controller_1 = require("@/controllers/s3Controller");
const s3Router = express_1.default.Router();
exports.s3Router = s3Router;
s3Router.post("/", s3Controller_1.uploadFile);
s3Router.delete("/", s3Controller_1.deleteFile);
/**
 * @swagger
 * tags:
 *   - name: Files
 *     description: API endpoints for file handling
 *
 * /presigned:
 *   post:
 *     tags:
 *       - Files
 *     summary: Generate a presigned URL for uploading a file to S3
 *     description: Generate a presigned URL for a specific file category (poster, backdrop, trailer) to allow file upload directly to AWS S3.
 *     requestBody:
 *       description: Request body for generating the presigned URL with file details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileName
 *               - fileType
 *               - fileCategory
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: The name of the file to be uploaded.
 *               fileType:
 *                 type: string
 *                 description: The MIME type of the file (e.g., 'image/jpeg', 'image/png', 'video/mp4').
 *               fileCategory:
 *                 type: string
 *                 description: The category of the file (poster, backdrop, or trailer).
 *                 enum: [poster, backdrop, trailer]
 *     responses:
 *       200:
 *         description: Successfully generated presigned URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The presigned URL for uploading the file to S3.
 *       400:
 *         description: Bad request due to invalid file category or file type.
 *       500:
 *         description: Internal server error.
 */ 
//# sourceMappingURL=s3Router.js.map