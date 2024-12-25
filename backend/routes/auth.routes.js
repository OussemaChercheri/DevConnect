import express from "express";
import { signup, login, logout, getCurrentUser, githubLogin, githubCallback, googleLogin, googleCallback } from '../controllers/auth.controller.js';
import { protectRoute }from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute, getCurrentUser );

router.get("/github", githubLogin);
router.get("/github/callback", githubCallback); 

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

export default router;