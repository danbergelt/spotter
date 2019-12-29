import express, { Router } from "express";
import {
  createExercise,
  updateExercise,
  deleteExercise,
  getExercises
} from "../controllers/exercises";
import { protect } from "../middleware/auth";
import { delExerciseFromCache } from "../middleware/cache";

const router: Router = express.Router();

// Routes
router
  .route("/")
  .post(protect, createExercise)
  .get(protect, getExercises);

router
  .route("/:id")
  .put(protect, updateExercise)
  .delete(protect, delExerciseFromCache, deleteExercise);

export default router;
