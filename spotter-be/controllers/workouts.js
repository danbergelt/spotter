const Workout = require("../models/Workout");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const Err = require("../middleware/error");

// @desc --> get all workouts
// @route --> GET /api/auth/workouts
// @access --> Private

// exports.getWorkoutsByDate = asyncHandler(async (req, res, next) => {
//   const workouts = await Workout.find({ user: req.params.userId });
  
//   console.log(res.advResults)

//   return res.status(200).json(res.advResults);
// });

// @desc --> add workout
// @route --> POST /api/auth/workouts
// @access --> Private

// @desc --> edit workout
// @route --> PUT /api/auth/workouts/:workoutId
// @access --> Private

// @desc --> delete workout
// @route --> DELETE /api/auth/workouts/:workoutId
// @access --> Private
