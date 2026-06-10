import mongoose from "mongoose";

const severityEnum = ["Low", "Medium", "High", "Critical"];

const statusEnum = [
  "Open",
  "Investigating",
  "Identified",
  "Monitoring",
  "Resolved",
];

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: severityEnum,
      default: "Low",
    },

    status: {
      type: String,
      enum: statusEnum,
      default: "Open",
    },

    serviceAffected: {
      type: String,
      required: true,
    },

    assignedTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    tags: [
      {
        type: String,
      },
    ],

    attachments: [
      {
        url: String,
        publicId: String,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resolvedAt: Date,
  },
  {
    timestamps: true,
  },
);

incidentSchema.index({
  title: "text",
  description: "text",
});

incidentSchema.index({
  severity: 1,
});

incidentSchema.index({
  status: 1,
});

incidentSchema.index({
  assignedTeam: 1,
});

incidentSchema.index({
  createdAt: -1,
});

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;
