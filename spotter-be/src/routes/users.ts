import express, { Router } from "express";
import { register, login, logout, refresh } from "../controllers/users";

const router: Router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/refresh", refresh);

export default router;
