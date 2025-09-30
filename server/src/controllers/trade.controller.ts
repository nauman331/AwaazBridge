import { exit } from 'process';
import { User, IUser } from "../models/User";
import { Trade, ITrade } from "../models/Trade";
import { Transaction, ITransaction } from "../models/Transaction";
import { Request, Response } from "express";
import {
    PLATFORM_PAYOUT_RATIO
} from "../utils/finance";

const placeTrade = async (req: Request, res: Response) => {
    try {
        const { userId, asset, side, stakeAmount, currentPrice, expiryDuration } = req.body;

        if (!userId || !asset || !side || !stakeAmount || !currentPrice || !expiryDuration) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!['call', 'put'].includes(side)) {
            return res.status(400).json({ message: "Side must be 'call' or 'put'" });
        }

        const user: IUser | null = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (stakeAmount > user.balance) {
            return res.status(400).json({ message: "Insufficient balance" });
        }


        user.balance = Number(user.balance - stakeAmount);
        await user.save();
        const trade: ITrade = new Trade({
            userId,
            asset,
            side,
            stakeAmount,
            entryPrice: currentPrice,
            payoutRatio: PLATFORM_PAYOUT_RATIO, // Use the constant from finance.ts
            entryTime: new Date(),
            expiryTime: new Date(Date.now() + expiryDuration) // expiryDuration in milliseconds
        });
        await trade.save();

        // Create transaction record for the stake
        const stakeTransaction: ITransaction = new Transaction({
            userId,
            type: "trade_fee",
            amount: stakeAmount,
            status: "completed",
            meta: { tradeId: trade._id, type: 'stake' }
        });
        await stakeTransaction.save();

        return res.json({
            message: "Trade placed successfully",
            trade,
            transaction: stakeTransaction,
            stakeAmount: stakeAmount,
            balance: user.balance
        });

    } catch (error) {
        console.error('Trade placement error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export { placeTrade };