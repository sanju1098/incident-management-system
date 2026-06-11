import { Router } from "express";
import protect from "../../middleware/auth.middleware.js";
import { getIncidentTimeline } from "./timeline.controller.js";

const router = Router();

router.get("/incidents/:id/timeline", protect, getIncidentTimeline);

export default router;
