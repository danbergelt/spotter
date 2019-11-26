const express = require("express");
const { register, login, logout, refresh } = require("../controllers/users");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh", refresh)

module.exports = router;
