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

describe("Workout model creation", () => {
  // Successful workout creation
  it("creates a workout", async () => {
    const workout = new Workout(template);
    await workout.save();
    assert(!workout.isNew);
  });

  it("cannot create workout with no date", async () => {
    const workout = new Workout({ ...template, date: undefined });
    await expect(workout.save()).to.be.rejectedWith(
      "Please add a date for this workout"
    );
  });

  it("cannot create with invalid date format", async () => {
    const workout = new Workout({ ...template, date: "January 1st" });
    await expect(workout.save()).to.be.rejectedWith(
      "Please add a valid date (Mmm DD)"
    );
  });

  it("cannot create with no title", async () => {
    const workout = new Workout({ ...template, title: undefined });
    await expect(workout.save()).to.be.rejectedWith("Please add a workout title");
  });
});
