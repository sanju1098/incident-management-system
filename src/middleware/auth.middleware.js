import ApiError from "../utils/api/error.js";
import User from "../modules/auth/models/user.models.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader =
      req.headers.authorization || req.headers.Authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authorization token missing or malformed");
    }

    const token = authorizationHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    if (!decoded || !decoded.userId) {
      throw new ApiError(401, "Invalid access token");
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    return next(
      new ApiError(401, "Error occurred while verifying access token", error),
    );

    next(error);
  }
};

export default authMiddleware;
