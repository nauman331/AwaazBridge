import mongoose, { Document } from "mongoose";

export interface IDepartment extends Document {
    name: string;
    location: string;
    logo: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const departmentSchema = new mongoose.Schema<IDepartment>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    logo: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Department = mongoose.model<IDepartment>("Department", departmentSchema);
