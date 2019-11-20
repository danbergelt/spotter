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

describe("DELETE workout by workout id", () => {
  // connect to test db
  dbHelper(Workout);

  let uId;

  // create test user
  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
    const { _id: temp } = await createWorkout(template);
    uId = temp;
    return uId;
  });

  it("should delete workout", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .delete(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.data.should.equal("Workout deleted")
        done();
      });
  });

  it("should not delete workout with bad id", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .delete(`/api/auth/workouts/12345`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(404);
        res.body.error.should.equal("Resource not found")
        done();
      });
  });

  it("should not delete workout with bad token", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .delete(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer token`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied")
        done();
      });
  });

  it("should not delete workout with no token", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .delete(`/api/auth/workouts/${uId}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied")
        done();
      });
  });
});
