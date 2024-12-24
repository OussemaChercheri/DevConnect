import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections, getPublicProfile, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions", protectedRoute, getSuggestedConnections);
router.get("/:username", protectedRoute, getPublicProfile);

router.put("/profile", protectedRoute, updateProfile);


export default router;