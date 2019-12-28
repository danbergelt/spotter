import mongoose, { Schema } from "mongoose";
import Workout from "./Workout";
import Template from "./Template";
import { NextFunction } from "connect";
import { ITag } from "src/types/models";

const TagSchema = new Schema<ITag>({
  color: {
    type: String,
    required: [true, "Please add a tag color"]
  },
  content: {
    type: String,
    maxlength: [20, "20 character max"]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
    immutable: true
  }
});

// cascade update tags
TagSchema.pre("findOneAndUpdate", async function(
  this: any,
  next: NextFunction
) {
  // getting model to update, and getting update content

  const mod = await this.model.findOne(this.getQuery());
  const { content } = this._update;

  const templates = await Template.find({ "tags._id": mod._id });
  await Promise.all(
    templates.map((t: mongoose.Document) =>
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
    workouts.map((w: mongoose.Document) =>
      Workout.findOneAndUpdate(
        { _id: w._id, tags: { $elemMatch: { _id: mod._id } } },
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

// cascade delete tags
TagSchema.pre("remove", async function(next) {
  const tagId = this._id;
  const workouts = await Workout.find({ "tags._id": tagId });
  await Promise.all(
    workouts.map((w: mongoose.Document) =>
      Workout.findOneAndUpdate(
        { _id: w._id },
        { $pull: { tags: { _id: tagId } } },
        { new: true }
      ).exec()
    )
  );
  const templates = await Template.find({ "tags._id": tagId });
  await Promise.all(
    templates.map((t: mongoose.Document) =>
      Template.findOneAndUpdate(
        { _id: t._id },
        { $pull: { tags: { _id: tagId } } },
        { new: true }
      ).exec()
    )
  );
  next();
});

export default mongoose.model<ITag>("Tag", TagSchema);
