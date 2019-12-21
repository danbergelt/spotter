const Workout = require("../models/Workout");
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const asyncHandler = require("../middleware/async");
const Err = require("../utils/Err");
const redis = require("redis"),
  client = redis.createClient();

// @desc --> generate PRs
// @route --> GET /api/auth/prs
// @access --> Private

exports.generatePrs = asyncHandler(async (req, res, next) => {
  const workouts = await Workout.find({ user: req.user._id }).select(
    "exercises date"
  );

  const exercises = await Exercise.find({ user: req.user._id });

  let prs = {};

  exercises.forEach(exercise => {
    prs[exercise.name] = { name: exercise.name };
  });

  // O(NM)
  // need to explore replacements for this...although since I am traversing a matrix,
  // and need to iterate over each element, not sure what other options I have
  workouts.forEach(workout =>
    workout.exercises.forEach(exercise => {
      let pr = -Infinity;
      if (prs[exercise.name] && pr < exercise.weight) {
        prs[exercise.name].pr = exercise.weight;
        prs[exercise.name].date = workout.date;
        prs["stale"] = false;
      }
    })
  );

  await client.hset(
    req.user._id.toString(),
    "stale",
    "false",
    "prs",
    JSON.stringify(prs)
  );

  res.status(200).json({
    success: true,
    prs
  });
});
