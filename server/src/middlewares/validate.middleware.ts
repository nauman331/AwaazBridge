import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parseBody = await schema.parseAsync(req.body);
            req.body = parseBody;
            next();
        } catch (err) {
            res.status(401).json({error: err})
            return next();
        }
    }
};
