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

  it("successfully fetches exercises", async () => {
    const token = genToken(uId);
    const res = await chai
      .request(app)
      .get(`/api/auth/exercises/`)
      .set("Authorization", `Bearer ${token}`);

    res.body.exercises[0].name.should.equal("name");
  });

  it("errors out with no token", async () => {
    const res = await chai.request(app).get(`/api/auth/exercises/`);

    res.body.error.should.equal("Access denied");
  });

  it("errors out with bad token", async () => {
    const res = await chai
      .request(app)
      .get(`/api/auth/exercises/`)
      .set("Authorization", `Bearer viorwfj`);

    res.body.error.should.equal("Connection lost, try refreshing");
  });
});
