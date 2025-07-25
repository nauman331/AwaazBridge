import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
    name: string;
    address: string;
    industry: string;
    subscriptionPlan: "Free" | "Pro" | "Business";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const companySchema = new Schema<ICompany>({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    industry: { type: String, required: true },
    subscriptionPlan: { type: String, enum: ["Free", "Pro", "Business"], required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Company = mongoose.model<ICompany>("Company", companySchema);
