import {
  getSearchHistory,
  getUsers,
  storeSearchHistory,
} from "src/controllers/userController";
import { protect } from "src/middleware/protect";
import express from "express";

const userRouter = express.Router();
userRouter.use(protect);
userRouter.get("/", getUsers);
userRouter.post("/search-history", storeSearchHistory);
userRouter.get("/search-history", getSearchHistory);

export { userRouter };
