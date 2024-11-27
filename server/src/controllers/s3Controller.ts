import { Request, RequestHandler, Response } from 'express';
import AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } from '@/config/config';
import { errBadRequest, successRes } from '@/utils';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const ALLOWED_FILE_TYPES = {
  poster: ["image/jpeg", "image/png"],
  backdrop: ["image/jpeg", "image/png"],
  trailer: ["video/mp4", "video/x-matroska"],
};

export const generatePresignedUrl: RequestHandler = async (req: Request, res: Response, next) => {
  const { 
    fileName, 
    fileType, 
    fileCategory 
  }: { 
    fileName: string; 
    fileType: string; 
    fileCategory: keyof typeof ALLOWED_FILE_TYPES } = req.body;

  if (!fileCategory || !['poster', 'backdrop', 'trailer'].includes(fileCategory)) {
    return errBadRequest(next, 'Invalid file category');
  }

  if (!ALLOWED_FILE_TYPES[fileCategory]?.includes(fileType)) {
    return errBadRequest(next, 'Invalid file type for this category');
  }

  const fileKey = `${fileCategory}s/${fileName}`;
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: fileKey,
    Expires: 60, //valid 60s
    ContentType: fileType,
    Conditions: [
      ["content-length-range", 0, 10485760], //max 10mb
    ],
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', params);
    return successRes(res, { url });
  } catch (e) {
    if (e instanceof Error) {
      return errBadRequest(next, e.message);
    }
    return errBadRequest(next);
  }
};
