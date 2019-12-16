const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add an exercise name"],
    maxlength: [40, "40 character limit on exercise name"]
  },
  pr: Number,
  prDate: Date,
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "User validation failed"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
