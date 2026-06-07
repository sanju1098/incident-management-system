import User from "./models/user.models.js";
import RefreshToken from "./models/refreshToken.model.js";
import ApiError from "../../utils/api/error.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

// Register Service - Register a new user
export const registerUser = async (payload) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Email already registered");
  }

  const user = await User.create(payload);
  const userData = await User.findById(user._id); // This ensures password is never returned.
  return userData;
};

// Login Service - Authenticate user and generate tokens
export const loginUser = async (email, password) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid User credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid Password");
  }

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};
