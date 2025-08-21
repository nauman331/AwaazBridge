import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["Admin", "Student", "Teacher"], "Role is required"),
    phone: z.string().min(10, "Phone number must be at least 10 characters long"),
    address: z.string().min(3, "Address must be at least 3 characters long"),
    specialization: z.string().min(2, "Specialization must be at least 2 characters long"),
})

export const verifyOTPSchema = z.object({
    email: z.string().email("Invalid email format"),
    otp: z.string().length(6, "OTP must be exactly 6 characters long"),
})
export const resetPasswordSchema = z.object({
    otp: z.string().length(6, "OTP must be exactly 6 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})