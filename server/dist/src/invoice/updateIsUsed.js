"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIsUsed = void 0;
const utils_1 = require("../utils");
const responses_1 = require("../utils/responses");
// import { MAIL_PASSWORD, MAIL_USERNAME } from "../config/config"; (Tolong nanti di uncomment yak ini, saya udah gila aowkaowk)
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updateIsUsed = async (req, res, next) => {
    try {
        const { paymentId, userId } = req.body;
        const paymentData = await prisma.payment.findUnique({
            where: { PaymentId: paymentId },
        });
        const reservationID = paymentData?.ReservationId;
        const reservationData = await prisma.reservation.findUnique({
            where: {
                ReservationId: paymentData?.ReservationId,
            },
        });
        if (!paymentData) {
            throw new utils_1.AppError("Payment not found", utils_1.STATUS.NOT_FOUND);
        }
        if (reservationData?.UserId !== userId) {
            throw new utils_1.AppError("Invalid payment details", utils_1.STATUS.BAD_REQUEST);
        }
        await prisma.reservation.update({
            where: {
                ReservationId: reservationID,
            },
            data: {
                IsUsed: true,
            },
        });
        return (0, responses_1.successRes)(res, "Ticket Has Already Used");
    }
    catch (e) {
        next(e);
    }
};
exports.updateIsUsed = updateIsUsed;
//# sourceMappingURL=updateIsUsed.js.map