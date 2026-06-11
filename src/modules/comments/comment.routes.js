import { Router } from "express";
import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import {
  createCommentSchema,
  updateCommentSchema,
} from "./comment.validation.js";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "./comment.controller.js";

const router = Router();

router.post(
  "/incidents/:incidentId/comments",
  protect,
  authorize("Admin", "Manager", "Developer"),
  validate(createCommentSchema),
  createComment,
);
router.get("/incidents/:incidentId/comments", protect, getComments);
router.put(
  "/comments/:commentId",
  protect,
  validate(updateCommentSchema),
  updateComment,
);
router.delete("/comments/:commentId", protect, deleteComment);

export default router;
