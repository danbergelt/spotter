import express from "express";
import {
  addWorkout,
  getWorkoutsByUserId,
  editWorkout,
  deleteWorkout,
  workoutRangeByUserId
} from "../controllers/workouts";

const router = express.Router();

import { protect } from "../middleware/auth";

// Routes
router
  .route("/")
  //@ts-ignore
  .get(protect, getWorkoutsByUserId)
  .post(protect, addWorkout);

router
  .route("/:id")
  //@ts-ignore
  .put(protect, editWorkout)
  .delete(protect, deleteWorkout);

  //@ts-ignore
router.route("/range").post(protect, workoutRangeByUserId);

export default router;
