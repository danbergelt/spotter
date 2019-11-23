const app = require("../../utils/index");
const { dbHelper } = require("../../utils/db");
const Tag = require("../../../models/Tag");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createUser } = require("../../utils/createUser");
const { genToken } = require("../../utils/genToken");

// configure Chai HTTP
chai.use(chaiHttp);

describe("GET tags by user id", () => {
  dbHelper(Tag);

  let uId;

  // Seed DB with max amount of tags
  beforeEach(async () => {
    const { _id } = await createUser();
    uId = _id;
    const insert = [];
    for (let i = 0; i < 25; i++) {
      insert.push({ color: "red", content: `${i}`, user: uId });
    }
    await Tag.insertMany(insert);
    return uId;
  });

  it("should successfully fetch all tags for this user", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .get("/api/auth/tags")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.tags.length.should.equal(25);
        res.body.tags[0].user.should.equal(String(uId));
        done();
      });
  });

  it("should error out when no token is provided", done => {
    chai
      .request(app)
      .get("/api/auth/tags")
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should error out when bad token is provided", done => {
    chai
      .request(app)
      .get("/api/auth/tags")
      .set("Authorization", `Bearer token`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });
});
