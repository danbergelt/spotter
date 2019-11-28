const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Workout = require("../../../models/Workout");
const User = require("../../../models/User");
const { dbHelper } = require("../../utils/db");
const { createUser } = require("../../utils/createUser");
const { template } = require("../../utils/templateWorkout");

describe("Workout model creation", () => {
  dbHelper(Workout);

  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
  });

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
      "Please add a valid date (Mmm DD YYYY)"
    );
  });

  it("cannot create long title", async () => {
    const workout = new Workout({
      ...template,
      title:
        "kfiopwjciowcjiowcjiowcjiojciowjfiowjciojwiofjweiofjeiowjfioecnionconco2cho"
    });
    await expect(workout.save()).to.be.rejectedWith(
      "Title cannot be longer than 50 characters"
    );
  });


  it("cannot create exercise with no name", async () => {
    const workout = new Workout({
      ...template,
      exercises: [
        {
          name: undefined
        }
      ]
    });
    await expect(workout.save()).to.be.rejectedWith(
      "Please add an exercise name"
    );
  });

  it("cannot create workout w/ tag with no tag id", async () => {
    const workout = new Workout({ ...template, tags: { tag: undefined } });
    await expect(workout.save()).to.be.rejectedWith("Tag must include tag ID");
  });

  it("cannot create exercise with long name", async () => {
    const workout = new Workout({
      ...template,
      exercises: [
        {
          name: "kiojkiojiojiohiughuygtyftydfrtdrtsrtdrtdftufyugiuhuh"
        }
      ]
    });
    await expect(workout.save()).to.be.rejectedWith(
      "Exercise name cannot be longer than 40 characters"
    );
  });

  it("cannot create exercise with large values", async () => {
    // weight
    let workout = new Workout({
      ...template,
      exercises: [
        {
          ...template.exercises[0],
          weight: 2001
        }
      ]
    });
    await expect(workout.save()).to.be.rejectedWith("2000 lb limit");

    // sets
    workout = new Workout({
      ...template,
      exercises: [
        {
          ...template.exercises[0],
          sets: 2001
        }
      ]
    });
    await expect(workout.save()).to.be.rejectedWith("2000 sets limit");

    // reps
    workout = new Workout({
      ...template,
      exercises: [
        {
          ...template.exercises[0],
          reps: 2001
        }
      ]
    });
    await expect(workout.save()).to.be.rejectedWith("2000 reps limit");
  });
});
