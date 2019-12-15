const express = require("express");
const { changePassword } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/password").put(protect, changePassword);

module.exports = router;
