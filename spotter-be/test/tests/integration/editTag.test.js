const app = require("../../utils/index");
const { dbHelper } = require("../../utils/db");
const Tag = require("../../../models/Tag");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createTag } = require("../../utils/createTag");
const { createUser } = require("../../utils/createUser");
const { genToken } = require("../../utils/genToken");

// configure Chai HTTP
chai.use(chaiHttp);

describe("PUT edit tag by tag id", () => {
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

  it("should edit tag", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .put(`/api/auth/tags/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.tag.content.should.equal("EDITED");
        done();
      });
  });

  it("should not edit tag with bad id", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .put(`/api/auth/tags/12345`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(404);
        res.body.error.should.equal("Resource not found");
        done();
      });
  });

  it("should not edit tag with bad token", done => {
    chai
      .request(app)
      .put(`/api/auth/workouts/${tId}`)
      .set("Authorization", `Bearer token`)
      .send({ content: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should not edit tag with no token", done => {
    chai
      .request(app)
      .put(`/api/auth/tags/${uId}`)
      .send({ content: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should not edit tag to undefined color", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .put(`/api/auth/tags/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ color: "" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Please add a tag color");
        done();
      });
  });

  it("should not edit tag to long content", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .put(`/api/auth/tags/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "jfeio2fjeio2fjeio2fjio2hohoihiohoi" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("20 character max");
        done();
      });
  });
});
