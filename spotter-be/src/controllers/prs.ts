import Workout from "../models/Workout";
import Exercise from "../models/Exercise";
import asyncHandler from "../middleware/async";
import { IPr } from "../types/cache";

// @desc --> generate PRs
// @route --> GET /api/auth/prs
// @access --> Private

export const generatePrs = asyncHandler(async (req, res) => {
  // find all saved exercises and aggregate by name
  let exercises: Array<string> = [];
  await Exercise.find(
    {
      user: req.user._id
    },
    (_, res) => res.map(exercise => exercises.push(exercise.name))
  );

  // find all saved workouts which have an exercises that's in the aggregated array of saved exercises
  const workouts: Array<any> = await Workout.aggregate([
    { $project: { exercises: 1, date: 1, user: 1 } },
    { $unwind: "$exercises" },
    {
      $match: {
        $and: [{ user: req.user._id }, { "exercises.name": { $in: exercises } }]
      }
    }
  ]);

  // instantiate a temporary cache
  let prs: IPr = {};

  // for each exercise, map a key/value pair into the PRs object. This will be our returned data
  exercises.forEach((exercise: string) => {
    prs[exercise] = { name: exercise, pr: -Infinity };
  });

  // iterate over each unwound exercise
  workouts.forEach(workout => {
    // map over every exercise in every workout
    // if the exercise is saved, and the exercise weight is greater than the current PR value
    if (
      prs[workout.exercises.name] &&
      prs[workout.exercises.name].pr < workout.exercises.weight
    ) {
      // save the weight as a PR, save the date
      prs[workout.exercises.name].pr = workout.exercises.weight;
      prs[workout.exercises.name].date = workout.date;
    }
  });

  // handle edge case, tidy response object
  type TPR = { name: string; pr: number; date?: string };
  let formattedPrs: Array<TPR> = [];
  for (let item in prs) {
    if (prs[item].pr === -Infinity) {
      delete prs[item];
    } else {
      formattedPrs.push(prs[item]);
    }
  }

  // return the PRs to the client
  res.status(200).json({
    success: true,
    prs: formattedPrs
  });
});
