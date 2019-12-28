const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Helper Schemas

interface IHelper {
  name: string;
  weight: number;
  sets: number;
  reps: number;
}

const ExerciseSchema: IHelper = new Schema({
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

interface ITemplate {
  name: string;
  createdAt: Date;
  title: string;
  tags: Array<{ content: string; color: string }>;
  notes: String;
  exercises: IHelper;
  user: typeof Schema.ObjectId;
}

const TemplateSchema: ITemplate = new Schema({
  name: {
    type: String,
    required: [true, "Give your template a name"],
    trim: true,
    maxlength: [20, "20 character max"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
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

export default mongoose.model("Template", TemplateSchema);
