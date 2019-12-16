const Err = require("../utils/Err");
const Exercise = require("../models/Exercise");
const asyncHandler = require("../middleware/async");

// @desc --> create exercise
// @route --> POST /api/auth/exercises
// @access --> Private

exports.createExercise = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  const exercise = await Exercise.find({
    name: req.body.name,
    user: req.user._id
  });

  if (exercise.length) {
    return next(new Err("Exercise already exists", 400));
  }

  const createdExercise = await Exercise.create(req.body);

  res.status(201).json({
    success: true,
    data: createdExercise
  });
});

// @desc --> update exercise
// @route --> PUT /api/auth/exercises/:id
// @access --> Private

exports.updateExercise = asyncHandler(async (req, res, next) => {
  const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    success: true,
    data: exercise
  });
});

// @desc --> delete exercise
// @route --> DELETE /api/auth/exercises/:id
// @access --> Private

exports.deleteExercise = asyncHandler(async (req, res, next) => {
  await Exercise.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: "Exercise deleted"
  });
});

// @desc --> fetch exercises
// @route --> GET /api/auth/exercises
// @access --> Private

exports.getExercises = asyncHandler(async (req, res, next) => {
  const exercises = await Exercise.find({ user: req.user._id });

  return res.status(200).json({
    success: true,
    count: exercises.length,
    exercises
  });
});
