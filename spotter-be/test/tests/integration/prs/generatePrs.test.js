const app = require("../../../utils/index");
const { dbHelper } = require("../../../utils/db");
const Exercise = require("../../../../models/Exercise");
const Workout = require("../../../../models/Workout");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createUser } = require("../../../utils/createUser");
const { createExercise } = require("../../../utils/createExercise");
const { genToken } = require("../../../utils/genToken");

// configure Chai HTTP
chai.use(chaiHttp);

describe("Personal records generations", () => {
  dbHelper(Exercise);

  let uId;
  let eId;
  let wId;

  beforeEach(async () => {
    User;
    const { _id } = await createUser();
    uId = _id;
    const { _id: ex } = await createExercise(_id);
    eId = ex;
    const workout1 = new Workout({
      date: "Jan 02 1999",
      title: "workout",
      user: uId,
      exercises: [{ name: "name", weight: 98, sets: 1, reps: 1 }]
    });
    const workout2 = new Workout({
      date: "Jan 01 1999",
      title: "workout 2",
      user: uId,
      exercises: [{ name: "name", weight: 100, sets: 1, reps: 1 }]
    });
    await workout1.save();
    const { _id: temp } = await workout2.save();
    wId = temp;
    return uId, wId;
  });

  it("successfully generates PR", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .get(`/api/auth/prs`)
      .set("Authorization", `Bearer ${token}`);

    res.body.prs.name.name.should.equal("name");
    res.body.prs.name.pr.should.equal(100);
    res.body.prs.name.date.should.equal("Jan 01 1999");
  });

  it("updates a PR when workout is updated", async () => {
    const token = genToken(uId);
    await chai
      .request(app)
      .put(`/api/auth/workouts/${wId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ exercises: [{ name: "name", weight: 200 }] });

    const res = await chai
      .request(app)
      .get(`/api/auth/prs`)
      .set("Authorization", `Bearer ${token}`);

    res.body.prs.name.name.should.equal("name");
    res.body.prs.name.pr.should.equal(200);
    res.body.prs.name.date.should.equal("Jan 01 1999");

    await chai
      .request(app)
      .put(`/api/auth/workouts/${wId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ exercises: [{ name: "name", weight: 10 }] });

    const res2 = await chai
      .request(app)
      .get(`/api/auth/prs`)
      .set("Authorization", `Bearer ${token}`);

    res2.body.prs.name.name.should.equal("name");
    res2.body.prs.name.pr.should.equal(98);
    res2.body.prs.name.date.should.equal("Jan 02 1999");
  });

  it("updates PR when workout is created", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .get(`/api/auth/prs`)
      .set("Authorization", `Bearer ${token}`);

    res.body.prs.name.name.should.equal("name");
    res.body.prs.name.pr.should.equal(100);
    res.body.prs.name.date.should.equal("Jan 01 1999");

    await chai
      .request(app)
      .post(`/api/auth/workouts`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: "Jan 10 1999",
        title: "workout",
        user: uId,
        exercises: [{ name: "name", weight: 500, sets: 1, reps: 1 }]
      });

    const res2 = await chai
      .request(app)
      .get(`/api/auth/prs`)
      .set("Authorization", `Bearer ${token}`);

    res2.body.prs.name.name.should.equal("name");
    res2.body.prs.name.pr.should.equal(500);
    res2.body.prs.name.date.should.equal("Jan 10 1999");
  });

  it("updates PR when workout is deleted", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .get(`/api/auth/prs`)
      .set("Authorization", `Bearer ${token}`);

    res.body.prs.name.name.should.equal("name");
    res.body.prs.name.pr.should.equal(100);
    res.body.prs.name.date.should.equal("Jan 01 1999");

    await chai
      .request(app)
      .delete(`/api/auth/workouts/${wId}`)
      .set("Authorization", `Bearer ${token}`);

    const res2 = await chai
      .request(app)
      .get(`/api/auth/prs`)
      .set("Authorization", `Bearer ${token}`);

    res2.body.prs.name.name.should.equal("name");
    res2.body.prs.name.pr.should.equal(98);
    res2.body.prs.name.date.should.equal("Jan 02 1999");
  });

  it("updates PR when workout is deleted", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .get(`/api/auth/prs`)
      .set("Authorization", `Bearer ${token}`);

    res.body.prs.name.name.should.equal("name");
    res.body.prs.name.pr.should.equal(100);
    res.body.prs.name.date.should.equal("Jan 01 1999");

    await chai
      .request(app)
      .delete(`/api/auth/exercises/${eId}`)
      .set("Authorization", `Bearer ${token}`);

    const res2 = await chai
      .request(app)
      .get(`/api/auth/prs`)
      .set("Authorization", `Bearer ${token}`);

    Object.keys(res2.body.prs).length.should.equal(0);
  });
});
