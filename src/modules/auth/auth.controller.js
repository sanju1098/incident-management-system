import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/api/response.js";
import ApiError from "../../utils/api/error.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import {
  registerUser,
  loginUser,
  getUserProfile,
  refreshUserToken,
  logoutUser,
} from "./auth.service.js";

// Register Controller - Handle user registration
export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.validatedData.body);

  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        user,
        "User registered successfully",
      ),
    );
});

// Login Controller - Handle user login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedData.body;
  const data = await loginUser(email, password);

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, data, "Login successful"));
});

// Profile Controller - Get user profile (Protected route)
export const getProfile = asyncHandler(async (req, res) => {
  const user = await getUserProfile(req.user._id); // Assuming auth middleware attaches user to req
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        user,
        "User profile retrieved successfully",
      ),
    );
});

// Refresh Token Controller - Handle token refresh
export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!token) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Refresh token required");
  }

  const accessToken = await refreshUserToken(token);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      {
        accessToken,
      },
      "Token refreshed",
    ),
  );
});

// Logout Controller - Handle user logout
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!token) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Refresh token required");
  }

  await logoutUser(token);

  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        "User logged out successfully",
        "Logout successful",
      ),
    );
});
