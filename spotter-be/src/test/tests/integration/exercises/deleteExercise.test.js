const app = require("../../../utils/index");
const { dbHelper } = require("../../../utils/db");
const Exercise = require("../../../../models/Exercise");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createUser } = require("../../../utils/createUser");
const { createExercise } = require("../../../utils/createExercise");
const { genToken } = require("../../../utils/genToken");

// configure Chai HTTP
chai.use(chaiHttp);

describe("DELETE exercise by exercise id", () => {
  dbHelper(Exercise);

  let uId;
  let eId;

  beforeEach(async () => {
    const { _id } = await createUser();
    uId = _id;
    const { _id: temp } = await createExercise(_id);
    eId = temp;
    return uId, eId;
  });

  it("successfully deletes exercise", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .delete(`/api/auth/exercises/${eId}`)
      .set("Authorization", `Bearer ${token}`);

    res.body.data.should.equal("Exercise deleted");
  });

  it("should not delete exercise with bad id", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .delete(`/api/auth/exercises/dj9i12dj129`)
      .set("Authorization", `Bearer ${token}`);

    res.body.error.should.equal("Resource not found");
  });

  it("should not delete exercise with bad token", async () => {
    const res = await chai
      .request(app)
      .delete(`/api/auth/exercises/${eId}`)
      .set("Authorization", `Bearer hjiouhjhj9uh9`);

    res.body.error.should.equal("Connection lost, try refreshing");
  });

  it("should not delete exercise with no token", async () => {
    const res = await chai
      .request(app)
      .delete(`/api/auth/exercises/${eId}`)

    res.body.error.should.equal("Access denied");
  });
});
