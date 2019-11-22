const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Tag = require("../../../models/Tag");
const { dbHelper } = require("../../utils/db");

describe("Tag model reading", () => {
  dbHelper(Tag);

  it("can read a saved tag model", async () => {
    const tag = new Tag({ color: "red", content: "content" });
    await tag.save();
    const fetched = await Tag.findById(tag._id);
    assert(fetched.color === "red");
  });

  it("cannot fetch tag", async () => {
    const fetched = await Tag.findOne({ color: "huh?" });
    assert(fetched === null);
  })
});
