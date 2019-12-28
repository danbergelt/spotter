import mongoose, { Schema, Document } from "mongoose";

interface IExercise extends Document {
  name: string,
  user: Schema.Types.ObjectId,
  createdAt: Date;
}

const ExerciseSchema = new Schema<IExercise>({
  name: {
    type: String,
    required: [true, "Please add an exercise name"],
    maxlength: [25, "25 character max"]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User validation failed"],
    immutable: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Exercise", ExerciseSchema);
