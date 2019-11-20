const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Workout = require("../../../models/Workout");
const User = require("../../../models/User");
const { dbHelper } = require("../../utils/db");
const { createUser } = require("../../utils/createUser");
const { template } = require("../../utils/templateWorkout");

describe("Testing workout model deletion", () => {
  dbHelper(Workout);

  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
  });
  
  it("removes a workout successfully", async () => {
    const workout = new Workout(template);
    await workout.save();
    await Workout.findOneAndDelete({ date: "Jan 01" });
    const del = await Workout.findOne({ date: "Jan 01" });
    assert(del === null);
  });

  it("removes a workout successfully by id", async () => {
    const workout = new Workout(template);
    await workout.save();
    await Workout.findByIdAndDelete(workout._id);
    const del = await Workout.findOne({ date: "Jan 01" });
    assert(del === null);
  });
});
