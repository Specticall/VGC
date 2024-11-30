import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import nodemailer from "nodemailer";

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
		const userEmail = "sandjayawilliams16072005@gmail.com";
		// console.log(userEmail);
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
				user: "fierynx@gmail.com",
				pass: "qszh zeot ifog wzoy",
			},
		});
		if (!reservation.Reminder1Status) {
			//currentTime >= oneHourBefore && currentTime <= movieStartTime
			if (currentTime == currentTime) {
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
			// currentTime < oneHourBefore && currentTime >= sixHourBefore
			if (currentTime == currentTime) {
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
			console.log("AOWOAKWOKAW");
			// currentTime < sixHourBefore && currentTime >= oneDayBefore
			if (currentTime == currentTime) {
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
		// const oneHourBefore = new Date(movieStartTime);
		// oneHourBefore.setHours(oneHourBefore.getHours() - 1);

		// const sixHoursBefore = new Date(movieStartTime);
		// sixHoursBefore.setHours(sixHoursBefore.getHours() - 6);

		// const oneDayBefore = new Date(movieStartTime);
		// oneDayBefore.setDate(oneDayBefore.getDate() - 1);

		// if (currentTime >= oneHourBefore && currentTime < movieStartTime) {
		// 	cron.schedule(
		// 		oneHourBefore,
		// 		() => {
		// 			console.log(
		// 				`Reminder: Your movie starts in 1 hour. Seats: ${seatDetails.join(
		// 					", "
		// 				)}`
		// 			);
		// 		},
		// 		{ scheduled: true, timezone: "UTC" }
		// 	);
		// }

		// if (currentTime >= sixHoursBefore && currentTime < oneHourBefore) {
		// 	cron.schedule(
		// 		sixHoursBefore,
		// 		() => {
		// 			console.log(
		// 				`Reminder: Your movie starts in 6 hours. Seats: ${seatDetails.join(
		// 					", "
		// 				)}`
		// 			);
		// 		},
		// 		{ scheduled: true, timezone: "UTC" }
		// 	);
		// }

		// if (currentTime >= oneDayBefore && currentTime < sixHoursBefore) {
		// 	cron.schedule(
		// 		oneDayBefore,
		// 		() => {
		// 			console.log(
		// 				`Reminder: Your movie starts in 24 hours. Seats: ${seatDetails.join(
		// 					", "
		// 				)}`
		// 			);
		// 		},
		// 		{ scheduled: true, timezone: "UTC" }
		// 	);
		// }
	}
};

// Call the reminder function to set up the cron jobs
reminder();
