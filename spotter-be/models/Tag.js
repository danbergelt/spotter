const mongoose = require("mongoose");
const Workout = require("./Workout");
const Template = require("./Template");
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

TagSchema.pre("findOneAndUpdate", async function(next) {
  const mod = await this.model.findOne(this.getQuery());
  const { content } = this._update;
  const templates = await Template.find({ "tags._id": mod._id });
  await Promise.all(
    templates.map(t =>
      Template.findOneAndUpdate(
        { _id: t._id, tags: { $elemMatch: { _id: mod._id } } },
        {
          $set: {
            "tags.$.content": content
          }
        },
        { new: true }
      ).exec()
    )
  );
  const workouts = await Workout.find({ "tags._id": mod._id });
  await Promise.all(
    workouts.map(t =>
      Workout.findOneAndUpdate(
        { _id: t._id, tags: { $elemMatch: { _id: mod._id } } },
        {
          $set: {
            "tags.$.content": content
          }
        },
        { new: true }
      ).exec()
    )
  );
  next();
});

// Cascade remove tags from workouts when tag is deleted
TagSchema.pre("remove", async function(next) {
  const tagId = this._id;
  const workouts = await Workout.find({ "tags._id": tagId });
  await Promise.all(
    workouts.map(w =>
      Workout.findOneAndUpdate(
        { _id: w._id },
        { $pull: { tags: { _id: tagId } } },
        { new: true }
      ).exec()
    )
  );
  const templates = await Template.find({ "tags._id": tagId });
  await Promise.all(
    templates.map(t =>
      Template.findOneAndUpdate(
        { _id: t._id },
        { $pull: { tags: { _id: tagId } } },
        { new: true }
      ).exec()
    )
  );
  next();
});

module.exports = mongoose.model("Tag", TagSchema);
