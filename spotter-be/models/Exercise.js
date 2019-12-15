const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add an exercise name"],
    maxlength: [40, "Exercise name cannot be longer than 40 characters"]
  },
  pr: Number,
  prDate: Date,
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
