import Err from "../utils/Err";
import Exercise from "../models/Exercise";
import asyncHandler from "../middleware/async";
import { promisify } from "util";
import redis from "redis";
import { IExercise } from "src/types/models";

const client: redis.RedisClient = redis.createClient();

// @desc --> create exercise
// @route --> POST /api/auth/exercises
// @access --> Private

export const createExercise = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  const exercise: Array<IExercise> = await Exercise.find({
    name: req.body.name,
    user: req.user._id
  });

  if (exercise.length) {
    return next(new Err("Exercise already exists", 400));
  }

  const createdExercise: IExercise = await Exercise.create(req.body);

  const hset: Function = promisify(client.hset).bind(client);

  await hset(req.user._id.toString(), "stale", "true");

  res.status(201).json({
    success: true,
    exercise: createdExercise
  });
});

// @desc --> update exercise
// @route --> PUT /api/auth/exercises/:id
// @access --> Private

export const updateExercise = asyncHandler(async (req, res) => {
  const exercise: IExercise | null = await Exercise.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(201).json({
    success: true,
    exercise
  });
});

// @desc --> delete exercise
// @route --> DELETE /api/auth/exercises/:id
// @access --> Private

export const deleteExercise = asyncHandler(async (req, res) => {
  await Exercise.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: "Exercise deleted"
  });
});

// @desc --> fetch exercises
// @route --> GET /api/auth/exercises
// @access --> Private

export const getExercises = asyncHandler(async (req, res) => {

  const exercises: Array<IExercise> = await Exercise.find({
    user: req.user._id
  });

  return res.status(200).json({
    success: true,
    count: exercises.length,
    exercises
  });
});
