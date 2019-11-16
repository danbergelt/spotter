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
    .json({ success: true, count: workouts.length, data: workouts });
});

// @desc --> get current week's workouts by user id
// @route --> GET /api/auth/workouts/week
// @access --> Private

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
  let workout = await Workout.findById(req.params.id);

  if (JSON.stringify(workout.user) !== JSON.stringify(req.user._id)) {
    return next(
      new Err(
        `User ${req.user._id} is not authorized to edit this workout`,
        403
      )
    );
  }

  workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
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

  if (JSON.stringify(workout.user) !== JSON.stringify(req.user._id)) {
    return next(
      new Err(
        `User ${req.user._id} is not authorized to delete this workout`,
        403
      )
    );
  }

  await workout.remove();

  res.status(200).json({
    success: true,
    data: "Workout deleted"
  });
});
