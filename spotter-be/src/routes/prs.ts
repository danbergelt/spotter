import express, { Router } from "express";
import { generatePrs } from "../controllers/prs";
import { protect } from "../middleware/auth";
import { prCache } from "../middleware/cache";

const router: Router = express.Router();

// Routes
router.route("/").get(protect, prCache, generatePrs);

export default router;
