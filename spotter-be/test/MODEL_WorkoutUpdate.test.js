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

describe("Workout model update functionality", () => {
  it("updates workout successfully", async () => {
    const workout = new Workout(template);
    await workout.save();
    await Workout.findOneAndUpdate({ date: "Jan 01 2020" }, { date: "Jan 02 2020" });
    const foo = await Workout.findOne({ date: "Jan 02 2020" });
    assert(foo !== null);
  });

  it("updates a workout successfully by id", async () => {
    const workout = new Workout(template);
    await workout.save();
    await Workout.findByIdAndUpdate(workout._id, { date: "Jan 02" });
    const foo = await Workout.findOne({ date: "Jan 02" });
    assert(foo !== null);
  });

  it("cannot update a workout date to nothing", async () => {
    const workout = new Workout(template);
    await workout.save();
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        { date: undefined },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Please add a date for this workout");
  });

  it("cannot update a workout date to invalid format", async () => {
    const workout = new Workout(template);
    await workout.save();
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        { date: "January 1st" },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Please add a valid date (Mmm DD YYYY)");
  });

  it("cannot update a workout title to nothing", async () => {
    const workout = new Workout(template);
    await workout.save();
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        { title: undefined },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Please add a workout title");
  });

  it("cannot update a workout title to invalid length", async () => {
    const workout = new Workout(template);
    await workout.save();
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        {
          title:
            "jfiowjfiowjfiowjceiowjeiowjfeiwofjewiofjeiwofjeiowfjewiofjeiowfjiowfjiowfjeiowfjwiofjwiofjiowefjiowjfiowfjiowjf"
        },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Title cannot be longer than 50 characters");
  });

  it("cannot update a workout tag to no color", async () => {
    const workout = new Workout(template);
    await workout.save();
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        { tags: [{ color: undefined }] },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Please add a tag color");
  });

  it("cannot update a workout tag content to invalid length", async () => {
    const workout = new Workout(template);
    await workout.save();
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        {
          tags: [{ color: "red", content: "fjewiofjeiowfjeiowfjeiowfjeiowfj" }]
        },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Tag content cannot be longer than 20 characters");
  });

  it("cannot update an exercise to nothing", async () => {
    const workout = new Workout(template);
    await workout.save();
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        { exercises: [{ name: undefined }] },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Please add an exercise name");
  });

  it("cannot update an exercise to an invalid length", async () => {
    const workout = new Workout(template);
    await workout.save();
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        {
          exercises: [
            {
              name:
                "jfiouwfjiowfjiowjfiowfjiowefjwiofjiowfjwioefjwiofjiowfjiowfjwiofjiowjfwiojfiowj"
            }
          ]
        },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Exercise name cannot be longer than 40 characters");
  });

  it("cannot update an exercise with invalid metrics", async () => {
    const workout = new Workout(template);
    await workout.save();

    // weight
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        { exercises: [{ ...template.exercises[0], weight: 2001 }] },
        { runValidators: true }
      )
    ).to.be.rejectedWith("2000 lb limit");

    // sets
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        { exercises: [{ ...template.exercises[0], sets: 2001 }] },
        { runValidators: true }
      )
    ).to.be.rejectedWith("2000 lb limit");

    // reps
    await expect(
      Workout.findByIdAndUpdate(
        workout._id,
        { exercises: [{ ...template.exercises[0], reps: 2001 }] },
        { runValidators: true }
      )
    ).to.be.rejectedWith("2000 lb limit");
  });
});
