import Team from "./team.model.js";
import ApiError from "../../utils/api/error.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { getPagination } from "../../utils/pagination.js";
import mongoose from "mongoose";

// Create Team Service - Handle team creation logic
export const createTeamService = async (payload, userId) => {
  const existingTeam = await Team.findOne({
    name: payload.name,
  });

  if (existingTeam) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Team already exists");
  }

  return Team.create({
    ...payload,
    createdBy: userId,
  });
};

// Get Teams Service - Handle fetching teams with pagination, search, and member count
export const getTeamsService = async (query) => {
  const { page = 1, limit = 10, search } = query;
  const { skip, pageSize } = getPagination(page, limit);

  // Build match stage for search
  const matchStage = {};
  if (search) {
    matchStage.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Aggregation pipeline
  const teams = await Team.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdByDetails",
      },
    },
    {
      $addFields: {
        memberCount: { $size: "$members" },
        createdBy: { $arrayElemAt: ["$createdByDetails", 0] },
      },
    },
    {
      $project: {
        createdByDetails: 0,
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: pageSize },
  ]);

  // Get total count for pagination
  const totalResult = await Team.aggregate([
    { $match: matchStage },
    { $count: "total" },
  ]);

  const total = totalResult.length > 0 ? totalResult[0].total : 0;
  const totalPages = Math.ceil(total / pageSize);

  return {
    teams,
    pagination: {
      page: Number(page),
      limit: pageSize,
      total,
      totalPages,
    },
  };
};

// Get Team By ID Service - Handle fetching a single team by ID
export const getTeamByIdService = async (teamId) => {
  const teams = await Team.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(teamId) } },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdByDetails",
      },
    },
    {
      $addFields: {
        memberCount: { $size: "$members" },
        createdBy: { $arrayElemAt: ["$createdByDetails", 0] },
      },
    },
    {
      $project: {
        createdByDetails: 0,
      },
    },
  ]);

  if (!teams || teams.length === 0) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Team not found");
  }

  return teams[0];
};

// Update Team Service - Handle updating team details
export const updateTeamService = async (teamId, payload) => {
  const team = await Team.findByIdAndUpdate(teamId, payload, {
    new: true,
    runValidators: true,
  });

  if (!team) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Team not found");
  }
  return team;
};

// Delete Team Service - Handle deleting a team
export const deleteTeamService = async (teamId) => {
  const team = await Team.findByIdAndDelete(teamId);

  if (!team) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Team not found");
  }

  return true;
};

// Assign Members Service - Handle adding members to a team
export const assignMembersService = async (teamId, memberIds) => {
  const team = await Team.findByIdAndUpdate(
    teamId,
    {
      members: memberIds,
    },
    {
      new: true,
    },
  ).populate("members", "name email role");

  if (!team) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Team not found");
  }

  return team;
};
