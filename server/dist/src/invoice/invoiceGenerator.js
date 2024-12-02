"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = exports.MAIL_PASSWORD = exports.MAIL_USERNAME = void 0;
const utils_1 = require("../utils");
const responses_1 = require("../utils/responses");
// import { MAIL_PASSWORD, MAIL_USERNAME } from "../config/config"; (Tolong nanti di uncomment yak ini, saya udah gila aowkaowk)
const client_1 = require("@prisma/client");
const nodemailer_1 = __importDefault(require("nodemailer"));
const qrcode_1 = __importDefault(require("qrcode"));
exports.MAIL_USERNAME = process.env.MAIL_USERNAME;
exports.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const prisma = new client_1.PrismaClient();
const generateInvoice = async (req, res, next) => {
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
                    throw new utils_1.AppError("User Not Found!", utils_1.STATUS.NOT_FOUND);
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
                    throw new utils_1.AppError("Total Payment is not found!", utils_1.STATUS.NOT_FOUND);
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
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: exports.MAIL_USERNAME,
                        pass: exports.MAIL_PASSWORD,
                    },
                });
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        throw new utils_1.AppError("Invoice is not sent!", utils_1.STATUS.INTERNAL_SERVER_ERROR);
                    }
                    else {
                        const qrData = {
                            userId: userId,
                            movieId: movieId,
                            paymentId: paymentId,
                        };
                        const qrCode = qrcode_1.default.toDataURL(JSON.stringify(qrData));
                        // send To S3
                        return (0, responses_1.successRes)(res, qrCode);
                    }
                });
            }
        }
        else {
            throw new utils_1.AppError("Payment Failed!", utils_1.STATUS.BAD_REQUEST);
        }
    }
    catch (e) {
        next(e);
    }
};
exports.generateInvoice = generateInvoice;
//# sourceMappingURL=invoiceGenerator.js.map