const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Helper Schemas
const TagSchema = new Schema({
  color: {
    type: String,
    required: [true, "Please add a tag color"]
  },
  content: {
    type: String,
    maxlength: [20, "Tag content cannot be longer than 20 characters"]
  }
});

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add an exercise name"],
    maxlength: [40, "Exercise name cannot be longer than 40 characters"]
  },
  weight: {
    type: Number,
    max: [2000, "2000 lb limit"]
  },
  sets: {
    type: Number,
    max: [2000, "2000 lb limit"]
  },
  reps: {
    type: Number,
    max: [2000, "2000 lb limit"]
  }
});

// Workout schema
const WorkoutSchema = new Schema({
  date: {
    type: String,
    required: [true, "Please add a date for this workout"],
    match: [/[A-Z][a-z]{2} \d{2}$/, "Please add a valid date (Mmm DD)"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: [true, "Please add a workout title"],
    maxlength: [50, "Title cannot be longer than 50 characters"],
    trim: true
  },
  tags: {
    type: [TagSchema]
  },
  notes: String,
  exercises: [ExerciseSchema]
});

module.exports = mongoose.model("Workout", WorkoutSchema);
