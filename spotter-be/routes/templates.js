const express = require("express");
const { getTemplatesByUserId } = require("../controllers/templates");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getTemplatesByUserId);

module.exports = router;
