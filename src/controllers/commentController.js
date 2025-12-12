const Comment = require("../models/commentModel");

// CREATE COMMENT
exports.addComment = async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(201).json({ success: true, newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET COMMENTS BY POST
exports.getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
