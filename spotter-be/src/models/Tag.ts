import mongoose, { Schema, Query } from "mongoose";
import Workout from "./Workout";
import Template from "./Template";
import { NextFunction } from "connect";
import { ITag, IWorkout, ITemplate } from "src/types/models";

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

  // fidn all templates that contain the updated tag
  const templates: Array<ITemplate> = await Template.find({
    tags: { $elemMatch: { _id: doc._id } }
  });

  // loop through all of the templates
  await Promise.all(
    templates.map((t: ITemplate) =>
      // open a new update query, match templates to the pre-fetched templates
      Template.findOneAndUpdate(
        { _id: t._id, tags: { $elemMatch: { _id: doc._id } } },
        {
          // set the new content
          $set: {
            "tags.$.content": content
          }
        },
        { new: true }
      ).exec()
    )
  );

  // find all workouts that contain the updated tag
  const workouts: Array<IWorkout> = await Workout.find({
    tags: { $elemMatch: { _id: doc._id } }
  });

  // loop through all of the workouts
  await Promise.all(
    workouts.map((w: IWorkout) =>
      // open a new update query, match the workouts to the pre-fetched workouts
      Workout.findOneAndUpdate(
        { _id: w._id, tags: { $elemMatch: { _id: doc._id } } },
        {
          // set the new content
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
  // get the id off of the removed tag
  const tagId: Schema.Types.ObjectId = this._id;
  // find the workouts that contain this tag
  const workouts: Array<IWorkout> = await Workout.find({
    tags: { $elemMatch: { _id: tagId } }
  });
  // loop through the workouts, pull the tags from the workout
  await Promise.all(
    workouts.map((w: IWorkout) =>
      Workout.findOneAndUpdate(
        { _id: w._id },
        { $pull: { tags: { _id: tagId } } },
        { new: true }
      ).exec()
    )
  );

  // find all the templates that contain this tag
  const templates: Array<ITemplate> = await Template.find({
    tags: { $elemMatch: { _id: tagId } }
  });

  // loop through the templates, pull the tags from the template
  await Promise.all(
    templates.map((t: ITemplate) =>
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
