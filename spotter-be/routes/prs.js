const express = require("express");

const { generatePrs } = require("../controllers/prs");

const router = express.Router();

const { protect } = require("../middleware/auth");
const { prCache } = require("../middleware/cache");

// Routes
router.route("/").get(protect, prCache, generatePrs);

module.exports = router;
