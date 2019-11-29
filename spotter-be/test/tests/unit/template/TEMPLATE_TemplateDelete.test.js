const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Template = require("../../../../models/Template");
const User = require("../../../../models/User");
const { dbHelper } = require("../../../utils/db");
const { createUser } = require("../../../utils/createUser");
const { template } = require("../../../utils/templateWorkoutTemplate");

describe("template model deletion", () => {
  dbHelper(Template);

  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
  });

  it("removes a template successfully", async () => {
    const temp = new Template(template);
    await temp.save();
    await Template.findOneAndDelete({ name: "Test Template" });
    const del = await Template.findOne({ name: "Test Template" });
    assert(del === null);
  });

  it("removes a template successfully by id", async () => {
    const temp = new Template(template);
    await temp.save();
    await Template.findByIdAndDelete(temp._id);
    const del = await Template.findOne({ name: "Test Template" });
    assert(del === null);
  });
})