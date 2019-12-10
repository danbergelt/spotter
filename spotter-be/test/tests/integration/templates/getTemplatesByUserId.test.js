const app = require("../../../utils/index");
const { dbHelper } = require("../../../utils/db");
const Template = require("../../../../models/Template");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createUser } = require("../../../utils/createUser");
const { createTemplate } = require("../../../utils/createTemplate");
const { template } = require("../../../utils/templateWorkoutTemplate");
const { genToken } = require("../../../utils/genToken");

// configure Chai HTTP
chai.use(chaiHttp);

describe("GET templates by user Id", () => {
  // connect to test db
  dbHelper(Template);

  // create test user
  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
    const { _id: temp } = await createTemplate(template);
    tId = temp;
    return tId;
  });

  it("should get all templates for this user", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .get("/api/auth/templates")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.templates[0].user.should.equal(String(template.user));
        res.body.templates[0].name.should.equal(String(template.name));
        res.body.templates[0].title.should.equal(String(template.title));
        res.body.templates[0].notes.should.equal(String(template.notes));
        done();
      });
  });

  it("should error out when no token is provided", done => {
    chai
      .request(app)
      .get("/api/auth/templates")
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
      .get("/api/auth/templates")
      .set("Authorization", `Bearer token`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Connection lost, try refreshing");
        done();
      });
  });
});
