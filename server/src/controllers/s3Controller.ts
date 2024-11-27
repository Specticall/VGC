import { Request, RequestHandler, Response } from "express";
import AWS from "aws-sdk";
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
} from "@/config/config";
import { successRes } from "@/utils";
import { AppError } from "@/utils/AppError";
import { STATUS } from "@/utils/statusCodes";

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

const generatePresignedUrl = async ( 
  operation: "putObject" | "getObject",
  fileName: string,                   
  fileType: string | null,            
  fileCategory: keyof typeof ALLOWED_FILE_TYPES 
) => {

  if (!fileCategory || !["poster", "backdrop", "trailer"].includes(fileCategory)) {
    throw new AppError("Invalid file category", STATUS.BAD_REQUEST);
  }

  if (fileType && !ALLOWED_FILE_TYPES[fileCategory]?.includes(fileType)) {
    throw new AppError(
      "Invalid file type for this category",
      STATUS.BAD_REQUEST
    );
  }

  const fileKey = `${fileCategory}s/${fileName}`; 
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: fileKey,
    Expires: 60, 
    ContentType: fileType || undefined, 
  };

  const url = await s3.getSignedUrlPromise(operation, params);
  return url;
};

export const uploadFile: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const {
      fileName,
      fileType,
      fileCategory,
    } = req.params as {
      fileName: string;
      fileType: string;
      fileCategory: keyof typeof ALLOWED_FILE_TYPES;
    };

    const url = await generatePresignedUrl("putObject", fileName, fileType, fileCategory);
    return successRes(res, { url });
  } catch (e) {
    next(e);
  }
};

export const getFile: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const {
      fileName,
      fileCategory,
    }: {
      fileName: string;
      fileCategory: keyof typeof ALLOWED_FILE_TYPES;
    } = req.body;

    const url = await generatePresignedUrl("getObject", fileName, null, fileCategory);
    return successRes(res, { url });
  } catch (e) {
    next(e); 
  }
};
