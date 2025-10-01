import { Router } from "express";
import { getTradesByUserId, placeTradeREST } from "../controllers/trade.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/getcurrenttrades/:userId", authMiddleware, getTradesByUserId);
router.post("/placetrade", placeTradeREST);


export default router;
