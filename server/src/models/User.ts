import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "Admin" | "Manager" | "Finance Officer" | "Viewer";
    companyId: mongoose.Types.ObjectId;
    otp: string | null;
    otpExpiresAt: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["Admin", "Manager", "Finance Officer", "Viewer"], required: true, default: "Viewer" },
    companyId: { type: Schema.Types.ObjectId, ref: "Company" },
    otp: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);
