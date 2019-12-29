import express, { Router } from "express";
import { changePassword } from "../controllers/auth";
import { protect } from "../middleware/auth";

const router: Router = express.Router();

router.route("/password").put(protect, changePassword);

export default router;
