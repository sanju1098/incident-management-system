import { Router } from "express";
import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import {
  createTeamSchema,
  updateTeamSchema,
  assignMembersSchema,
} from "./team.validation.js";
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  assignMembers,
} from "./team.controller.js";

const router = Router();

// Create Team - Protected route, only accessible by Admins and Managers
router.post(
  "/",
  protect,
  authorize("Admin", "Manager"),
  validate(createTeamSchema),
  createTeam,
);

// View Teams - Protected route, accessible by all authenticated users
router.get("/", protect, getTeams);
router.get("/:id", protect, getTeamById);

// Update Team - Protected route, only accessible by Admins and Managers
router.put(
  "/:id",
  protect,
  authorize("Admin", "Manager"),
  validate(updateTeamSchema),
  updateTeam,
);

// Delete Team - Protected route, only accessible by Admins and Managers
router.delete("/:id", protect, authorize("Admin"), deleteTeam);

// Assign Members
router.patch(
  "/:id/members",
  protect,
  authorize("Admin", "Manager"),
  validate(assignMembersSchema),
  assignMembers,
);

export default router;
