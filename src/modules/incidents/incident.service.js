import Incident from "./incident.model.js";
import ApiError from "../../utils/api/error.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

export const createIncidentService = async (payload, userId) => {
  return Incident.create({
    ...payload,
    createdBy: userId,
  });
};

export const getIncidentsService = async (filters) => {
  const { search, severity, status, team, page, limit, sortBy, sortOrder } =
    filters;

  const query = {};

  if (search) {
    query.$text = {
      $search: search,
    };
  }

  if (severity) {
    query.severity = severity;
  }

  if (status) {
    query.status = status;
  }

  if (team) {
    query.assignedTeam = team;
  }

  const skip = (page - 1) * limit;

  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const incidents = await Incident.find(query)
    .populate("createdBy", "name email")
    .populate("assignedTeam", "name")
    .populate("assignee", "name email")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Incident.countDocuments(query);

  return {
    incidents,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
