import Incident from "./incident.model.js";
import ApiError from "../../utils/api/error.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

export const createIncidentService = async (payload, userId) => {
  return Incident.create({
    ...payload,
    createdBy: userId,
  });
};

export const getIncidentsService = async () => {
  return Incident.find()
    .populate("createdBy", "name email")
    .populate("assignedTeam", "name")
    .populate("assignee", "name email")
    .sort({
      createdAt: -1,
    });
};

export const getIncidentByIdService = async (incidentId) => {
  const incident = await Incident.findById(incidentId)
    .populate("createdBy", "name email")
    .populate("assignedTeam", "name")
    .populate("assignee", "name email");

  if (!incident) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Incident not found");
  }

  return incident;
};

export const updateIncidentService = async (incidentId, payload) => {
  if (payload.status === "Resolved") {
    payload.resolvedAt = new Date();
  }

  const incident = await Incident.findByIdAndUpdate(incidentId, payload, {
    new: true,
    runValidators: true,
  });

  if (!incident) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Incident not found");
  }

  return incident;
};

export const deleteIncidentService = async (incidentId) => {
  const incident = await Incident.findByIdAndDelete(incidentId);
  if (!incident) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Incident not found");
  }

  return true;
};
