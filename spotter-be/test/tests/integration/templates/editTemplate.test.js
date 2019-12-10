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

describe("PUT edit template by template id", () => {
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

  it("should edit template", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
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

  it("should not edit template with bad id", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/jioj89j9`)
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

  it("should not edit template with bad token", done => {
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
      .set("Authorization", `Bearer jiojiojio`)
      .send({ title: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Connection lost, try refreshing");
        done();
      });
  });

  it("should not edit template with no token", done => {
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
      .send({ title: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should not edit template to no name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Give your template a name");
        done();
      });
  });

  it("should not edit template to long name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "jiojiojiojiojiojfiwojfeiowfjeiowfjeiowfjwefewfwcqcxwxm,opocj" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("20 character max");
        done();
      });
  });

  it("should not put template with long title", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
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
          "Title cannot be longer than 25 characters"
        );
        done();
      });
  });

  it("trims title with white space", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
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

  it("trims name with white space", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "edited name                        " })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(200);
        res.body.data.name.should.equal("edited name");
        done();
      });
  });

  it("should not put long exercise name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        exercises: {
          name: "fjwiofjiowfjeiowfjeiowfjeiowfjeiwofjeiowfjeiowfjeiowfjwio"
        }
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

  it("should not put blank exercise name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        exercises: {
          name: undefined
        }
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Please add an exercise name");
        done();
      });
  });

  it("should not put weight above 2000", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .put(`/api/auth/templates/${tId}`)
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
      .put(`/api/auth/templates/${tId}`)
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
      .put(`/api/auth/templates/${tId}`)
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
