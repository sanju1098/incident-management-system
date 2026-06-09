import { Router } from "express";
import protect from "../../middleware/auth.middleware.js";
import upload from "./upload.middleware.js";
import { uploadSingle, uploadMultiple } from "./upload.controller.js";

const router = Router();

router.post("/single", protect, upload.single("file"), uploadSingle);
router.post("/multiple", protect, upload.array("files", 10), uploadMultiple);

export default router;
