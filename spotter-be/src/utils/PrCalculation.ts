import { ExerciseOnWorkoutSchema } from "../types/models";
import Exercise from "../models/Exercise";
import Workout from "../models/Workout";
import { Schema } from "mongoose";

// helper functions that allow the application to programmatically set PRs
// used when a user updates/deletes/creates a workout or exercise

// pass in an exercise name
// find all workouts that contain this exercise
// unwind it into an object, select the date + exercise details, and sort it
// then return a filtered array of only the specified exercise
interface IAggregated {
  _id: Schema.Types.ObjectId;
  date: string;
  exercises: ExerciseOnWorkoutSchema;
}

type TAggregator = (
  user: Schema.Types.ObjectId,
  name: string
) => Promise<Array<IAggregated>>;

const aggregator: TAggregator = async (user, name) => {
  const aggregated: Array<IAggregated> = await Workout.aggregate([
    {
      $match: { $and: [{ user: user }, { "exercises.name": name }] }
    },
    { $unwind: "$exercises" },
    { $project: { exercises: 1, date: 1 } },
    { $sort: { "exercises.weight": -1 } }
  ]);
  return aggregated.filter(agg => agg.exercises.name === name);
};

/*
  aggregate the PRs for each exercise, and update that exercise's PR and and prDate
*/

type TSetPr = (
  workout: Schema.Types.ObjectId,
  exercise: string
) => Promise<void>;

const setPr: TSetPr = async (user, exercise) => {
  const pr: Array<IAggregated> = await aggregator(user, exercise);
  await Exercise.findOneAndUpdate(
    { user: user, name: exercise },
    {
      pr: pr.length ? pr[0].exercises.weight : 0,
      prDate: pr.length ? pr[0].date : undefined
    },
    { runValidators: true }
  );
};

/* 
  Loop through the passed in data, and set the PR for each exercise within that data
  Passed-in data could be an exercise model, or a workout with an array of exercises nested inside it
*/

type TPrCalculation = (data: any) => Promise<void>;

export const prCalculation: TPrCalculation = async data => {
  if (data.exercises) {
    // loop through this workout's exercises
    for (const exercise of data.exercises) {
      // return an aggregated list of completed exercises (with the PR at index 0)
      await setPr(data.user, exercise.name);
    }
  } else {
    await setPr(data.user, data.name);
  }
};
