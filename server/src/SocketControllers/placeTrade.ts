import { User, IUser } from "../models/User";
import { Trade, ITrade } from "../models/Trade";
import { Transaction, ITransaction } from "../models/Transaction";
import {
    PLATFORM_PAYOUT_RATIO
} from "../utils/finance";
import { getCoinPrice } from "../services/getcoins";

interface TradeData {
    userId: string;
    asset: string;
    side: 'call' | 'put';
    stakeAmount: number;
    expiryDuration: number;
}


export const placeTrade = async (data: TradeData) => {
    const { userId, asset, side, stakeAmount, expiryDuration } = data;
    if (!userId || !asset || !side || !stakeAmount || !expiryDuration) {
        return { message: "Missing required fields", isOk: false };
    }

    if (!['call', 'put'].includes(side)) {
        return { message: "Side must be 'call' or 'put'", isOk: false };
    }

    const user: IUser | null = await User.findById(userId);
    if (!user) {
        return { message: "User not found", isOk: false };
    }

    if (stakeAmount > user.balance) {
        return { message: "Insufficient balance", isOk: false };
    }
    user.balance = Number(user.balance - stakeAmount);
    await user.save();
    const currentPrice = await getCoinPrice(asset);
    if (!currentPrice) {
        return { message: "Failed to fetch asset price", isOk: false };
    }
    const trade: ITrade = new Trade({
        userId,
        asset,
        side,
        stakeAmount,
        entryPrice: currentPrice,
        payoutRatio: PLATFORM_PAYOUT_RATIO,
        entryTime: new Date(),
        expiryTime: new Date(Date.now() + expiryDuration)
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

    return {
        message: "Trade placed successfully",
        trade,
        transaction: stakeTransaction,
        stakeAmount: stakeAmount,
        balance: user.balance,
        isOk: true
    };


};