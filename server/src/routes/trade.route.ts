import { Router } from "express";
import { placeTrade } from "../controllers/trade.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/placetrade", authMiddleware, placeTrade);

export default router;
