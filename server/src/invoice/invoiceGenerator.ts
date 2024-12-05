import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import { AppError, generateFileName, STATUS, successRes } from "../utils";
import {
	MAIL_PASSWORD,
	MAIL_USERNAME,
	AWS_S3_BUCKET_NAME,
	s3Client,
} from "../config/config";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();

export const generateInvoice: RequestHandler = async (req, res, next) => {
	try {
		const { paymentId, userId, movieId } = await req.body;
		const paymentData = await prisma.payment.findUnique({
			where: {
				PaymentId: paymentId,
			},
		});

		const userData = await prisma.user.findUnique({
			where: {
				UserId: userId,
			},
		});
		const movieData = await prisma.movie.findUnique({
			where: {
				MovieId: movieId,
			},
		});
		if (paymentData?.IsPaid) {
			if (paymentData.IsPaid === true) {
				const userName = userData?.Name;
				if (!userName) {
					throw new AppError("User Not Found!", STATUS.NOT_FOUND);
				}
				const totalPayment = paymentData.ReservationId
					? await prisma.reservation.findUnique({
							where: {
								ReservationId: paymentData.ReservationId,
							},
							select: {
								TotalPrice: true,
							},
					})
					: null;

				if (!totalPayment) {
					throw new AppError("Total Payment is not found!", STATUS.NOT_FOUND);
				}
				const mailOptions = {
					to: userData.Email,
					subject: "Billing Invoice - VGC",
					text: `
                        Dear Mr/Mrs. ${userName} \n
                        Thank you for the payment you made for movie : ${movieData?.Title} .\n
                        Total Price : ${totalPayment} \n
                        Payment Method : BLANKK \n

                        We hope you enjoy the movie and have a wonderful experience!
                        Warm regards,
                        VGC
                    `,
				};
				const transporter = nodemailer.createTransport({
					service: "gmail",
					auth: {
						user: MAIL_USERNAME,
						pass: MAIL_PASSWORD,
					},
				});
				transporter.sendMail(mailOptions, async (error, info) => {
					if (error) {
						throw new AppError(
							"Invoice is not sent!",
							STATUS.INTERNAL_SERVER_ERROR
						);
					} else {
						const qrData = {
							userId: userId,
							movieId: movieId,
							paymentId: paymentId,
						};
						console.log(info);
						const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
						// send To S3
						const base64Data = Buffer.from(
							qrCode.replace(/^data:image\/\w+;base64,/, ""),
							"base64"
						);
						const params = {
							Bucket: AWS_S3_BUCKET_NAME,
							Body: base64Data,
							Key: "qrCode/" + generateFileName() + ".png",
							ContentEncoding: "base64",
							ContentType: "image/png",
						};
						await s3Client.send(new PutObjectCommand(params));
						return successRes(res, qrCode);
					}
				});
			}
		} else {
			throw new AppError("Payment Failed!", STATUS.BAD_REQUEST);
		}
	} catch (e) {
		next(e);
	}
};
