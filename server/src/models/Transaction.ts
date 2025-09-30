import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    type: "deposit" | "withdraw_request" | "withdraw_payout" | "trade_fee";
    amount: number;
    status: "pending" | "completed" | "failed" | "canceled";
    createdAt: Date;
    updatedAt: Date;
    meta?: Record<string, any>;
}

const transactionSchema = new Schema<ITransaction>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["deposit", "withdraw_request", "withdraw_payout", "trade_fee"], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "failed", "canceled"], required: true, default: "pending" },
    meta: { type: Schema.Types.Mixed, default: {} },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);

