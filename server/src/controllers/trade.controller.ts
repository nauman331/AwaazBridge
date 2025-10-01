import { Trade } from "../models/Trade";
import { Request, Response } from "express";

const getTradesByUserId = async (req: Request, Response: Response) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return Response.status(400).json({ message: "User ID is required", isOk: false });
        }
    } catch (error) {
        return Response.status(500).json({ message: "Server error", isOk: false });
    }

}

export { getTradesByUserId };
