const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Exercise = require("../../../../models/Exercise");
const { dbHelper } = require("../../../utils/db");
const { createUser } = require("../../../utils/createUser");

describe("Exercise model creation", () => {
  dbHelper(Exercise);

  it("creates an exercise", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({
      name: "exercise",
      pr: 100,
      prDate: "date",
      user: _id
    });
    await exercise.save();
    assert(!exercise.isNew);
  });

  it("cannot create with no name", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({ pr: 100, prDate: "date", user: _id });
    await expect(exercise.save()).to.be.rejectedWith(
      "Please add an exercise name"
    );
  });

  it("cannot create with long name", async () => {
    const { _id } = await createUser();
    const exercise = new Exercise({
      name:
        "fjweoifjwiofjiowfjiowfjiowfjiowjfiowjfiowjfiowfjiowjfiowjfwiofjwiofjwofj",
      pr: 100,
      prDate: "date",
      user: _id
    });
    await expect(exercise.save()).to.be.rejectedWith(
      "40 character limit on exercise name"
    );
  });

  it("cannot create with no user", async () => {
    const exercise = new Exercise({
      name: "name",
      pr: 100,
      prDate: "date"
    });
    await expect(exercise.save()).to.be.rejectedWith(
      "User validation failed"
    );
  });
});
