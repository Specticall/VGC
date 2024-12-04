import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import nodemailer from "nodemailer";
import { MAIL_PASSWORD, MAIL_USERNAME } from "../config/config";

const prisma = new PrismaClient();


cron.schedule("*/2 * * * *", () => {
	reminder();
});

export const reminder = async () => {
	const listOfReservation = await prisma.reservation.findMany({
		where: {
			IsUsed: false,
		},
	});
	for (const reservation of listOfReservation) {
		console.log(reservation);
		const movieInfo = await prisma.schedule.findUnique({
			where: {
				ScheduleId: reservation.ScheduleId,
			},
		});
		const userInfo = await prisma.user.findUnique({
			where: {
				UserId: reservation.UserId,
			},
		});
		const userSeat = await prisma.reservationSeat.findMany({
			where: {
				ReservationId: reservation.ReservationId as string,
			},
		});
		const movieStartTime = movieInfo?.StartTime;
		const userEmail = userInfo?.Name;
		const listofSeat = userSeat.map((seat) => seat.SeatId);
		const seatDetails = await Promise.all(
			listofSeat.map(async (seatId) => {
				const seat = await prisma.seat.findUnique({
					where: {
						SeatId: seatId,
					},
				});
				return seat ? `${seat.Row}-${seat.Number}` : null;
			})
		);
		// idk if this is a good practice??
		if (!movieStartTime) {
			return;
		}
		const oneHourBefore = new Date(movieStartTime);
		oneHourBefore.setHours(oneHourBefore.getHours() - 1);
		const sixHourBefore = new Date(movieStartTime);
		sixHourBefore.setHours(sixHourBefore.getHours() - 6);
		const oneDayBefore = new Date(movieStartTime);
		oneDayBefore.setDate(oneDayBefore.getDate() - 1);
		console.log(seatDetails);
		const currentTime = new Date();
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: MAIL_USERNAME,
				pass: MAIL_PASSWORD,
			},
		});
		if (!reservation.Reminder1Status) {
			if (currentTime >= oneHourBefore && currentTime <= movieStartTime) {
				const mailOptions = {
					to: userEmail,
					subject: "Movie Reminder",
					text: `Reminder: \n
                    Dear Mr/Mrs. ${userInfo?.Name}\n
                    Your movie starts in less than 1 hour. \n
                    Seats: ${seatDetails.join(", ")}`,
				};

				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log("Error sending email: ", error);
					} else {
						console.log("Email sent: " + info.response);
					}
				});
			}
			await prisma.reservation.update({
				where: {
					ReservationId: reservation.ReservationId,
				},
				data: {
					Reminder1Status: true,
				},
			});
		}
		if (!reservation.Reminder2Status) {
			if (currentTime < oneHourBefore && currentTime >= sixHourBefore) {
				const mailOptions = {
					to: userEmail,
					subject: "Movie Reminder",
					text: `Reminder: \n
                    Dear Mr/Mrs. ${userInfo?.Name}\n
                    Your movie starts in less than 6 hour. \n
                    Seats: ${seatDetails.join(", ")}`,
				};

				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log("Error sending email: ", error);
					} else {
						console.log("Email sent: " + info.response);
					}
				});
			}
			await prisma.reservation.update({
				where: {
					ReservationId: reservation.ReservationId,
				},
				data: {
					Reminder2Status: true,
				},
			});
		}
		if (!reservation.Reminder3Status) {
			if (currentTime < sixHourBefore && currentTime >= oneDayBefore) {
				const mailOptions = {
					to: userEmail,
					subject: "Movie Reminder",
					text: `Reminder: \n
                    Dear Mr/Mrs. ${userInfo?.Name}\n
                    Your movie starts in less than 24 hour. \n
                    Seats: ${seatDetails.join(", ")}`,
				};

				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log("Error sending email: ", error);
					} else {
						console.log("Email sent: " + info.response);
					}
				});
			}
			await prisma.reservation.update({
				where: {
					ReservationId: reservation.ReservationId,
				},
				data: {
					Reminder3Status: true,
				},
			});
		}
	}
};

reminder();
