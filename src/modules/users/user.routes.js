import { Router } from "express";
import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import { updateProfileSchema } from "./user.validation.js";
import {
  getProfile,
  updateProfile,
  getUsers,
  activateUser,
  deactivateUser,
} from "./user.controller.js";

const router = Router();

// Profile Routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, validate(updateProfileSchema), updateProfile);

// Admin Routes
router.get("/", protect, authorize("Admin"), getUsers);
router.patch("/:id/activate", protect, authorize("Admin"), activateUser);
router.patch("/:id/deactivate", protect, authorize("Admin"), deactivateUser);

export default router;
