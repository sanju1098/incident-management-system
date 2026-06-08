import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { hasPermission } from "../utils/permissions.js";

const permit = (permission) => {
  return (req, res, next) => {
    const allowed = hasPermission(req.user.role, permission);

    if (!allowed) {
      return next(new ApiError(HTTP_STATUS.FORBIDDEN, "Permission denied"));
    }

    next();
  };
};

export default permit;
