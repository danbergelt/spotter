import Workout from "../models/Workout";
import Exercise from "../models/Exercise";
import asyncHandler from "../middleware/async";
import { promisify } from "util";
import * as redis from "redis";
import { IExercise, ExerciseOnWorkoutSchema } from '../types/models';
const client = redis.createClient();

// @desc --> generate PRs
// @route --> GET /api/auth/prs
// @access --> Private

// if the cache is stale, generate PRs
export const generatePrs = asyncHandler(async (req, res) => {

  // find all workouts by this user, and select the date and exercises fields
  const workouts: Array<any> = await Workout.find({ user: req.user._id }).select(
    "exercises date"
  );

  // find all saved exercises
  const exercises: Array<any> = await Exercise.find({ user: req.user._id });

  let prs: any = {};

  // for each exercise, map a key/value pair into the PRs object. This will be our returned data
  exercises.forEach((exercise: IExercise) => {
    prs[exercise.name!] = { name: exercise.name, pr: -Infinity };
  });

  // PR generation === O(NM)
  // need to explore replacements for this...although since I am traversing a matrix,
  // and need to iterate over each element. Perhaps an LRU Cache could work

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
