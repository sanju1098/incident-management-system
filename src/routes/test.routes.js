import { Router } from "express";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = Router();

router.get("/admin", protect, authorize("Admin"), (req, res) => {
  res.json({
    message: "Admin route accessed",
  });
});

router.get("/manager", protect, authorize("Admin", "Manager"), (req, res) => {
  res.json({
    message: "Manager route accessed",
  });
});

export default router;
