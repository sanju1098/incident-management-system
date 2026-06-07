import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/api/response.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { registerUser, loginUser } from "./auth.service.js";

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

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, data, "Login successful"));
});

// Profile Controller - Get user profile (Protected route)
export const getProfile = asyncHandler(async (req, res) => {
  const user = req.user; // Assuming auth middleware attaches user to req
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
