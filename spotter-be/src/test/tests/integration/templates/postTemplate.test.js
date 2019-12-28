const app = require("../../../utils/index");
const { dbHelper } = require("../../../utils/db");
const Template = require("../../../../models/Template");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();
const { createUser } = require("../../../utils/createUser");
const { template } = require("../../../utils/templateWorkoutTemplate");
const { genToken } = require("../../../utils/genToken");

// configure Chai HTTP
chai.use(chaiHttp);

describe("POST templates by user id", () => {
  // connect to test db
  dbHelper(Template);

  // create test user
  beforeEach(async () => {
    const { _id } = await createUser();
    template.user = _id;
  });

  it("should post template", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post("/api/auth/templates")
      .set("Authorization", `Bearer ${token}`)
      .send(template)
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(201);
        res.body.data.user.should.equal(String(template.user));
        res.body.data.name.should.equal(String(template.name));
        res.body.data.title.should.equal(String(template.title));
        res.body.data.notes.should.equal(String(template.notes));
        done();
      });
  });

  it("should not post workout with bad token", done => {
    chai
      .request(app)
      .post(`/api/auth/templates`)
      .set("Authorization", `Bearer token`)
      .send({ title: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Connection lost, try refreshing");
        done();
      });
  });

  it("should not post workout with no token", done => {
    chai
      .request(app)
      .post(`/api/auth/templates`)
      .send({ title: "EDITED" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should not post template with no name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post(`/api/auth/templates/`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...template, name: "" })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Give your template a name");
        done();
      });
  });

  it("should not post template with long name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post(`/api/auth/templates`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "jiojiojiojiojiojfiwojfeiowfjeiowfjeiowfjwefewfwcqcxwxm,opocj"
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("20 character max");
        done();
      });
  });

  it("should not post template with long title", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post(`/api/auth/templates`)
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
      .post(`/api/auth/templates`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...template, title: "edited title   " })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(201);
        res.body.data.title.should.equal("edited title");
        done();
      });
  });

  it("trims name with white space", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post(`/api/auth/templates`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "edited name                        " })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(201);
        res.body.data.name.should.equal("edited name");
        done();
      });
  });

  it("should not post long exercise name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post(`/api/auth/templates`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...template,
        exercises: {
          name: "fjwiofjiowfjeiowfjeiowfjeiowfjeiwofjeiowfjeiowfjeiowfjwio"
        }
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal(
          "25 character max"
        );
        done();
      });
  });

  it("should not post blank exercise name", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post(`/api/auth/templates`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...template,
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

  it("should not post weight above 2000", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post(`/api/auth/templates`)
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

  it("should not post sets above 2000", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post(`/api/auth/templates`)
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

  it("should not post reps above 2000", done => {
    const token = genToken(template.user);
    chai
      .request(app)
      .post(`/api/auth/templates`)
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
