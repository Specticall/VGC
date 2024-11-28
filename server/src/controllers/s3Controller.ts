import { RequestHandler } from "express";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } from "@/config/config";
import { generateFileName, successRes } from "@/utils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; 
import { AppError } from "@/utils/AppError";
import { STATUS } from "@/utils/statusCodes";

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  }
});

const ALLOWED_FILE_TYPES = {
  poster: ["image/jpeg", "image/png"],
  backdrop: ["image/jpeg", "image/png"],
  trailer: ["video/mp4", "video/x-matroska"],
};

export const getPresignedUrl: RequestHandler = async (req, res, next) => {
  try {
    if(!req.query.key){
      throw new AppError("Key is required", STATUS.BAD_REQUEST);
    }
    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: req.query.key as string
      }),
      { expiresIn: 60 }
    );

    return successRes(res, { url });

  } catch(e){
    next(e);
  }

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
    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    return successRes(res, { url, fileKey });
  } catch (e) {
    next(e);
  }
};

// export const deleteFile: RequestHandler = async (req, res, next) => {
//   try {
//     const deleteParams = {
//       Bucket: bucketName,
//       Key: post.imageName,
//     }
  
//     return s3Client.send(new DeleteObjectCommand(deleteParams))
//   } catch(e) {
//     next(e);
//   }
// };