import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
// import testRoutes from "./test.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import teamRoutes from "../modules/teams/team.routes.js";
import uploadRoutes from "../modules/uploads/upload.routes.js";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/test", testRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/uploads", uploadRoutes);

export default router;
