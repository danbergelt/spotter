import express, { Router } from "express";
import { generatePrs } from "../controllers/prs";
import { protect } from "../middleware/auth";

const router: Router = express.Router();

// Routes
router.route("/").get(protect, generatePrs);

export default router;
