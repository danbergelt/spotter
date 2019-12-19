const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// helper schema
const AllPrsSchema = new Schema({
  pr: Number,
  prDate: String
});

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add an exercise name"],
    maxlength: [25, "25 character max"]
  },
  pr: Number,
  prDate: String,
  allPrs: [AllPrsSchema],
  user: {
    type: Schema.ObjectId,
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
