import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/lib";
import { User, IUser } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            userId: any;
            role: string;
            user?: IUser;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authroizationHeader = req.headers.authorization;
        if (!authroizationHeader || !authroizationHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization header is missing or invalid"
            });
        }

        const token = authroizationHeader.split(" ")[1];
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
        const user = await User.findById(decoded.userId);
        if (!user || !user.isActive) {
            return res.status(404).json({
                message: "Invalid user or user is not active"
            });
        }
        req.userId = user._id;
        req.role = user.role;
        next();

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You do not have the required role"
            });
        }
        next();
    };
}
