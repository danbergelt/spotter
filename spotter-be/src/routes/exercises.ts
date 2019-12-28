import express from "express";
import {
  createExercise,
  updateExercise,
  deleteExercise,
  getExercises
} from "../controllers/exercises";
const router = express.Router();
import { protect } from "../middleware/auth";
import { delExerciseFromCache } from "../middleware/cache";

// Routes

router
  .route("/")
  //@ts-ignore
  .post(protect, createExercise)
  .get(protect, getExercises);

router
  .route("/:id")
  //@ts-ignore
  .put(protect, updateExercise)
  .delete(protect, delExerciseFromCache, deleteExercise);

export default router;
