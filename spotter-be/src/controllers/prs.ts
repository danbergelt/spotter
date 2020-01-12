import { Types } from "mongoose";
import Workout from "../models/Workout";
import Exercise from "../models/Exercise";
import asyncHandler from "../middleware/async";
import { IPr } from "../types/cache";
import { IExercise } from "../types/models";

// @desc --> generate PRs
// @route --> GET /api/auth/prs
// @access --> Private

export const generatePrs = asyncHandler(async (req, res) => {
  // find all saved exercises and map an array of names
  const exerciseDocs: Array<IExercise> = await Exercise.find({
    user: Types.ObjectId(req.user._id)
  });
  const exercises = exerciseDocs.map(exercise => exercise.name);

  // aggregate all saved workouts which have exercises that're in the array of saved exercises
  const workouts: Array<any> = await Workout.aggregate([
    { $project: { exercises: 1, date: 1, user: 1 } },
    { $unwind: "$exercises" },
    {
      $match: {
        $and: [
          { user: Types.ObjectId(req.user._id) },
          { "exercises.name": { $in: exercises } }
        ]
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
    // if the exercise is saved, and the exercise weight is greater than the current PR value...
    if (prs[workout.exercises.name]?.pr < workout.exercises.weight) {
      // ...save the weight as a PR, save the date
      prs[workout.exercises.name].pr = workout.exercises.weight;
      prs[workout.exercises.name].date = workout.date;
    }
  });

  // handle dangling PRs, tidy response object
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
