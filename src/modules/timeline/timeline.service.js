import Timeline from "./timeline.model.js";

export const createTimelineEvent = async ({
  incidentId,
  actor,
  action,
  previousValue = null,
  newValue = null,
  metadata = {},
}) => {
  return Timeline.create({
    incident: incidentId,
    actor,
    action,
    previousValue,
    newValue,
    metadata,
  });
};
