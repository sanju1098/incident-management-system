import { Router } from "express";

import validate from "../../middleware/validate.middleware.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { register, login, getProfile } from "./auth.controller.js";

const router = Router();

// @route   POST /api/v1/auth/register
// @desc    Register a new user
router.post("/register", validate(registerSchema), register);

// @route   POST /api/v1/auth/login
// @desc    Login user and return token
router.post("/login", validate(loginSchema), login);

// @route   POST /api/v1/auth/profile
// @desc    Get user profile (Protected route - requires auth middleware)
router.get("/profile", authMiddleware, getProfile);

export default router;
