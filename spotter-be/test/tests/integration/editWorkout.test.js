const app = require("../../utils/index");
const { dbHelper } = require("../../utils/db");
const Workout = require("../../../models/Workout");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createUser } = require("../../utils/createUser");
const { template } = require("../../utils/templateWorkout");
const { genToken } = require("../../utils/genToken");
const { createWorkout } = require("../../utils/createWorkout");

// configure Chai HTTP
chai.use(chaiHttp);

describe("PUT edit workout by workout id", () => {
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

  it("should edit workout", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.data.title.should.equal("EDITED");
        done();
      });
  });

  it("should not edit workout with bad id", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/12345`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(404);
        res.body.error.should.equal("Resource not found");
        done();
      });
  });

  it("should not edit workout with bad token", done => {
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer token`)
      .send({ title: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should not edit workout with no token", done => {
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .send({ title: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should not put workout with missing tag color", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...template, tags: [{ color: undefined }] })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Please add a tag color");
        done();
      });
  });

  it("should not put workout with long tag content", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...template,
        tags: [
          {
            color: "red",
            content: "jiojiojiowfjiowfjiowfjiowfjiowfjiowfjiowfjiowfjwiofjo"
          }
        ]
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal(
          "Tag content cannot be longer than 20 characters"
        );
        done();
      });
  });

  it("should not put workout with no date", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ date: "" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Please add a date for this workout");
        done();
      });
  });

  it("should not put workout with invalid date", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...template, date: "Jan 01" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Please add a valid date (Mmm DD YYYY)");
        done();
      });
  });

  it("should not put workout with no title", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...template, title: "" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Please add a workout title");
        done();
      });
  });

  it("should not put workout with long title", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...template,
        title:
          "jfiowefjewiofjewiofjeiowfjeiowfjeiowfjeiowfjeiowfjeiowfjeiowfjewiofjeiowfjeiowfjeiowfjeiowfjewiofj"
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal(
          "Title cannot be longer than 50 characters"
        );
        done();
      });
  });

  it("trims title with white space", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...template, title: "edited title   " })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.data.title.should.equal("edited title");
        done();
      });
  });

  it("should not put with undefined execise name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...template, exercises: [{ name: undefined }] })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Please add an exercise name");
        done();
      });
  });

  it("should not put with long execise name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...template,
        exercises: [
          { name: "jiouhjiohjiohjiohiuhguyguyguygyuguyguyguyuyguyguyuyg" }
        ]
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal(
          "Exercise name cannot be longer than 40 characters"
        );
        done();
      });
  });

  it("should not put weight above 2000", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...template,
        exercises: [{ name: "name", weight: 2001 }]
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("2000 lb limit");
        done();
      });
  });

  it("should not put sets above 2000", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...template,
        exercises: [{ name: "name", sets: 2001 }]
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("2000 sets limit");
        done();
      });
  });

  it("should not put reps above 2000", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/workouts/${uId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...template,
        exercises: [{ name: "name", reps: 2001 }]
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("2000 reps limit");
        done();
      });
  });
});
