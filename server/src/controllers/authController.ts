import { createJWT, successRes } from "@/utils";
import { AppError } from "@/utils/AppError";
import { STATUS } from "@/utils/statusCodes";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const loginWithGoogle: RequestHandler = async (
	request,
	response,
	next
) => {
	try {
		const accessToken = request.body["access_token"] as string | undefined;

		if (!accessToken) {
			throw new AppError(
				"Token is missing in the request body",
				STATUS.BAD_REQUEST
			);
		}

		const userInfo = await axios.get(
			`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
		);

		const existingUser = await prisma.user.findUnique({
			where: {
				Email: userInfo.data.email,
			},
		});

		let userData;
		if (existingUser) {
			userData = existingUser;
		} else {
			userData = await prisma.user.create({
				data: {
					Name: userInfo.data.name,
					Email: userInfo.data.email,
					ProfilePicture: userInfo.data.picture,
					Password: "",
					Age: 0,
					Role: "USER",
				},
			});
		}

		const jwtToken = createJWT(userData);
		if (!jwtToken) {
			throw new AppError(
				"Something went wrong while trying to create the token",
				STATUS.INTERNAL_SERVER_ERROR
			);
		}

		return successRes(response, {
			token: jwtToken,
			userData,
		});
	} catch (error) {
		next(error);
	}
};

export const Login: RequestHandler = async (request, response, next) => {
	try {
		const access_token = request.body["access_token"];
		if (!access_token) {
			throw new AppError(
				"Token is missing in the request body",
				STATUS.BAD_REQUEST
			);
		}
	} catch (error) {
		next(error);
	}
};
