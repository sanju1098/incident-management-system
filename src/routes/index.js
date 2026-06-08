import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
// import testRoutes from "./test.routes.js";
import userRoutes from "../modules/users/user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/test", testRoutes);
router.use("/users", userRoutes);

export default router;
