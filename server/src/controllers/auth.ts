import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

export const signup = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
