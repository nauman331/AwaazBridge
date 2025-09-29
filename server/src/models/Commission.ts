import mongoose, { Document, Schema } from "mongoose";

export interface ITrade extends Document {
    tradeId: mongoose.Types.ObjectId;
    amount: number;
    createdAt: Date;
}

const CommissionSchema: Schema = new Schema({
    tradeId: { type: Schema.Types.ObjectId, ref: 'Trade', required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Commission = mongoose.model<ITrade>('Commission', CommissionSchema);