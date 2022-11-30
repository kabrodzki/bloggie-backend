const PostModel = require("../models/post.model");
const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/post.controller");

router.get("/api/post", getPosts);

router.get("/api/post/:id", getPost);

router.post("/api/post", createPost);

router.delete("/api/post/:id", deletePost);

router.put("/api/post/:id", updatePost);

module.exports = router;
