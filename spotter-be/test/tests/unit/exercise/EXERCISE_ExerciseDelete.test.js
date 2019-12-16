const assert = require("assert");
const chai = require("chai");
chai.use(require("chai-as-promised"));
const Exercise = require("../../../../models/Exercise");
const { dbHelper } = require("../../../utils/db");
const { createUser } = require("../../../utils/createUser");

describe("Exercise model delete", () => {
  dbHelper(Exercise);

  it("can delete a saved exercise", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({
      name: "exercise",
      pr: 100,
      prDate: Date.now(),
      user: _id
    });
    await exercise.save();
    await Exercise.findOneAndDelete({ name: "exercise" });
    const fetched = await Exercise.findOne({ name: "exercise " });
    assert(fetched === null);
  });

  it("can delete a saved exercise by id", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({
      name: "exercise",
      pr: 100,
      prDate: Date.now(),
      user: _id
    });
    await exercise.save();
    await Exercise.findByIdAndDelete(exercise._id);
    const fetched = await Exercise.findOne({ name: "exercise" });
    assert(fetched === null);
  });
});
