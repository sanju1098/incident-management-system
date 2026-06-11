import Incident from "./incident.model.js";
import ApiError from "../../utils/api/error.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { createTimelineEvent } from "../timeline/timeline.service.js";

export const createIncidentService = async (payload, userId) => {
  const incident = await Incident.create({
    ...payload,
    createdBy: userId,
  });

  await createTimelineEvent({
    incidentId: incident._id,
    actor: userId,
    action: "INCIDENT_CREATED",
    newValue: {
      title: incident.title,
    },
  });

  return incident;
};

export const getIncidentsService = async (filters) => {
  const { search, severity, status, team, page, limit, sortBy, sortOrder } =
    filters;

  const query = {
    isDeleted: false,
  };

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
    .limit(limit)
    .lean();
  /**
  Without lean: MongoDB Document → Mongoose Object → Heavy
  With lean: Plain JavaScript Object → Faster → Less memory
  */

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

export const updateIncidentService = async (incidentId, payload, userId) => {
  const incident = await Incident.findById(incidentId);

  if (!incident) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Incident not found");
  }

  const oldSeverity = incident.severity;
  const oldTeam = incident.assignedTeam;
  const oldAssignee = incident.assignee;
  const oldStatus = incident.status;

  if (payload.status === "Resolved" && oldStatus !== "Resolved") {
    payload.resolvedAt = new Date();
  }

  Object.assign(incident, payload);
  await incident.save();

  if (oldStatus !== incident.status) {
    await createTimelineEvent({
      incidentId,
      actor: userId,
      action: "STATUS_CHANGED",
      previousValue: oldStatus,
      newValue: incident.status,
    });
  }

  if (oldSeverity !== incident.severity) {
    await createTimelineEvent({
      incidentId,
      actor: userId,
      action: "SEVERITY_CHANGED",
      previousValue: oldSeverity,
      newValue: incident.severity,
    });
  }

  if (String(oldTeam) !== String(incident.assignedTeam)) {
    await createTimelineEvent({
      incidentId,
      actor: userId,
      action: "TEAM_ASSIGNED",
      previousValue: oldTeam,
      newValue: incident.assignedTeam,
    });
  }

  if (String(oldAssignee) !== String(incident.assignee)) {
    await createTimelineEvent({
      incidentId,
      actor: userId,
      action: "ASSIGNEE_CHANGED",
      previousValue: oldAssignee,
      newValue: incident.assignee,
    });
  }

  return incident;
};

export const deleteIncidentService = async (incidentId, userId) => {
  const incident = await Incident.findById(incidentId);

  if (!incident) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Incident not found");
  }
  incident.isDeleted = true;
  incident.deletedAt = new Date();
  await incident.save();

  await createTimelineEvent({
    incidentId,
    actor: userId,
    action: "INCIDENT_DELETED",
  });

  return true;
};

export const restoreIncidentService = async (incidentId, userId) => {
  const incident = await Incident.findById(incidentId);

  if (!incident) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Incident not found");
  }

  incident.isDeleted = false;
  incident.deletedAt = null;
  await incident.save();

  await createTimelineEvent({
    incidentId,
    actor: userId,
    action: "INCIDENT_RESTORED",
  });

  return incident;
};

export const archiveIncidentService = async (incidentId, userId) => {
  const incident = await Incident.findById(incidentId);

  if (!incident) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Incident not found");
  }

  if (incident.status !== "Resolved") {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Only resolved incidents can be archived",
    );
  }

  incident.isArchived = true;
  incident.archivedAt = new Date();
  await incident.save();

  await createTimelineEvent({
    incidentId,
    actor: userId,
    action: "INCIDENT_ARCHIVED",
  });

  return incident;
};

export const incidentStatsService = async () => {
  return Incident.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$severity",
        count: {
          $sum: 1,
        },
      },
    },
  ]);
};
