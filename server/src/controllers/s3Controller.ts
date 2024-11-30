import { RequestHandler } from "express";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { AWS_S3_BUCKET_NAME, s3Client } from "@/config/config";
import { generateFileName, successRes, AppError, STATUS } from "@/utils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; 

const ALLOWED_FILE_TYPES = {
  poster: ["image/jpeg", "image/png"],
  backdrop: ["image/jpeg", "image/png"],
  trailer: ["video/mp4", "video/x-matroska"],
};

export const uploadFile: RequestHandler = async (req, res, next) => {
  try {
    const {
      path,
      mimetype,
      category,
    }: {
      path: string;
      mimetype: string;
      category: keyof typeof ALLOWED_FILE_TYPES;
    } = req.body;

    if (!category || !["poster", "backdrop", "trailer"].includes(category)) {
      throw new AppError("Invalid file category", STATUS.BAD_REQUEST);
    }

    if (!ALLOWED_FILE_TYPES[category]?.includes(mimetype)) {
      throw new AppError(
        "Invalid file type for this category",
        STATUS.BAD_REQUEST
      );
    }

    const fileKey = `${category}s/${generateFileName()}${path}`;

    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: fileKey,
      ContentType: mimetype,
    };

    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return successRes(res, { url, fileKey });
  } catch (e) {
    next(e);
  }
};

export const deleteFile = (key: string) => {
  if(!key){
    throw new AppError("Key is required", STATUS.BAD_REQUEST);
  }
  s3Client.send(new DeleteObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key
  }));
};