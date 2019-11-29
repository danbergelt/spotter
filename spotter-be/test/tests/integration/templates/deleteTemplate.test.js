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

describe("DELETE template by template id", () => {
  dbHelper(Template);

  let tId;

  // create test user
  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
    const { _id: temp } = await createTemplate(template);
    tId = temp;
    return tId;
  });

  it("should delete template", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .delete(`/api/auth/templates/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.data.should.equal("Template deleted");
        done();
      });
  });

  it("should not delete template with bad id", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .delete(`/api/auth/templates/12345`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(404);
        res.body.error.should.equal("Resource not found");
        done();
      });
  });

  it("should not delete template with bad token", done => {
    chai
      .request(app)
      .delete(`/api/auth/templates/${tId}`)
      .set("Authorization", `Bearer token`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied, try refreshing");
        done();
      });
  });

  it("should not delete template with no token", done => {
    chai
      .request(app)
      .delete(`/api/auth/templates/${tId}`)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });
});
