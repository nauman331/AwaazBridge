import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/sendEmail";
import { emailTemplates } from "../utils/constants";

export const sendOTPEmail = async (email: string, name: string, otp: string): Promise<boolean> => {
    const subject = "Your FinanceFire OTP Code";
    const html = emailTemplates.OTPTemplate({ subject, name, otp });
    try {
        await sendEmail(email, subject, html);
        return true;
    } catch {
        return false;
    }
};

export const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

export const signToken = (user: { userId: string, role: string }): string => {
    return jwt.sign(
        user,
        process.env.JWT_SECRET as any || "lmWJcEvyovHbX6Gr5gWBdNUBcVvLSX2CuFEcmyNJqd61dvqFlh21CogsqVtsOegSNKKRbidf",
        { expiresIn: process.env.JWT_EXPIRATION as any || "7d" }
    );
}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, process.env.JWT_SECRET as any) as JwtPayload;
}

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
}

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}
export const otpExpiresAt = (): Date => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 10);
    return date;
}