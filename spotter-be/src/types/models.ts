import { Document, Schema } from "mongoose";

export interface IExercise extends Document {
  name: string;
  user: Schema.Types.ObjectId;
  createdAt: Date;
}

// helper schema for the workout interface
export interface ExerciseOnWorkoutSchema {
  name: string;
  weight: number;
  sets: number;
  reps: number;
}

export interface IWorkout extends Document {
  date: string;
  createdAt?: Date;
  title: string;
  tags: Array<{ content: string; color: string }>;
  notes: string;
  exercises: Array<ExerciseOnWorkoutSchema>;
  user: typeof Schema.Types.ObjectId;
}

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  created: Date;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: number | undefined;
  getToken(): string;
  matchPassword(id: string): Promise<boolean>;
  getResetPasswordToken(): any
}

export interface ITag extends Document {
  color: string;
  content: string;
  user: Schema.Types.ObjectId;
}

export interface ExerciseOnTemplateSchema {
  name: string;
  weight: number;
  sets: number;
  reps: number;
}

export interface ITemplate extends Document {
  name: string;
  createdAt: Date;
  title: string;
  tags: Array<{ content: string; color: string }>;
  notes: String;
  exercises: Array<ExerciseOnTemplateSchema>;
  user: typeof Schema.Types.ObjectId;
}
