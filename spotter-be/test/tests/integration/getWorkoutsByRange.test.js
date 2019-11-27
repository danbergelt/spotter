const app = require("../../utils/index");
const { dbHelper } = require("../../utils/db");
const Workout = require("../../../models/Workout");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createUser } = require("../../utils/createUser");
const { createWorkout } = require("../../utils/createWorkout");
const { template } = require("../../utils/templateWorkout");
const { genToken } = require("../../utils/genToken");

// configure Chai HTTP
chai.use(chaiHttp);

describe("GET workouts by date range and user id", () => {
  dbHelper(Workout);

  // create test user
  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
    const insert = [];
    for (let i = 1; i < 10; i++) {
      insert.push({ ...template, date: `Jan 0${i} 2000` });
    }
    await Workout.insertMany(insert);
  });

  it("should successfully return specified range", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post("/api/auth/workouts/range")
      .set("Authorization", `Bearer ${token}`)
      .send({ range: ["Jan 01 2000", "Jan 02 2000"] })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.count.should.equal(2);
        done();
      });
  });

  it("should fail with bad token", done => {
    chai
      .request(app)
      .post("/api/auth/workouts/range")
      .set("Authorization", `Bearer token`)
      .send({ range: ["Jan 01 2000", "Jan 02 2000"] })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied, try refreshing");
        done();
      });
  });

  it("should fail with no token", done => {
    chai
      .request(app)
      .post("/api/auth/workouts/range")
      .send({ range: ["Jan 01 2000", "Jan 02 2000"] })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should fail with no range", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post("/api/auth/workouts/range")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Please supply a date range");
        done();
      });
  });

  it("should return empty array when no dates found", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post("/api/auth/workouts/range")
      .send({ range: ["Feb 28 2000", "June 29 2000"] })
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.workouts.length.should.equal(0)
        done();
      });
  });
});
