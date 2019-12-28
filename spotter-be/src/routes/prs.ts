import express from "express";
import { generatePrs } from "../controllers/prs";
const router = express.Router();
import { protect } from "../middleware/auth";
import { prCache } from "../middleware/cache";

// Routes
//@ts-ignore
router.route("/").get(protect, prCache, generatePrs);

export default router;
