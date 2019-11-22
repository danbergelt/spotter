const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Tag = require("../../../models/Tag");
const { dbHelper } = require("../../utils/db");

describe("Update tag model", () => {
  dbHelper(Tag);

  it("successfully updates tag model", async () => {
    const tag = new Tag({ color: "red", content: "content" });
    await tag.save();
    await Tag.findByIdAndUpdate(tag._id, { color: "blue", content: "text" });
    const foo = await Tag.findOne({ color: "blue" });
    assert(foo !== null);
  });

  it("cannot update tag color to undefined", async () => {
    const tag = new Tag({ color: "red", content: "content" });
    await tag.save();
    await expect(
      Tag.findByIdAndUpdate(
        tag._id,
        { color: undefined, content: "text" },
        { runValidators: true }
      )
    ).to.be.rejectedWith("Please add a tag color");
  });

  it("cannot update tag color to undefined", async () => {
    const tag = new Tag({ color: "red", content: "content" });
    await tag.save();
    await expect(
      Tag.findByIdAndUpdate(
        tag._id,
        { color: "red", content: "hjiuhiugiugiugghiugiugiugiugiugiugiu" },
        { runValidators: true }
      )
    ).to.be.rejectedWith("20 character max");
  });
});
