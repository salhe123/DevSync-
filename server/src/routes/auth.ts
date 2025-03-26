import express from "express";
import {signup}  from "../controllers/authController";
import {login}  from "../controllers/authController";

import { tokenGenerator } from "../middlewares/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login, ); // Token middleware runs after login

export default router;
