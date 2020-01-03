import express, { Router } from "express";
import { changePassword, changeEmail, deleteAccount } from "../controllers/auth";
import { protect } from "../middleware/auth";

const router: Router = express.Router();

router.route("/password").put(protect, changePassword);

router.route("/email").put(protect, changeEmail)

router.route("/delete").delete(protect, deleteAccount)

export default router;
