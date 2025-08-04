import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: "Admin" | "Teacher" | "Student";
    Institute: mongoose.Types.ObjectId;
    otp: string | null;
    otpExpiresAt: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    picture?: string;
    googleId: string | null;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null, minlength: 6 },
    role: { type: String, enum: ["Admin", "Teacher", "Student"], required: true, default: "Student" },
    Institute: { type: Schema.Types.ObjectId, ref: "Institute" },
    otp: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    picture: { type: String, default: null },
    googleId: { type: String, default: null }
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);
