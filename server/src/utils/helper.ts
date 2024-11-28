import { JWT_SECRET } from "@/config/config";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const roundTimeDownToNearest5 = (date: Date): Date => {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.floor(minutes / 5) * 5;
  date.setMinutes(roundedMinutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const createJWT = (userData: User) => {
  const tokenPayload = {
    id: userData.UserId,
    email: userData.Email,
    role: userData.Role,
  };

  return jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "6h" });
};

export const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
