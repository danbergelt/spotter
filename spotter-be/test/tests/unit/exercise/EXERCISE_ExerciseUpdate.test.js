const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Exercise = require("../../../../models/Exercise");
const { dbHelper } = require("../../../utils/db");
const { createUser } = require("../../../utils/createUser");

describe("Exercise model update", () => {
  dbHelper(Exercise);

  it("updates an exercise", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({
      name: "exercise",
      pr: 100,
      user: _id
    });
    await exercise.save();
    await Exercise.findByIdAndUpdate(exercise._id, { name: "newname" });
    const foo = await Exercise.findOne({ name: "newname" });
    assert(foo !== null);
  });

  it("cannot update an exercise to no name", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({
      name: "exercise",
      pr: 100,
      user: _id
    });
    await exercise.save();
    await expect(
      Exercise.findByIdAndUpdate(
        exercise._id,
        { name: undefined },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Please add an exercise name");
  });

  it("cannot update an exercise to long name", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({
      name: "exercise",
      pr: 100,
      user: _id
    });
    await exercise.save();
    await expect(
      Exercise.findByIdAndUpdate(
        exercise._id,
        {
          name:
            "fjwiofjwiofjwiofjwhbvuyvfgyehughehrguyiwfhwofjpfjpqfjpfjdncveivbeiugvwibvwicwoij"
        },
        { runValidators: true }
      )
    ).to.be.rejectedWith("40 character limit on exercise name");
  });

  it("cannot update a user to undefined", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({
      name: "exercise",
      pr: 100,
      user: _id
    });
    await exercise.save();
    await expect(
      Exercise.findByIdAndUpdate(
        exercise._id,
        {
          user: undefined
        },
        { runValidators: true }
      )
    ).to.be.rejectedWith("User validation failed");
  });
});
