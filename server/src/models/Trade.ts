import mongoose, { Document, Schema } from "mongoose";

export interface ITrade extends Document {
    userId: mongoose.Types.ObjectId;
    asset: string;
    side: "buy" | "sell";
    amount: number;
    price: number;
    commission: number;
    payoutRatio: number;
    net: number;
    status: 'filled' | 'canceled';
}

const TradeSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    asset: { type: String, required: true },
    side: { type: String, enum: ['buy', 'sell'], required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    commission: { type: Number, required: true },
    payoutRatio: { type: Number, default: 1 },
    net: { type: Number, required: true },
    status: { type: String, enum: ['filled', 'canceled'], required: true },
});

export const Trade = mongoose.model<ITrade>('Trade', TradeSchema);