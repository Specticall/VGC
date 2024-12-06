import express from "express";
import { protect } from "../middleware/protect";
import { getSearchHistory, getUsers, storeSearchHistory } from "../controllers";

const userRouter = express.Router();
userRouter.use(protect);
userRouter.get("/", getUsers);
userRouter.post("/search-history", storeSearchHistory);
userRouter.get("/search-history", getSearchHistory);

export { userRouter };
