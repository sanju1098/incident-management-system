import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/api/response.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import {
  createCommentService,
  deleteCommentService,
  getCommentsService,
  updateCommentService,
} from "./comment.service.js";

export const createComment = asyncHandler(async (req, res) => {
  const comment = await createCommentService(
    req.params.incidentId,
    req.validatedData.body,
    req.user._id,
  );
  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        comment,
        "Comment added successfully",
      ),
    );
});

export const getComments = asyncHandler(async (req, res) => {
  const comments = await getCommentsService(req.params.incidentId);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        comments,
        "Comments fetched successfully",
      ),
    );
});

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await updateCommentService(
    req.params.commentId,
    req.validatedData.body,
    req.user,
  );
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, comment, "Comment updated successfully"),
    );
});

export const deleteComment = asyncHandler(async (req, res) => {
  await deleteCommentService(req.params.commentId, req.user);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, null, "Comment deleted successfully"),
    );
});
