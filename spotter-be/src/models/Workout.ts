const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Helper Schemas

interface HelperSchema {
  name: string;
  weight: number;
  sets: number;
  reps: number
}

const ExerciseSchema: HelperSchema = new Schema({
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

interface MainSchema {
  date: string;
  createdAt?: Date;
  title: string;
  tags: Array<{content: string, color: string}>;
  notes: string;
  exercises: HelperSchema;
  user: typeof Schema.ObjectId;
}

const WorkoutSchema: MainSchema = new Schema({
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

export default mongoose.model("Workout", WorkoutSchema);
