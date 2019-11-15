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

describe("Testing workout model deletion", () => {
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
