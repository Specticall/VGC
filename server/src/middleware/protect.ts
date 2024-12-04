import { UserRole } from "@prisma/client";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { AppError, STATUS } from "../utils";

export const protect: RequestHandler = async (request, response, next) => {
	try {
		const bearerToken = request.headers.authorization;
		const token = bearerToken?.split(" ")[1];
		if (!token) {
			throw new AppError(
				"Token was not found in the request",
				STATUS.UNAUTHORIZED
			);
		}

		const payload = jwt.verify(token, JWT_SECRET) as {
			id: string;
			email: string;
			role: UserRole;
		};
		if (!payload) {
			throw new AppError(
				"Something went wrong while trying to parse the token",
				STATUS.INTERNAL_SERVER_ERROR
			);
		}

		request.body.payload = payload;
		next();
	} catch (error) {
		next(error);
	}
};
