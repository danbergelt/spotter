import express, { Router } from "express";
import {
  addWorkout,
  getWorkoutsByUserId,
  editWorkout,
  deleteWorkout,
  workoutRangeByUserId
} from "../controllers/workouts";

import { protect } from "../middleware/auth";

const router: Router = express.Router();

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

export default router;
