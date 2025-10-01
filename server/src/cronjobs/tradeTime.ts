import { schedule, ScheduledTask } from "node-cron";
import { Trade } from "../models/Trade";
import { User } from "../models/User";
import { Transaction } from "../models/Transaction";
import {
    calculateBinaryOptionsPayout,
    PLATFORM_PAYOUT_RATIO
} from "../utils/finance";
import { getCoinPrice } from "../services/getcoins";

schedule("*/10 * * * * *", async () => {
    console.log("Checking for expired trades...");
    const now = Date.now();

    const pendingTrades = await Trade.find({
        status: "pending",
        expiryTime: { $lte: now }
    });

    for (const trade of pendingTrades) {
        const user = await User.findById(trade.userId);
        if (!user) continue;

        const currentPrice = await getCoinPrice(trade.asset);
        if (!currentPrice) {
            console.error(`Failed to fetch price for ${trade.asset}`);
            continue;
        }

        let isWin = false;
        let result: "win" | "loss" = "loss";

        if (trade.side === "call" && currentPrice > trade.entryPrice) {
            isWin = true;
            result = "win";
        } else if (trade.side === "put" && currentPrice < trade.entryPrice) {
            isWin = true;
            result = "win";
        }

        const payoutCalculation = calculateBinaryOptionsPayout(
            trade.stakeAmount,
            PLATFORM_PAYOUT_RATIO,
            isWin
        );

        if (payoutCalculation.payout > 0) {
            user.balance += payoutCalculation.payout;
            await user.save();

            const payoutTransaction = new Transaction({
                userId: trade.userId,
                type: "trade_fee",
                amount: payoutCalculation.payout,
                status: "completed",
                meta: {
                    tradeId: trade._id,
                    type: 'payout',
                    profit: payoutCalculation.profit
                }
            });
            await payoutTransaction.save();
        }


        trade.status = result;
        trade.settlementPrice = currentPrice;
        trade.settledAt = new Date(now);
        trade.payout = payoutCalculation.payout;
        await trade.save();

        console.log(`Trade ${trade._id} settled as ${result}`);
        console.log(`- Stake: $${trade.stakeAmount}, Payout: $${payoutCalculation.payout}`);
        console.log(`- User profit/loss: $${payoutCalculation.profit}`);
        console.log(`- User balance: $${user.balance}`);
        console.log(`- Platform profit: $${payoutCalculation.platformProfit}`);
    }
});
