"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@/config/config");
const utils_1 = require("@/utils");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const ALLOWED_FILE_TYPES = {
    poster: ["image/jpeg", "image/png"],
    backdrop: ["image/jpeg", "image/png"],
    trailer: ["video/mp4", "video/x-matroska"],
};
const uploadFile = async (req, res, next) => {
    try {
        const { path, mimetype, category, } = req.body;
        if (!category || !["poster", "backdrop", "trailer"].includes(category)) {
            throw new utils_1.AppError("Invalid file category", utils_1.STATUS.BAD_REQUEST);
        }
        if (!ALLOWED_FILE_TYPES[category]?.includes(mimetype)) {
            throw new utils_1.AppError("Invalid file type for this category", utils_1.STATUS.BAD_REQUEST);
        }
        const fileKey = `${category}s/${(0, utils_1.generateFileName)()}${path}`;
        const params = {
            Bucket: config_1.AWS_S3_BUCKET_NAME,
            Key: fileKey,
            ContentType: mimetype,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        const url = await (0, s3_request_presigner_1.getSignedUrl)(config_1.s3Client, command, { expiresIn: 60 });
        return (0, utils_1.successRes)(res, { url, fileKey });
    }
    catch (e) {
        next(e);
    }
};
exports.uploadFile = uploadFile;
const deleteFile = (key) => {
    if (!key) {
        throw new utils_1.AppError("Key is required", utils_1.STATUS.BAD_REQUEST);
    }
    config_1.s3Client.send(new client_s3_1.DeleteObjectCommand({
        Bucket: config_1.AWS_S3_BUCKET_NAME,
        Key: key
    }));
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=s3Controller.js.map