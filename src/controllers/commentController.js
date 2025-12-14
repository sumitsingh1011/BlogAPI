const Comment = require("../models/commentModel");

// CREATE COMMENT
exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const author = req.user.id; // Get author from authenticated user

    const newComment = await Comment.create({
      postId,
      content,
      author,
    });

    res.status(201).json({ success: true, newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS BY POST
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("author", "username email") // Populate author details
      .sort({ createdAt: 1 }); // Sort by creation time (oldest first)

    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the authenticated user is the author of the comment
    if (comment.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE COMMENT
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the authenticated user is the author of the comment
    if (comment.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this comment" });
    }

    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );

    res.json({ success: true, updatedComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
