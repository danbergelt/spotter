const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const Tag = require("../../../models/Tag");
const { dbHelper } = require("../../utils/db");
const { createUser } = require("../../utils/createUser");

describe("Tag model creation", () => {
  dbHelper(Tag);

  // Successful tag creation
  it("creates a workout tag", async () => {
    const { _id } = await createUser();
    const tag = new Tag({ color: "red", content: "content", user: _id });
    await tag.save();
    assert(!tag.isNew);
  });

  it("cannot create with no tag color", async () => {
    const { _id } = await createUser();
    const tag = new Tag({ color: undefined, content: "content", user: _id });
    await expect(tag.save()).to.be.rejectedWith("Please add a tag color");
  });

  it("cannot create with long tag content", async () => {
    const { _id } = await createUser();
    const tag = new Tag({ color: "red", content: "hiohjiojiojfwiojfeiowfjeiowfjwiofjeiowfj", user: _id });
    await expect(tag.save()).to.be.rejectedWith("20 character max");
  });

  it("cannot create with no user", async () => {
    const tag = new Tag({ color: "red", content: "content", user: undefined });
    await expect(tag.save()).to.be.rejectedWith(Error);
  });
});
