import mongoose, { Schema, Query } from "mongoose";
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
  this: Query<ITag>,
  next: NextFunction
) {
  // get the specific document tied to the query
  const doc: ITag = await this.findOne(this.getQuery());

  // extract the content in the update
  const { content }: { content: string } = this.getUpdate();

  // open a new update query, match templates to the pre-fetched templates
  await Template.updateMany(
    { tags: { $elemMatch: { _id: doc._id } } },
    {
      // set the new content
      $set: {
        "tags.$.content": content
      }
    },
    { new: true }
  ).exec();

  // open a new update query, match the workouts to the pre-fetched workouts
  await Workout.updateMany(
    { tags: { $elemMatch: { _id: doc._id } } },
    {
      // set the new content
      $set: {
        "tags.$.content": content
      }
    },
    { new: true }
  ).exec();

  next();
});

// cascade delete tags
TagSchema.pre("remove", async function(next) {
  
  // get the id off of the removed tag
  const tagId: Schema.Types.ObjectId = this._id;

  // loop through the workouts, pull the tags from the workout
  await Workout.updateMany(
    { tags: { $elemMatch: { _id: tagId } } },
    { $pull: { tags: { _id: tagId } } },
    { new: true }
  ).exec();

  // loop through the templates, pull the tags from the template
  await Template.updateMany(
    { tags: { $elemMatch: { _id: tagId } } },
    { $pull: { tags: { _id: tagId } } },
    { new: true }
  ).exec();
  next();
});

export default mongoose.model<ITag>("Tag", TagSchema);
