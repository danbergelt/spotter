const assert = require("assert");
const chai = require("chai");
chai.use(require("chai-as-promised"));
const Exercise = require("../../../../models/Exercise");
const { dbHelper } = require("../../../utils/db");
const { createUser } = require("../../../utils/createUser");

describe("Exercise model read", () => {
  dbHelper(Exercise);

  it("can read a saved exercise", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({
      name: "exercise",
      pr: 100,
      user: _id
    });
    await exercise.save();
    const fetched = await Exercise.findById(exercise._id);
    assert(fetched.name === "exercise");
  });

  it("cannot fetch exercise", async () => {
    const fetched = await Exercise.findOne({ name: "huh?" });
    assert(fetched === null);
  });
});
