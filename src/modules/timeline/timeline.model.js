import mongoose from "mongoose";

const actionEnum = [
  "INCIDENT_CREATED",
  "STATUS_CHANGED",
  "SEVERITY_CHANGED",
  "TEAM_ASSIGNED",
  "ASSIGNEE_CHANGED",
  "INCIDENT_UPDATED",
  "INCIDENT_ARCHIVED",
  "INCIDENT_RESTORED",
  "INCIDENT_DELETED",
  "COMMENT_ADDED",
  "COMMENT_UPDATED",
  "COMMENT_DELETED",
];

const timelineSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
    },

    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      enum: actionEnum,
      required: true,
    },

    previousValue: {
      type: mongoose.Schema.Types.Mixed,
    },

    newValue: {
      type: mongoose.Schema.Types.Mixed,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

timelineSchema.index({
  incident: 1,
  createdAt: 1,
});

timelineSchema.index({
  actor: 1,
});

const Timeline = mongoose.model("Timeline", timelineSchema);

export default Timeline;
