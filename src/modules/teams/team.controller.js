import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/api/response.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";
import {
  createTeamService,
  getTeamsService,
  getTeamByIdService,
  updateTeamService,
  deleteTeamService,
  assignMembersService,
} from "./team.services.js";

// Create Team Controller - Handle team creation
export const createTeam = asyncHandler(async (req, res) => {
  const team = await createTeamService(req.validatedData.body, req.user._id);
  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(HTTP_STATUS.CREATED, team, "Team created successfully"),
    );
});

// Get Teams Controller - Handle fetching teams with pagination and filtering
export const getTeams = asyncHandler(async (req, res) => {
  const data = await getTeamsService(req.query);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, data, "Teams retrieved successfully"),
    );
});

// Get Team By ID Controller - Handle fetching a single team by ID
export const getTeamById = asyncHandler(async (req, res) => {
  const team = await getTeamByIdService(req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, team, "Team retrieved successfully"));
});

// Update Team Controller - Handle updating team details
export const updateTeam = asyncHandler(async (req, res) => {
  const team = await updateTeamService(req.params.id, req.validatedData.body);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, team, "Team updated successfully"));
});

// Delete Team Controller - Handle deleting a team
export const deleteTeam = asyncHandler(async (req, res) => {
  await deleteTeamService(req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, null, "Team deleted successfully"));
});

// Assign Members Controller - Handle assigning members to a team
export const assignMembers = asyncHandler(async (req, res) => {
  const team = await assignMembersService(
    req.params.id,
    req.validatedData.body.memberIds,
  );
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        team,
        "Members assigned to team successfully",
      ),
    );
});
