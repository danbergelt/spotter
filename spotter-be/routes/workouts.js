const express = require("express");
const { getWorkoutsByUserId } = require("../controllers/workouts");
const Workout = require("../models/Workout");
const advResults = require("../middleware/advresults");

const router = express.Router();

const { protect } = require("../middleware/auth");

// Routes
// router.route("/:userId").get(protect, advResults(Workout), getWorkoutsByUserId);

module.exports = router;
