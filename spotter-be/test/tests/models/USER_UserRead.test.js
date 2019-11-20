const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const User = require("../../../models/User");
const { dbHelper } = require("../../utils/db");

describe("User model reading", () => {
  dbHelper(User);

  // Successful user reading
  it("Successfully fetch user", async () => {
    const user = new User({ email: "test@email.com", password: "password" });
    await user.save();
    const fetched = await User.findOne({ email: "test@email.com" });
    assert(fetched.email === "test@email.com");
  });

  // Cannot fetch bad user details
  it("Cannot fetch user", async () => {
    const fetched = await User.findOne({ email: "bad@email.com" });
    assert(fetched === null);
  });
});
