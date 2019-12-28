import { Document, Schema } from "mongoose";

export interface IExercise extends Document {
  name: string,
  user: Schema.Types.ObjectId,
  createdAt: Date;
}

// helper schema for the workout interface
export interface ExerciseOnWorkoutSchema {
  name: string;
  weight: number;
  sets: number;
  reps: number
}

export interface IWorkout extends Document {
  date: string;
  createdAt?: Date;
  title: string;
  tags: Array<{content: string, color: string}>;
  notes: string;
  exercises: Array<ExerciseOnWorkoutSchema>;
  user: typeof Schema.Types.ObjectId;
}