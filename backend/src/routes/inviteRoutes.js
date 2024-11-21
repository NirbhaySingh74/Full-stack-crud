import express from "express";
import { inviteUser } from "../controllers/useController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/users/invite", authenticate, inviteUser);

export default router;
