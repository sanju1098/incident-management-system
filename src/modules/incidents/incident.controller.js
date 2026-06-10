import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/api/response.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import {
  createIncidentService,
  getIncidentsService,
  getIncidentByIdService,
  updateIncidentService,
  deleteIncidentService,
} from "./incident.service.js";

export const createIncident = asyncHandler(async (req, res) => {
  const incident = await createIncidentService(
    req.validatedData.body,
    req.user._id,
  );
  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        incident,
        "Incident created successfully",
      ),
    );
});

export const getIncidents = asyncHandler(async (req, res) => {
  const incidents = await getIncidentsService(req.validatedData.query);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        incidents,
        "Incidents fetched successfully",
      ),
    );
});

export const getIncidentById = asyncHandler(async (req, res) => {
  const incident = await getIncidentByIdService(req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        incident,
        "Incident details fetched successfully",
      ),
    );
});

export const updateIncident = asyncHandler(async (req, res) => {
  const incident = await updateIncidentService(
    req.params.id,
    req.validatedData.body,
  );
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        incident,
        "Incident updated successfully",
      ),
    );
});

export const deleteIncident = asyncHandler(async (req, res) => {
  await deleteIncidentService(req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, null, "Incident deleted successfully"),
    );
});
