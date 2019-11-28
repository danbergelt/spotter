const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Template = require("../../../models/Template");
const User = require("../../../models/User");
const { dbHelper } = require("../../utils/db");
const { createUser } = require("../../utils/createUser");
const { template } = require("../../utils/templateWorkoutTemplate");

describe("template model fetch", () => {
  dbHelper(Template);

  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
  });

  it("successfully fetch template", async () => {
    const temp = new Template(template);
    await temp.save();
    const fetched = await Template.findOne({ title: "Workout" });
    assert(fetched.name === "Test Template");
  })

  it("cannot fetch template", async () => {
    const fetched = await Template.findOne({ title: "Workout" });
    assert(fetched === null);
  })
})