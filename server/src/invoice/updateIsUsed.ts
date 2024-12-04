import { AppError, STATUS } from "src/utils";
import { successRes } from "src/utils/responses";
// import { MAIL_PASSWORD, MAIL_USERNAME } from "@/config/config"; (Tolong nanti di uncomment yak ini, saya udah gila aowkaowk)
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const updateIsUsed: RequestHandler = async (req, res, next) => {
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
			throw new AppError("Payment not found", STATUS.NOT_FOUND);
		}

		if (reservationData?.UserId !== userId) {
			throw new AppError("Invalid payment details", STATUS.BAD_REQUEST);
		}

		await prisma.reservation.update({
			where: {
				ReservationId: reservationID,
			},
			data: {
				IsUsed: true,
			},
		});

		return successRes(res, "Ticket Has Already Used");
	} catch (e) {
		next(e);
	}
};
