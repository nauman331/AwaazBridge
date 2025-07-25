import mongoose, { Document,Schema } from "mongoose";

export interface IVendor extends Document {
    name: string;
    address: string;
    phone: string;
    email: string;
    companyId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
const vendorSchema = new Schema<IVendor>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Vendor = mongoose.model<IVendor>("Vendor", vendorSchema);
