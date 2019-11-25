const Workout = require("../models/Workout");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const Err = require("../utils/Err");

// @desc --> get all workouts by user id
// @route --> GET /api/auth/workouts
// @access --> Private

exports.getWorkoutsByUserId = asyncHandler(async (req, res, next) => {
  const pagination = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
  };

  const workouts = await Workout.find({ user: req.user._id })
    .skip(pagination.page * pagination.limit)
    .limit(pagination.limit);

  return res
    .status(200)
    .json({ success: true, count: workouts.length, workouts });
});

// @desc --> get time sorted list of workouts by user id
// @route --> GET /api/auth/workouts/range
// @access --> Private

exports.workoutRangeByUserId = asyncHandler(async (req, res, next) => {
  if (!req.body.range) {
    return next(new Err("Please supply a date range", 400));
  }

  const workouts = await Workout.find({
    user: req.user._id,
    date: { $in: req.body.range }
  }).sort({ date: 1 });

  return res
    .status(200)
    .json({ success: true, count: workouts.length, workouts });
});

// @desc --> add workout
// @route --> POST /api/auth/workouts
// @access --> Private

exports.addWorkout = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  const workout = await Workout.create(req.body);

  res.status(201).json({
    success: true,
    data: workout
  });
});

// @desc --> edit workout
// @route --> PUT /api/auth/workouts/:id
// @access --> Private

exports.editWorkout = asyncHandler(async (req, res, next) => {
  let workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: workout
  });
});

// @desc --> delete workout
// @route --> DELETE /api/auth/workouts/:id
// @access --> Private

exports.deleteWorkout = asyncHandler(async (req, res, next) => {
  let workout = await Workout.findById(req.params.id);

  await workout.remove();

  res.status(200).json({
    success: true,
    data: "Workout deleted"
  });
});
