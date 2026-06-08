import ApiError from "../utils/api/error.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const verifyOwnership = (ownerId, currentUserId) => {
  if (ownerId.toString() !== currentUserId.toString()) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Access denied");
  }
};

export default verifyOwnership;
