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

describe("GET workouts by user id", () => {
  // connect to test db
  dbHelper(Workout);

  // create test user
  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
    const insert = [];
    for(let i = 0; i < 15; i++){
      insert.push(template);
    }
    await Workout.insertMany(insert)
  });

  it("should successfully fetch all workouts for this user", done => {
    createWorkout(template);
    const token = genToken(template.user);
    chai
      .request(app)
      .get("/api/auth/workouts")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.workouts[0].user.should.equal(String(template.user));
        res.body.workouts[0].date.should.equal(String(template.date));
        res.body.workouts[0].title.should.equal(String(template.title));
        res.body.workouts[0].notes.should.equal(String(template.notes));
        done();
      });
  });

  it("should error out when no token is provided", done => {
    chai
      .request(app)
      .get("/api/auth/workouts")
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should error out with incorrect token", done => {
    chai
      .request(app)
      .get("/api/auth/workouts")
      .set("Authorization", `Bearer token`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied, try refreshing");
        done();
      });
  });

  it("should return 10 workouts by default if content longer than 10", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .get("/api/auth/workouts")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.count.should.equal(10);
        done()
      });
  });

  it("should return 5 workouts on second page if content 15 elements long", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .get("/api/auth/workouts")
      .query({ page: "1" })
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.count.should.equal(5);
        done()
      });
  });

  it("should return 5 workouts if limit is 5", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .get("/api/auth/workouts")
      .query({ limit: "5" })
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.count.should.equal(5);
        done();
      });
  });
});
