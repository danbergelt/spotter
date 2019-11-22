const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Tag = require("../../../models/Tag");
const { dbHelper } = require("../../utils/db");
const { createUser } = require("../../utils/createUser");

describe("Tag model deletion", () => {
  dbHelper(Tag);

  it("removes a tag successfully", async () => {
    const { _id } = await createUser();
    const tag = new Tag({ color: "red", content: "content", user: _id });
    await tag.save();
    await Tag.findOneAndDelete({ color: "red" });
    const del = await Tag.findOne({ color: "red" });
    assert(del === null);
  });

  it("removes a tag by id successfully", async () => {
    const { _id } = await createUser();
    const tag = new Tag({ color: "red", content: "content", user: _id });
    await tag.save();
    await Tag.findByIdAndDelete(tag._id);
    const del = await Tag.findOne({ color: "red" });
    assert(del === null);
  });
});
