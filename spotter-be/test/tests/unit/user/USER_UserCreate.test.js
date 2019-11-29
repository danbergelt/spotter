const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const User = require("../../../../models/User");
const { dbHelper } = require("../../../utils/db");

describe("User model creation", () => {
  dbHelper(User);

  // Successful user creation
  it("creates a user", async () => {
    const user = new User({ email: "test@email.com", password: "password" });
    await user.save();
    assert(!user.isNew);
  });

  // Invalid email errs
  it("cannot create with invalid email", async () => {
    const user = new User({ email: "bademail", password: "password" });
    await expect(user.save()).to.be.rejectedWith("Please add a valid email");
  });

  it("cannot create with no email", async () => {
    const user = new User({ password: "password" });
    await expect(user.save()).to.be.rejectedWith("Please add an email");
  });

  // Need to write custom error handler
  it("cannot create duplicate emails in collection", async () => {
    const user = new User({ email: "test@email.com", password: "password" });
    await user.save();
    assert(!user.isNew);
    const dup = new User({ email: "test@email.com", password: "password" });
    await expect(dup.save()).to.be.rejectedWith(Error);
  });

  it("cannot create email with non-string email", async () => {
    const user = new User({ email: 1234, password: "password" });
    await expect(user.save()).to.be.rejectedWith(Error);
  });

  // Invalid password errs
  it("cannot create user with no password", async () => {
    const user = new User({ email: "test@email.com" });
    await expect(user.save()).to.be.rejectedWith("Please add a password");
  });

  it("cannot create with password < 6 chars", async () => {
    const user = new User({ email: "test@email.com", password: "pass" });
    await expect(user.save()).to.be.rejectedWith(
      "Password needs to be at least 6 characters"
    );
  });
});
