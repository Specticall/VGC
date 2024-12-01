import { S3Client } from "@aws-sdk/client-s3";
import { Snap } from "midtrans-client";

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const TMDB_API_KEY = process.env.TMDB_API_KEY as string;
export const TMDB_ENDPOINT_BASE_URL = process.env
  .TMDB_ENDPOINT_BASE_URL as string;
export const TMDB_MEDIA_BASE_URL = process.env.TMDB_MEDIA_BASE_URL as string;

//aws
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
export const AWS_SECRET_ACCESS_KEY = process.env
  .AWS_SECRET_ACCESS_KEY as string;
export const AWS_REGION = process.env.AWS_REGION as string;
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string;

export const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  }
});

//midtrans
export const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY as string;

export const snapApi = new Snap({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
});

//Mail
export const MAIL_USERNAME = process.env.MAIL_USERNAME as string;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD as string;