import express from "express";
import { register, login, logout, refresh } from "../controllers/users";

const router = express.Router();

// @ts-ignore
router.post("/register", register);
// @ts-ignore
router.post("/login", login);
// @ts-ignore
router.get("/logout", logout);
// @ts-ignore
router.get("/refresh", refresh);

export default router;
