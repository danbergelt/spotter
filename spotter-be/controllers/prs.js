const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");
const asyncHandler = require("../middleware/async");
const { promisify } = require("util");
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

  // for each exercise, map a key/value pair into the PRs object. This will be our returned data
  exercises.forEach(exercise => {
    prs[exercise.name] = { name: exercise.name, pr: -Infinity };
  });

  // PR generation === O(NM)
  // need to explore replacements for this...although since I am traversing a matrix,
  // and need to iterate over each element. Perhaps an LRU Cache could work

  // map over every workout
  workouts.forEach(workout => {
    // map over every exercise in every workout
    workout.exercises.forEach(exercise => {
      // if the exercise is saved, and the exercise weight is greater than the current PR value
      if (prs[exercise.name] && prs[exercise.name].pr < exercise.weight) {
        // save the weight as a PR, save the date
        prs[exercise.name].pr = exercise.weight;
        prs[exercise.name].date = workout.date;
      }
    });
  });

  // cache the data
  const hset = promisify(client.hset).bind(client);

  await hset(
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
