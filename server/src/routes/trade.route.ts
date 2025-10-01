import { Router } from "express";
import { getTradesByUserId } from "../controllers/trade.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/getcurrenttrades/:userId", authMiddleware, getTradesByUserId);


export default router;
