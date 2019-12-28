const app = require("../../../utils/index");
const { dbHelper } = require("../../../utils/db");
const Exercise = require("../../../../models/Exercise");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createUser } = require("../../../utils/createUser");
const { genToken } = require("../../../utils/genToken");

// configure Chai HTTP
chai.use(chaiHttp);

describe("POST exercise by user id", () => {
  dbHelper(Exercise);

  let uId;

  // create test user
  beforeEach(async () => {
    const { _id } = await createUser();
    uId = _id;
    return uId;
  });

  it("should post exercise", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .post("/api/auth/exercises")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "name" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(201);
        res.body.exercise.name.should.equal("name");
        res.body.exercise.user.should.equal(String(uId));
        done();
      });
  });

  it("should not post exercise with bad token", done => {
    chai
      .request(app)
      .post("/api/auth/exercises")
      .set("Authorization", `Bearer token`)
      .send({ name: "name" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Connection lost, try refreshing");
        done();
      });
  });

  it("should not post exercise with no token", done => {
    chai
      .request(app)
      .post("/api/auth/exercises")
      .send({ name: "name" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should not post exercise when one already exists", async () => {
    const token = genToken(uId);
    await chai
      .request(app)
      .post("/api/auth/exercises")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "name" });

    const err = await chai
      .request(app)
      .post("/api/auth/exercises")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "name" });

    err.body.error.should.equal("Exercise already exists");
  });

  it("should not post exercise with long exercise name", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .post("/api/auth/exercises")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "jiojiojiojiojiojiojiojiojiojiojiojiojiojioj" });

    res.body.error.should.equal("25 character max");
  });

  it("should not post exercise with no exercise name", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .post("/api/auth/exercises")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: undefined });

    res.body.error.should.equal("Please add an exercise name");
  });
});
