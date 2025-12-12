const Post = require("../models/postModel");

// CREATE POST
exports.createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json({ success: true, post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ALL POSTS
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE POST
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json({ success: true, post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({ success: true, updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE POST
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
