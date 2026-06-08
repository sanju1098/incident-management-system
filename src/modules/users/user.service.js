import User from "../auth/models/user.models.js";
import ApiError from "../../utils/api/error.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { getPagination } from "../../utils/pagination.js";

export const getProfileService = async (userId) => {
  return User.findById(userId);
};

export const updateProfileService = async (userId, payload) => {
  const user = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return user;
};

export const getUsersService = async (query) => {
  const { page = 1, limit = 10, role, search, sort } = query;
  const { skip, pageSize } = getPagination(page, limit);
  const filter = {};

  if (role) {
    filter.role = role;
  }

  // Add search functionality
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Build sort object
  let sortObj = { createdAt: -1 };
  if (sort) {
    // Handle multiple sort fields: sort=name,-createdAt
    const sortFields = sort.split(",");
    sortObj = {};
    sortFields.forEach((field) => {
      if (field.startsWith("-")) {
        sortObj[field.substring(1)] = -1;
      } else {
        sortObj[field] = 1;
      }
    });
  }

  const users = await User.find(filter)
    .skip(skip)
    .limit(pageSize)
    .sort(sortObj)
    .select("-password");
  const total = await User.countDocuments(filter);
  const totalPages = Math.ceil(total / pageSize);

  return {
    users,
    pagination: {
      page: Number(page),
      limit: pageSize,
      total,
      totalPages,
    },
  };
};

export const activateUserService = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      isActive: true,
    },
    {
      new: true,
    },
  );

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return user;
};

export const deactivateUserService = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      isActive: false,
    },
    {
      new: true,
    },
  );

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return user;
};
