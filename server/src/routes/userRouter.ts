import { getUsers } from "@/controllers/userController";
import { protect } from "@/middleware/protect";
import express from "express";

const userRouter = express.Router();
userRouter.get("/", protect, getUsers);

export { userRouter };
