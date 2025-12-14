const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/postController");

const auth = require("../middleware/auth");

// Public routes
router.get("/", getPosts);
router.get("/:id", getPostById);

// Protected routes
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
