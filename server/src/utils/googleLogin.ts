import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { createJWT } from "./helper";

const prisma = new PrismaClient();

export const loginGoogle = async (token: string) => {
  const userInfo = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const existingUser = await prisma.user.findUnique({
    where: {
      Email: userInfo.data.email,
    },
  });

  let newUser;
  if (existingUser) {
    console.log("User already exists:", existingUser);
    newUser = existingUser;
  } else {
    console.log("User does not exist, creating new user...");
    newUser = await prisma.user.create({
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

  return createJWT(existingUser || newUser);
};
