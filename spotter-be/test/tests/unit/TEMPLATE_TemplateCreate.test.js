const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Template = require("../../../models/Template");
const User = require("../../../models/User");
const { dbHelper } = require("../../utils/db");
const { createUser } = require("../../utils/createUser");
const { template } = require("../../utils/templateWorkoutTemplate");

describe("template model creation", () => {
  dbHelper(Template);

  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
  });

  it("creates a template workout", async () => {
    const temp = new Template(template);
    await temp.save();
    assert(!temp.isNew);
  });

  it("cannot create template with no name", async () => {
    const temp = new Template({ ...template, name: undefined });
    await expect(temp.save()).to.be.rejectedWith("Give your template a name");
  });

  it("cannot create template with no tag id", async () => {
    const temp = new Template({ ...template, tags: { tag: undefined } });
    await expect(temp.save()).to.be.rejectedWith("Tag must include tag ID");
  });

  it("cannot create long name", async () => {
    const temp = new Template({
      ...template,
      name:
        "kfiopwjciowcjiowcjiowcjiojciowjfiowjciojwiofjweiofjeiowjfioecnionconco2cho"
    });
    await expect(temp.save()).to.be.rejectedWith("20 character max");
  });

  it("cannot create long title", async () => {
    const temp = new Template({
      ...template,
      title:
        "kfiopwjciowcjiowcjiowcjiojciowjfiowjciojwiofjweiofjeiowjfioecnionconco2cho"
    });
    await expect(temp.save()).to.be.rejectedWith(
      "Title cannot be longer than 50 characters"
    );
  });

  it("cannot create exercise with no name", async () => {
    const temp = new Template({
      ...template,
      exercises: [
        {
          name: undefined
        }
      ]
    });
    await expect(temp.save()).to.be.rejectedWith("Please add an exercise name");
  });

  it("cannot create exercise with long name", async () => {
    const temp = new Template({
      ...template,
      exercises: [
        {
          name: "kiojkiojiojiohiughuygtyftydfrtdrtsrtdrtdftufyugiuhuh"
        }
      ]
    });
    await expect(temp.save()).to.be.rejectedWith(
      "Exercise name cannot be longer than 40 characters"
    );
  });

  it("cannot create exercise with large values", async () => {
    // weight
    let temp = new Template({
      ...template,
      exercises: [
        {
          ...template.exercises[0],
          weight: 2001
        }
      ]
    });
    await expect(temp.save()).to.be.rejectedWith("2000 lb limit");

    // sets
    temp = new Template({
      ...template,
      exercises: [
        {
          ...template.exercises[0],
          sets: 2001
        }
      ]
    });
    await expect(temp.save()).to.be.rejectedWith("2000 sets limit");

    // reps
    temp = new Template({
      ...template,
      exercises: [
        {
          ...template.exercises[0],
          reps: 2001
        }
      ]
    });
    await expect(temp.save()).to.be.rejectedWith("2000 reps limit");
  });
});
