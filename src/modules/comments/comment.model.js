import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    attachments: [
      {
        url: String,
        publicId: String,
      },
    ],

    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: Date,

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

commentSchema.index({
  incident: 1,
  createdAt: 1,
});
commentSchema.index({
  mentions: 1,
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
