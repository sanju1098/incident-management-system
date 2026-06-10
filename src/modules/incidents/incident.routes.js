import { Router } from "express";
import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import {
  createIncidentSchema,
  incidentQuerySchema,
  updateIncidentSchema,
} from "./incident.validation.js";
import {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
} from "./incident.controller.js";

const router = Router();

router.post(
  "/",
  protect,
  authorize("Admin", "Manager", "Developer"),
  validate(createIncidentSchema),
  createIncident,
);
router.get("/", protect, validate(incidentQuerySchema), getIncidents);
router.get("/:id", protect, getIncidentById);
router.put(
  "/:id",
  protect,
  authorize("Admin", "Manager", "Developer"),
  validate(updateIncidentSchema),
  updateIncident,
);
router.delete("/:id", protect, authorize("Admin"), deleteIncident);

export default router;
