const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Helper Schemas

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add an exercise name"],
    maxlength: [25, "25 character max"]
  },
  weight: {
    type: Number,
    max: [2000, "2000 lb limit"]
  },
  sets: {
    type: Number,
    max: [2000, "2000 sets limit"]
  },
  reps: {
    type: Number,
    max: [2000, "2000 reps limit"]
  }
});

// Workout schema
const WorkoutSchema = new Schema({
  date: {
    type: String,
    required: [true, "Please add a date for this workout"],
    match: [
      /[A-Z][a-z]{2} \d{2} \d{4}$/,
      "Please add a valid date (Mmm DD YYYY)"
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: [25, "Title cannot be longer than 25 characters"],
    trim: true
  },
  tags: [
    {
      content: String,
      color: String
    }
  ],
  notes: String,
  exercises: [ExerciseSchema],
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
    immutable: true
  }
});

module.exports = mongoose.model("Workout", WorkoutSchema);
