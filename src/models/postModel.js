const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Format timestamps in responses
postSchema.methods.toJSON = function () {
  const post = this.toObject();
  if (post.createdAt) {
    post.createdAt = post.createdAt.toLocaleString();
  }
  if (post.updatedAt) {
    post.updatedAt = post.updatedAt.toLocaleString();
  }
  return post;
};

module.exports = mongoose.model("Post", postSchema);
