import Comment from "./comment.model.js";
import Incident from "../incidents/incident.model.js";
import ApiError from "../../utils/api/error.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { createTimelineEvent } from "../timeline/timeline.service.js";

export const createCommentService = async (incidentId, payload, userId) => {
  const incident = await Incident.findById(incidentId);

  if (!incident) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Incident not found");
  }

  const comment = await Comment.create({
    incident: incidentId,
    author: userId,
    ...payload,
  });

  await createTimelineEvent({
    incidentId,
    actor: userId,
    action: "COMMENT_ADDED",
    newValue: {
      content: comment.content,
      commentId: comment._id,
    },
  });

  return comment;
};

export const getCommentsService = async (incidentId) => {
  return Comment.find({
    incident: incidentId,
    isDeleted: false,
  })
    .populate("author", "name email")
    .sort({
      createdAt: 1,
    });
};

export const updateCommentService = async (commentId, payload, user) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Comment not found");
  }

  const isOwner = comment.author.toString() === user._id.toString();
  const isAdmin = user.role === "Admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Not authorized");
  }

  const oldContent = comment.content;

  comment.content = payload.content;
  comment.isEdited = true;
  comment.editedAt = new Date();
  await comment.save();

  await createTimelineEvent({
    incidentId: comment.incident,
    actor: user._id,
    action: "COMMENT_UPDATED",
    previousValue: oldContent,
    newValue: payload.content,
  });

  return comment;
};

export const deleteCommentService = async (commentId, user) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Comment not found");
  }

  const isOwner = comment.author.toString() === user._id.toString();
  const isAdmin = user.role === "Admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Not authorized");
  }

  comment.isDeleted = true;
  comment.deletedAt = new Date();
  await comment.save();

  await createTimelineEvent({
    incidentId: comment.incident,
    actor: user._id,
    action: "COMMENT_DELETED",
    previousValue: comment.content,
  });
};
