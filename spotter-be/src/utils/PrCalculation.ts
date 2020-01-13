import { IWorkout } from "../types/models";
import Exercise from "../models/Exercise";
import Workout from "../models/Workout";

// utility function that updates a person's PRs when

export const prCalculation = async (workout: IWorkout) => {
  // aggregate a master list of every single exercise recorded for this user
  const aggregator = async (workout: IWorkout, name: string) => {
    return await Workout.aggregate([
      { $match: { user: workout.user, name } },
      { $unwind: "$exercises" },
      { $project: { exercises: 1 } }
    ]);
  };

  // loop through this workout's exercises
  for (const exercise of workout.exercises) {
    // filter the list of exercises for the current exercise name

    const exerciseInstances: Array<any> = await aggregator(
      workout,
      exercise.name
    );

    let pr;

    if (exerciseInstances.length > 1) {
      pr = exerciseInstances.sort(
        (a, b) => b.exercises.weight - a.exercises.weight
      )[0].exercises.weight;
    } else {
      pr = exerciseInstances[0].exercises.weight;
    }

    await Exercise.findOneAndUpdate(
      { user: workout.user, name: exercise.name },
      { pr: pr, prDate: exerciseInstances[0].date }
    );
  }
};
