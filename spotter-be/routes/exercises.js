const express = require("express");
const {
  createExercise,
  updateExercise,
  deleteExercise,
  getExercises
} = require("../controllers/exercises");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { delExerciseFromCache } = require("../middleware/cache");

// Routes

router
  .route("/")
  .post(protect, createExercise)
  .get(protect, getExercises);

router
  .route("/:id")
  .put(protect, updateExercise)
  .delete(protect, delExerciseFromCache, deleteExercise);

module.exports = router;
