import { IWorkout } from "../types/models";
import Exercise from "../models/Exercise";
import Workout from "../models/Workout";

// pass in an exercise name
// find all instances of that exercise for this user
// unwind it into an object, select the date + exercise details, and sort it
const aggregator = async (workout: IWorkout, name: string) => {
  return await Workout.aggregate([
    {
      $match: { $and: [{ user: workout.user }, { "exercises.name": name }] }
    },
    { $unwind: "$exercises" },
    { $project: { exercises: 1, date: 1 } },
    { $sort: { "exercises.weight": -1 } }
  ]);
};

// utility function that updates a person's PRs
export const prCalculation = async (workout: IWorkout) => {
  // loop through this workout's exercises
  for (const exercise of workout.exercises) {
    // return an aggregated list of completed exercises (with the PR at index 0)
    const pr = await aggregator(workout, exercise.name);
    await Exercise.findOneAndUpdate(
      { user: workout.user, name: exercise.name },
      {
        pr: pr.length ? pr[0].exercises.weight : 0,
        prDate: pr.length ? pr[0].date : undefined
      },
      { runValidators: true, new: true }
    );
  }
};
