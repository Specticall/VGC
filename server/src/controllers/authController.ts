import { createJWT, AppError, STATUS, successRes } from "../utils";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";

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

export const login: RequestHandler = async (request, response, next) => {
  try {
    const { access_token, email, password } = request.body;
    if (!access_token) {
      throw new AppError(
        "Token is missing in the request body",
        STATUS.BAD_REQUEST
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.includes("'")) {
      throw new AppError(
        "AOWKAOWKAOWK MAU SQL INJECT YA PUKI?",
        STATUS.BAD_REQUEST
      );
    }
    if (!emailRegex.test(email)) {
      throw new AppError("Email format is invalid", STATUS.BAD_REQUEST);
    }
    if (!email) {
      throw new AppError(
        "email is missing in the request body",
        STATUS.BAD_REQUEST
      );
    }
    if (!password) {
      throw new AppError(
        "password is missing in the request body",
        STATUS.BAD_REQUEST
      );
    }
    const userData = await prisma.user.findUnique({
      where: { Email: email },
    });

    if (!userData || !(await bcrypt.compare(password, userData.Password))) {
      throw new AppError("Invalid email or password", STATUS.UNAUTHORIZED);
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
      userData: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const register: RequestHandler = async (request, response, next) => {
  try {
    const { access_token, name, email, password, age } = request.body;
    if (!access_token) {
      throw new AppError(
        "Token is missing in the request body",
        STATUS.BAD_REQUEST
      );
    }
    if (!name) {
      throw new AppError(
        "Name is missing in the request body",
        STATUS.BAD_REQUEST
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.includes("'")) {
      throw new AppError(
        "AOWKAOWKAOWK MAU SQL INJECT YA PUKI?",
        STATUS.BAD_REQUEST
      );
    }
    if (!emailRegex.test(email)) {
      throw new AppError("Email format is invalid", STATUS.BAD_REQUEST);
    }
    if (!email) {
      throw new AppError(
        "Email is missing in the request body",
        STATUS.BAD_REQUEST
      );
    }
    if (!password) {
      throw new AppError(
        "password is missing in the request body",
        STATUS.BAD_REQUEST
      );
    }
    if (!age) {
      throw new AppError(
        "Age is missing in the request body",
        STATUS.BAD_REQUEST
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { Email: email },
    });

    if (existingUser) {
      throw new AppError(
        "User with this email already exists",
        STATUS.FORBIDDEN
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        Name: name,
        Email: email,
        Password: hashedPassword,
        ProfilePicture: "",
        Age: age,
        Role: "USER",
      },
    });

    const jwtToken = createJWT(newUser);
    if (!jwtToken) {
      throw new AppError(
        "Something went wrong while trying to create the token",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    return successRes(response, {
      token: jwtToken,
      userData: newUser,
    });
  } catch (e) {
    next(e);
  }
};
