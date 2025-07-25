import { User, IUser } from "../models/User";
import { Request, Response } from "express";
import {generateOTP, hashPassword, verifyToken, signToken, comparePassword, otpExpiresAt} from "../utils/lib";

const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, role }: IUser = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await hashPassword(password);
        const otp = generateOTP();
        const otpExpiration = otpExpiresAt();
        

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}