import cloudinary from "../../config/cloudinary.js";
import ApiError from "../../utils/api/error.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

export const uploadSingleFile = async (file) => {
  return {
    url: file.path,
    publicId: file.filename,
  };
};

export const uploadMultipleFiles = async (files) => {
  return files.map((file) => ({
    url: file.path,
    publicId: file.filename,
  }));
};
