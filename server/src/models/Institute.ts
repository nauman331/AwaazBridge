import mongoose, { Document } from "mongoose";

export interface IInstitute extends Document {
    name: string;
    location: string;
    logo: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const instituteSchema = new mongoose.Schema<IInstitute>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    logo: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Institute = mongoose.model<IInstitute>("Institute", instituteSchema);
