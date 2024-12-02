"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_PASSWORD = exports.MAIL_USERNAME = exports.snapApi = exports.MIDTRANS_SERVER_KEY = exports.s3Client = exports.AWS_S3_BUCKET_NAME = exports.AWS_REGION = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY_ID = exports.TMDB_MEDIA_BASE_URL = exports.TMDB_ENDPOINT_BASE_URL = exports.TMDB_API_KEY = exports.JWT_SECRET = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const midtrans_client_1 = require("midtrans-client");
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.TMDB_API_KEY = process.env.TMDB_API_KEY;
exports.TMDB_ENDPOINT_BASE_URL = process.env
    .TMDB_ENDPOINT_BASE_URL;
exports.TMDB_MEDIA_BASE_URL = process.env.TMDB_MEDIA_BASE_URL;
//aws
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_ACCESS_KEY = process.env
    .AWS_SECRET_ACCESS_KEY;
exports.AWS_REGION = process.env.AWS_REGION;
exports.AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
exports.s3Client = new client_s3_1.S3Client({
    region: exports.AWS_REGION,
    credentials: {
        accessKeyId: exports.AWS_ACCESS_KEY_ID,
        secretAccessKey: exports.AWS_SECRET_ACCESS_KEY,
    },
});
//midtrans
exports.MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
exports.snapApi = new midtrans_client_1.Snap({
    isProduction: false,
    serverKey: exports.MIDTRANS_SERVER_KEY,
});
//Mail
exports.MAIL_USERNAME = process.env.MAIL_USERNAME;
exports.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
//# sourceMappingURL=config.js.map