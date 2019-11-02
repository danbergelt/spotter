const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const User = require("../models/User");
const { dbHelper } = require("./utils/db");

dbHelper(User);

describe("User model deletion", () => {
  // Successful user deletion
  it("removes a user successfully", async () => {
    const user = new User({ email: "test@email.com", password: "password" });
    await user.save();
    await User.findOneAndDelete({ email: "test@email.com" });
    const del = await User.findOne({ email: "test@email.com" });
    assert(del === null);
  });

  it("removes a user successfully by id", async () => {
    const user = new User({ email: "test@email.com", password: "password" });
    await user.save();
    await User.findByIdAndDelete(user._id);
    const del = await User.findOne({ email: "test@email.com" });
    assert(del === null);
  });
});
