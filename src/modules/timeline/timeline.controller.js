import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/api/response.js";
import Timeline from "./timeline.model.js";

export const getIncidentTimeline = asyncHandler(async (req, res) => {
  const timeline = await Timeline.find({
    incident: req.params.id,
  })
    .populate("actor", "name email")
    .sort({
      createdAt: -1,
    });

  return res.json(
    new ApiResponse(200, timeline, "Timeline fetched successfully"),
  );
});
