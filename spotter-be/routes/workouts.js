const express = require("express");
const {
  addWorkout,
  getWorkoutsByUserId,
  editWorkout,
  deleteWorkout
} = require("../controllers/workouts");
const Workout = require("../models/Workout");
const advResults = require("../middleware/advresults");

const router = express.Router();

const { protect } = require("../middleware/auth");

// Routes
router
  .route("/")
  .get(advResults(Workout), protect, getWorkoutsByUserId)
  .post(protect, addWorkout);

router
  .route("/:id")
  .put(protect, editWorkout)
  .delete(protect, deleteWorkout);

module.exports = router;
