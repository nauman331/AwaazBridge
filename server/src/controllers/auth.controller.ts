import { User, IUser } from "../models/User";
import { Request, Response } from "express";
import { generateOTP, hashPassword, signToken, comparePassword, otpExpiresAt } from "../utils/lib";
import { sendOTPEmail } from "../utils/lib";

const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, role }: IUser = req.body;
        if (!name || !email || !password || !role)
            return res.status(400).json({ message: "All fields are required", isOk: false });
        if (role !== "Student" && role !== "Teacher")
            return res.status(400).json({ message: "Invalid role", isOk: false });
        if (await User.findOne({ email }))
            return res.status(400).json({ message: "User already exists", isOk: false });

        const otp = generateOTP();
        const hashedPassword = await hashPassword(password);

        if (!(await sendOTPEmail(email, name, otp)))
            return res.status(500).json({ message: "Failed to send OTP email", isOk: false });

        await new User({
            name,
            email,
            password: hashedPassword,
            role,
            otp,
            otpExpiresAt: otpExpiresAt(),
            isActive: false,
            companyId: null,
        }).save();

        return res.status(201).json({ message: "User registered successfully", isOk: true });
    } catch {
        return res.status(500).json({ message: "Internal server error", isOk: false });
    }
};

const verifyOTP = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp)
            return res.status(400).json({ message: "Email and OTP are required", isOk: false });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found", isOk: false });

        if (user.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP", isOk: false });

        if (user.otpExpiresAt && new Date(user.otpExpiresAt) < new Date())
            return res.status(400).json({ message: "OTP has expired! Request a new one.", isOk: false });

        user.isActive = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        return res.status(200).json({ message: "OTP verified successfully", isOk: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", isOk: false });
    }
};

const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email and password are required", isOk: false });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found", isOk: false });

        if (!(await comparePassword(password, user.password ?? "")))
            return res.status(401).json({ message: "Invalid Password", isOk: false });

        if (!user.isActive)
            return res.status(403).json({ message: "User is not active. Please verify your OTP.", isOk: false });

        const token = signToken({ userId: (user._id as string | { toString(): string }).toString(), role: user.role });
        return res.status(200).json({ token, userId: user._id, role: user.role, isOk: true });
    } catch {
        return res.status(500).json({ message: "Internal server error", isOk: false });
    }
};

const requestPasswordReset = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: "Email is required", isOk: false });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found", isOk: false });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt();

        if (!(await sendOTPEmail(email, user.name, otp)))
            return res.status(500).json({ message: "Failed to send OTP email", isOk: false });

        await user.save();
        return res.status(200).json({ message: "OTP sent to email", isOk: true });
    } catch {
        return res.status(500).json({ message: "Internal server error", isOk: false });
    }
};

const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password, otp } = req.body;
        if (!email || !password || !otp)
            return res.status(400).json({ message: "Email, password, and OTP are required", isOk: false });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found", isOk: false });

        if (user.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP", isOk: false });

        if (user.otpExpiresAt && new Date(user.otpExpiresAt) < new Date())
            return res.status(400).json({ message: "OTP has expired! Request a new one.", isOk: false });

        user.password = await hashPassword(password);
        user.isActive = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully", isOk: true });
    } catch (error: any) {
        console.error("Reset password error:", error);
        return res.status(500).json({ message: "Internal server error", error: error?.message, isOk: false });
    }
};

const GoogleLoginController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { access_token, role } = req.body;
        if (!access_token) {
            return res.status(400).json({ message: "Access token is required", isOk: false });
        }
        const googleRes = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        if (!googleRes.ok) {
            return res.status(400).json({ message: "Failed to fetch user info from Google", isOk: false });
        }
        const { sub: googleId, name, email, picture } = await googleRes.json();
        if (!email) {
            return res.status(400).json({ message: "Google account does not have an email", isOk: false });
        }
        let user = await User.findOne({ email });
        if (!user) {
            // Use provided role or default to "Student"
            const userRole = role || "Student";
            user = new User({
                name,
                email,
                picture,
                role: userRole,
                googleId,
                isActive: true,
            });
            await user.save();
        }
        const token = signToken({ userId: (user._id as string | { toString(): string }).toString(), role: user.role });
        return res.status(200).json({ token, userId: user._id, role: user.role, isOk: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", isOk: false });
    }
}

const getProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userID: string = (req as Request & { userId: string }).userId;
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized", isOk: false });
        }
        const user = await User.findById(userID).select("-password -otp -otpExpiresAt");
        if (!user) {
            return res.status(404).json({ message: "User not found", isOk: false });
        }
        return res.status(200).json({ ...user.toObject(), isOk: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", isOk: false });
    }
};

export { registerUser, verifyOTP, login, requestPasswordReset, resetPassword, GoogleLoginController, getProfile };