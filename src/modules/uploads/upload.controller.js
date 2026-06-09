import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/api/response.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { uploadSingleFile, uploadMultipleFiles } from "./upload.service.js";

export const uploadSingle = asyncHandler(async (req, res) => {
  const file = await uploadSingleFile(req.file);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, file, "File uploaded successfully"));
});

export const uploadMultiple = asyncHandler(async (req, res) => {
  const files = await uploadMultipleFiles(req.files);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, files, "Files uploaded successfully"),
    );
});
