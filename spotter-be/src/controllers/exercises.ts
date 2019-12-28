import { Response, NextFunction } from "express";

const Err = require("../utils/Err");
const Exercise = require("../models/Exercise");
const asyncHandler = require("../middleware/async");
const { promisify } = require("util");
const redis = require("redis"),
  client = redis.createClient();

interface Req extends Request {
  user: { _id: string };
}

// @desc --> create exercise
// @route --> POST /api/auth/exercises
// @access --> Private

exports.createExercise = asyncHandler(async (req: Req, res: Response, next: NextFunction) => {
  (req as any).body.user = req.user._id;

  const exercise = await Exercise.find({
    name: (req as any).body.name,
    user: req.user._id
  });

  if (exercise.length) {
    return next(new Err("Exercise already exists", 400));
  }

  const createdExercise = await Exercise.create(req.body);

  const hset = promisify(client.hset).bind(client);

  await hset(req.user._id.toString(), "stale", "true");

  res.status(201).json({
    success: true,
    exercise: createdExercise
  });
});

// @desc --> update exercise
// @route --> PUT /api/auth/exercises/:id
// @access --> Private

exports.updateExercise = asyncHandler(async (req: Req, res: Response, _: NextFunction) => {
  const exercise = await Exercise.findByIdAndUpdate((req as any).params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    success: true,
    exercise
  });
});

// @desc --> delete exercise
// @route --> DELETE /api/auth/exercises/:id
// @access --> Private

exports.deleteExercise = asyncHandler(async (req: Req, res: Response, _: NextFunction) => {
  await Exercise.findByIdAndDelete((req as any).params.id);

  res.status(200).json({
    success: true,
    data: "Exercise deleted"
  });
});

// @desc --> fetch exercises
// @route --> GET /api/auth/exercises
// @access --> Private

exports.getExercises = asyncHandler(async (req: Req, res: Response, _: NextFunction) => {
  const exercises = await Exercise.find({ user: req.user._id });

  return res.status(200).json({
    success: true,
    count: exercises.length,
    exercises
  });
});
