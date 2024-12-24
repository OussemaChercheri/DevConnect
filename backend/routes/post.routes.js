import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getFeedPosts, createPost, deletePost, getPostById, createComment,likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", protectedRoute, getFeedPosts);
router.post("/create", protectedRoute, createPost);
router.post("/delete/:id", protectedRoute, deletePost);
router.post("/:id", protectedRoute, getPostById);
router.post("/:id/comment", protectedRoute, createComment);
router.post("/:id/like", protectedRoute, likePost);


export default router;