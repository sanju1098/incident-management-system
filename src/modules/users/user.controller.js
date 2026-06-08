import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/api/response.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import {
  getProfileService,
  updateProfileService,
  getUsersService,
  activateUserService,
  deactivateUserService,
} from "./user.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await getProfileService(req.user._id);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, user, "Profile fetched successfully"),
    );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await updateProfileService(req.user._id, req.validatedData.body);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, user, "Profile updated successfully"),
    );
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await getUsersService(req.query);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, users, "Users fetched successfully"));
});

export const activateUser = asyncHandler(async (req, res) => {
  const user = await activateUserService(req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, user, "User activated successfully"));
});

export const deactivateUser = asyncHandler(async (req, res) => {
  const user = await deactivateUserService(req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, user, "User deactivated successfully"),
    );
});
