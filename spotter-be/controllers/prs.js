const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");
const asyncHandler = require("../middleware/async");
const redis = require("redis"),
  client = redis.createClient();

// @desc --> generate PRs
// @route --> GET /api/auth/prs
// @access --> Private

// if the cache is stale, generate PRs
exports.generatePrs = asyncHandler(async (req, res, next) => {
  // find all workouts by this user, and select the date and exercises fields
  const workouts = await Workout.find({ user: req.user._id }).select(
    "exercises date"
  );

  // find all saved exercises
  const exercises = await Exercise.find({ user: req.user._id });

  let prs = {};

  // for each exercise, map a key/value into the PRs object. This will be our returned data
  exercises.forEach(exercise => {
    prs[exercise.name] = { name: exercise.name };
  });

  // PR generation === O(NM)
  // need to explore replacements for this...although since I am traversing a matrix,
  // and need to iterate over each element. Perhaps an LRU Cache could work

  // instantiate an initial value for PR comparison
  let pr = -Infinity;

  // map over every workout
  workouts.forEach(workout => {
    // map over every exercise in every workout
    workout.exercises.forEach(exercise => {
      // if the exercise is saved, and the exercise weight is greater than the current PR value
      if (prs[exercise.name] && pr < exercise.weight) {
        pr = exercise.weight;
        // save the weight as a PR, save the date
        prs[exercise.name].pr = exercise.weight;
        prs[exercise.name].date = workout.date;
      }
    });
  });

  // cache the data
  await client.hset(
    req.user._id.toString(),
    "stale",
    "false",
    "prs",
    JSON.stringify(prs)
  );

  // return the PRs to the client
  res.status(200).json({
    success: true,
    prs
  });
});
