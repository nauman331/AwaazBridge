import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const validateRequest = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parseBody = await schema.parseAsync(req.body);
            req.body = parseBody;
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(401).json({ error: err.issues });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    }
};
