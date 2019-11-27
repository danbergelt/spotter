const app = require("../../utils/index");
const { dbHelper } = require("../../utils/db");
const Tag = require("../../../models/Tag");
const Workout = require("../../../models/Workout");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createUser } = require("../../utils/createUser");
const { createTag } = require("../../utils/createTag");
const { genToken } = require("../../utils/genToken");
const { template } = require("../../utils/templateWorkout");

// configure Chai HTTP
chai.use(chaiHttp);

describe("DELETE Tag by tag id", () => {
  dbHelper(Tag);

  let uId;
  let tId;

  beforeEach(async () => {
    const { _id } = await createUser();
    uId = _id;
    const { _id: temp } = await createTag(_id);
    tId = temp;
    return uId, tId;
  });

  it("successfully deletes tag", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .delete(`/api/auth/tags/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.data.should.equal("Tag deleted");
        done();
      });
  });

  it("should not delete tag with bad id", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .delete(`/api/auth/tags/123456`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(404);
        res.body.error.should.equal("Resource not found");
        done();
      });
  });

  it("should not delete tag with bad token", done => {
    chai
      .request(app)
      .delete(`/api/auth/tags/${uId}`)
      .set("Authorization", `Bearer token`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied, try refreshing");
        done();
      });
  });

  it("should not delete tag with no token", done => {
    chai
      .request(app)
      .delete(`/api/auth/tags/${uId}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  describe("cascade delete wrapper", () => {
    beforeEach(async () => {
      dbHelper(Tag);
      const tag = new Tag({ color: "red", content: "content", user: uId });
      const { _id } = await tag.save();
      tId = _id;
      const workout = new Workout({
        ...template,
        tags: { tag: _id },
        user: uId
      });
      const savedWorkout = await workout.save();
      return savedWorkout;
    });

    it("should cascade delete tag from workout", done => {
      const token = genToken(uId);
      chai
        .request(app)
        .delete(`/api/auth/tags/${tId}`)
        .set("Authorization", `Bearer ${token}`)
        .end(() => {
          return chai
            .request(app)
            .get("/api/auth/workouts")
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
              should.exist(res);
              res.body.success.should.equal(true);
              res.should.have.status(200);
              res.body.workouts[0].tags.length.should.equal(0);
              done();
            });
        });
    });
  });
});
