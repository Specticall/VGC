import { snapApi } from "@/config/config";
import { successRes } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const createSnapTransaction: RequestHandler = async (req, res, next) => {
  try {
    const { userId, movieId, seatIds } = req.body;
    const movie = await prisma.movie.findUnique({
      where: {
        MovieId: movieId,
      }
    });

    const user = await prisma.user.findUnique({
      where: {
        UserId: userId,
      }
    });
    const name = user?.Name || ""; 
    const nameParts = name.split(" ");
    const quantity = seatIds.length;
    const snapTransaction = {
      item_details: {
        id: movieId,
        price: Number(movie?.Price || 0),
        quantity: quantity,
        name: movie?.Title || "",
      },
      transaction_details: {
        order_id: randomUUID(),
        gross_amount: quantity * Number(movie?.Price || 0),
      },
      customer_details: {
        first_name:  nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : nameParts[0],
        last_name: nameParts.length > 1 ? nameParts.slice(-1)[0] : "",
        email: user?.Email || "",
        phone: "",
      }
    };

    const token = await snapApi.createTransactionToken(snapTransaction);
    return successRes(res, {token});

  } catch (e) {
    next(e);
  }
};