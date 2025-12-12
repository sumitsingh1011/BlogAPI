const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Format timestamps in responses
commentSchema.methods.toJSON = function () {
  const comment = this.toObject();
  if (comment.createdAt) {
    comment.createdAt = comment.createdAt.toLocaleString();
  }
  if (comment.updatedAt) {
    comment.updatedAt = comment.updatedAt.toLocaleString();
  }
  return comment;
};

module.exports = mongoose.model("Comment", commentSchema);
