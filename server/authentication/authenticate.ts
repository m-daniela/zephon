import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

/**
 * Generate the JWT token based on a secret
 * @param email 
 * @returns JWT token
 */
export const generateAccessToken = (email: string) => {
    console.log(process.env.TOKEN_SECRET);
    return jwt.sign({email}, process.env.TOKEN_SECRET as string, { expiresIn: "24h" });
};

/**
 * Authenticate the token
 * @param req 
 * @param res 
 * @param next 
 * @returns Error 403 | continues to the required resource
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (error: unknown) => {
        if (error) return res.sendStatus(403);
        next();
    });
};