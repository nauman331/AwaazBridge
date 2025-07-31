import { Router } from "express";
import { registerUser, verifyOTP, login, resetPassword, requestPasswordReset, GoogleLoginController, getProfile } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate.middleware"
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginSchema, registerSchema, verifyOTPSchema, resetPasswordSchema } from "../validators/auth.validator";
const router = Router();

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/verify-otp", validateRequest(verifyOTPSchema), verifyOTP);
router.post("/login", validateRequest(loginSchema), login);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", validateRequest(resetPasswordSchema), resetPassword);
router.post("/google-login", GoogleLoginController);
router.get("/profile", authMiddleware, getProfile);

export default router;