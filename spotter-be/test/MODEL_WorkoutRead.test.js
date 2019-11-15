const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Workout = require("../models/Workout");
const { dbHelper } = require("./utils/db");

dbHelper(Workout);

const template = {
  date: "Jan 01",
  title: "Workout",
  tags: [{ color: "red", content: "tag" }, { color: "blue", content: "tag2" }],
  notes: "Notes for workout",
  exercises: [
    { name: "Exercise", weight: 100, sets: 1, reps: 1 },
    { name: "Exercise2", weight: 200, sets: 2, reps: 2 }
  ]
};

describe("Workout model reading", () => {
  // Successful user reading
  it("Successfully fetch workout", async () => {
    const workout = new Workout(template);
    await workout.save();
    const fetched = await Workout.findOne({ title: "Workout" });
    assert(fetched.date === "Jan 01");
  });

  // Cannot fetch bad user details
  it("Cannot fetch workout", async () => {
    const fetched = await Workout.findOne({ title: "Workout" });
    assert(fetched === null);
  });
});
