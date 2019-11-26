const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Helper Schemas

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
    required: [true, "Please add a workout title"],
    maxlength: [50, "Title cannot be longer than 50 characters"],
    trim: true
  },
  tags: [
    {
      tag: {
        required: [true, "Tag must include tag ID"],
        type: Schema.Types.ObjectId,
        ref: "Tag"
      }
    }
  ],
  notes: String,
  exercises: [ExerciseSchema],
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Workout", WorkoutSchema);
