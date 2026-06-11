import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
// import testRoutes from "./test.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import teamRoutes from "../modules/teams/team.routes.js";
import uploadRoutes from "../modules/uploads/upload.routes.js";
import incidentRoutes from "../modules/incidents/incident.routes.js";
import commentRoutes from "../modules/comments/comment.routes.js";
import timelineRoutes from "../modules/timeline/timeline.routes.js";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/test", testRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/uploads", uploadRoutes);
router.use("/incidents", incidentRoutes);
router.use("/", commentRoutes);
router.use("/", timelineRoutes);

export default router;
