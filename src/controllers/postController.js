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
exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort || "createdAt";

    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(limit)
      .populate("authorId", "username");

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalPosts / limit),
      posts
    });
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

// SEARCH POSTS
exports.searchPosts = async (req, res) => {
  try {
    const query = req.query.q;

    const posts = await Post.find({
      title: { $regex: query, $options: "i" }
    });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
