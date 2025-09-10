import mongoose, { Document, Schema } from "mongoose";

export interface ICall extends Document {
    roomId: string;
    participants: string[];
    startedAt: Date;
    endedAt: Date | null;
    metadata?: Record<string, any>;
}

const CallSchema = new Schema<ICall>({
    roomId: { type: String, required: true, unique: true },
    participants: { type: [String], required: true },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, required: false },
    metadata: { type: Object, required: false },
});

export const Call = mongoose.model<ICall>("Call", CallSchema);