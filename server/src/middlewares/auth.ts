import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

/**
 * Middleware to generate a simple token
 */
export const tokenGenerator = (req: Request, res: Response, next: NextFunction): Response | void => {
  if (!res.locals.user) {
    return res.status(400).json({ message: "User data is required for token generation" });
  }

  // Generate a random token (simplified, use a secure method in production)
  const token = crypto.randomBytes(32).toString("hex");

  return res.status(200).json({ user: res.locals.user, token });
};
