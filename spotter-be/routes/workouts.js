const express = require("express");
const {
  addWorkout,
  getWorkoutsByUserId,
  editWorkout,
  deleteWorkout,
  workoutRangeByUserId
} = require("../controllers/workouts");

const router = express.Router();

const { protect } = require("../middleware/auth");

// Routes
router
  .route("/")
  .get(protect, getWorkoutsByUserId)
  .post(protect, addWorkout);

router
  .route("/:id")
  .put(protect, editWorkout)
  .delete(protect, deleteWorkout);

router.route("/range").post(protect, workoutRangeByUserId);

module.exports = router;
