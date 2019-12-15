const app = require("../../../utils/index");
const { dbHelper } = require("../../../utils/db");
const User = require("../../../../models/User");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { genToken } = require("../../../utils/genToken");
const { createUser } = require("../../../utils/createUser");

chai.use(chaiHttp);

describe("can change password", async () => {
  // Run DB
  dbHelper(User);

  let oldPass;
  let uId;

  // create test user
  beforeEach(async () => {
    const { _id } = await createUser();
    uId = _id;
    // Check for user
    const { password } = await User.findById(_id).select("+password");
    oldPass = password;
  });

  const getPassword = async () => {
    const { password } = await User.findById(uId).select("+password");
    return password;
  };

  it("should change password existing user", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .put("/api/auth/user/password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        oldPassword: "password",
        newPassword: "newPassword",
        confirmPassword: "newPassword"
      });
    should.exist(res);
    res.body.success.should.equal(true);
    res.should.have.status(200);
    const password = await getPassword();
    password.should.not.equal(oldPass);
  });

  it("should not change password with empty fields", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .put("/api/auth/user/password")
      .set("Authorization", `Bearer ${token}`);
    should.exist(res);
    res.body.success.should.equal(false);
    res.should.have.status(400);
    res.body.error.should.equal("All fields are required");
  });

  it("should not change password with mismatch new password fields", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .put("/api/auth/user/password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        oldPassword: "password",
        newPassword: "newPassword",
        confirmPassword: "fjwiofjwiof"
      });
    should.exist(res);
    res.body.success.should.equal(false);
    res.should.have.status(400);
    res.body.error.should.equal("New password fields must match");
  });

  it("should not change password with incorrect old password", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .put("/api/auth/user/password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        oldPassword: "badpassword",
        newPassword: "newPassword",
        confirmPassword: "newPassword"
      });
    should.exist(res);
    res.body.success.should.equal(false);
    res.should.have.status(400);
    res.body.error.should.equal("Invalid credentials");
  });
});
