import mongoose, { Schema, Document } from "mongoose";

export interface IPosition extends Document {
    userId: mongoose.Types.ObjectId;
    asset: string;
    side: "buy" | "sell";
    amount: number;
    entryPrice: number;
    unrealizedPNL: number;
    createdAt: Date;
}

const positionSchema = new Schema<IPosition>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    asset: { type: String, required: true },
    side: { type: String, enum: ["buy", "sell"], required: true },
    amount: { type: Number, required: true },
    entryPrice: { type: Number, required: true },
    unrealizedPNL: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Position = mongoose.model<IPosition>("Position", positionSchema);