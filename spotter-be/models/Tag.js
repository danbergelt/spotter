const mongoose = require("mongoose");
const Workout = require("./Workout");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  color: {
    type: String,
    required: [true, "Please add a tag color"]
  },
  content: {
    type: String,
    maxlength: [20, "20 character max"]
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  }
});

// Cascade remove tags from workouts when tag is deleted
TagSchema.pre("remove", async function(next) {
  const tagId = this._id;
  const workouts = await Workout.find({ "tags.tag": tagId });
  Promise.all(
    workouts.map(w =>
      Workout.findOneAndUpdate(
        { _id: w._id },
        { $pull: { "tags": { tag: tagId } } },
        { new: true }
      ).exec()
    )
  );
  next();
});

module.exports = mongoose.model("Tag", TagSchema);
