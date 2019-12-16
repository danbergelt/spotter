const express = require("express");
const {
  createExercise,
  updateExercise,
  deleteExercise,
  getExercises
} = require("../controllers/exercises");
const router = express.Router();
const { protect } = require("../middleware/auth");

// Routes

router
  .route("/")
  .post(protect, createExercise)
  .get(protect, getExercises);

router
  .route("/:id")
  .put(protect, updateExercise)
  .delete(protect, deleteExercise);

module.exports = router;
