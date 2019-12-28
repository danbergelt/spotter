import mongoose, { Schema } from "mongoose";

const ExerciseSchema = new Schema({
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

module.exports = mongoose.model("Exercise", ExerciseSchema);
