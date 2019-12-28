import express from "express";
import { changePassword } from "../controllers/auth";
import { protect } from "../middleware/auth";

const router = express.Router();

//@ts-ignore
router.route("/password").put(protect, changePassword);

export default router;
