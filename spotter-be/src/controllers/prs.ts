import Workout from "../models/Workout";
import Exercise from "../models/Exercise";
import asyncHandler from "../middleware/async";
import { promisify } from "util";
import redis from "redis";
import { IExercise, ExerciseOnWorkoutSchema, IWorkout } from "../types/models";
import { IPr } from "../types/cache";

const client: redis.RedisClient = redis.createClient();

// @desc --> generate PRs
// @route --> GET /api/auth/prs
// @access --> Private

// if the cache is stale, generate PRs
export const generatePrs = asyncHandler(async (req, res) => {
  // find all workouts by this user, and select the date and exercises fields
  const workouts: Array<IWorkout> = await Workout.find({
    user: req.user._id
  }).select("exercises date");

  // find all saved exercises
  const exercises: Array<IExercise> = await Exercise.find({
    user: req.user._id
  });

  let prs: IPr = {};

  // for each exercise, map a key/value pair into the PRs object. This will be our returned data
  exercises.forEach((exercise: IExercise) => {
    prs[exercise.name] = { name: exercise.name, pr: -Infinity };
  });

  // PR generation === O(NM)
  // need to explore replacements for this...Perhaps an LRU Cache could work

  // map over every workout
  workouts.forEach(workout => {
    // map over every exercise in every workout
    workout.exercises.forEach((exercise: ExerciseOnWorkoutSchema) => {
      // if the exercise is saved, and the exercise weight is greater than the current PR value
      if (prs[exercise.name] && prs[exercise.name].pr < exercise.weight) {
        // save the weight as a PR, save the date
        prs[exercise.name].pr = exercise.weight;
        prs[exercise.name].date = workout.date;
      }
    });
  });

  // edge case - if pr previously existed from one workout, and that workout is deleted, filter that exercise from the prs
  for (let emptyPr in prs) {
    if (prs[emptyPr].pr === -Infinity) {
      delete prs[emptyPr];
    }
  }

  // cache the data
  const hset: Function = promisify(client.hset).bind(client);

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
