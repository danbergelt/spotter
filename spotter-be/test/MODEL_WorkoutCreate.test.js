const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Workout = require("../models/Workout");
const User = require("../models/User");
const { dbHelper } = require("./utils/db");
const { createUser } = require("./utils/createUser");

dbHelper(Workout);

const template = {
  date: "Jan 01 2020",
  title: "Workout",
  tags: [{ color: "red", content: "tag" }, { color: "blue", content: "tag2" }],
  notes: "Notes for workout",
  exercises: [
    { name: "Exercise", weight: 100, sets: 1, reps: 1 },
    { name: "Exercise2", weight: 200, sets: 2, reps: 2 }
  ],
  user: null
};

beforeEach(async () => {
  const { _id } = await createUser();
  template.user = _id;
});

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
      "Please add a valid date (Mmm DD YYYY)"
    );
  });

  it("cannot create with no title", async () => {
    const workout = new Workout({ ...template, title: undefined });
    await expect(workout.save()).to.be.rejectedWith(
      "Please add a workout title"
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

  it("cannot create with long tag content", async () => {
    const workout = new Workout({
      ...template,
      tags: [
        {
          color: "red",
          content: "this content is too long for a tag! try again"
        }
      ]
    });
    await expect(workout.save()).to.be.rejectedWith(
      "Tag content cannot be longer than 20 characters"
    );
  });

  it("cannot create tag with no color", async () => {
    const workout = new Workout({
      ...template,
      tags: [
        {
          color: undefined,
          content: "content"
        }
      ]
    });
    await expect(workout.save()).to.be.rejectedWith("Please add a tag color");
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
    await expect(workout.save()).to.be.rejectedWith("2000 lb limit");

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
    await expect(workout.save()).to.be.rejectedWith("2000 lb limit");
  });
});
