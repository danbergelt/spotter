const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Workout = require("../../../../models/Workout");
const User = require("../../../../models/User");
const { dbHelper } = require("../../../utils/db");
const { createUser } = require("../../../utils/createUser");
const { template } = require("../../../utils/templateWorkout");

describe("Workout model reading", () => {
  dbHelper(Workout);

  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
  });
  
  // Successful user reading
  it("Successfully fetch workout", async () => {
    const workout = new Workout(template);
    await workout.save();
    const fetched = await Workout.findOne({ title: "Workout" });
    assert(fetched.date === "Jan 01 2020");
  });

  // Cannot fetch bad user details
  it("Cannot fetch workout", async () => {
    const fetched = await Workout.findOne({ title: "Workout" });
    assert(fetched === null);
  });
});
