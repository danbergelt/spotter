const app = require("./utils/index");
const { dbHelper } = require("./utils/db");
const User = require("../models/User");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();

// configure Chai HTTP
chai.use(chaiHttp);

// Run DB
dbHelper(User);

describe("Login existing user", async () => {
  // Successful login
  it("should login existing user", done => {
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ email: "new@email.com", password: "password" })
      .end(() =>
        chai
          .request(app)
          .post("/api/auth/login")
          .send({ email: "new@email.com", password: "password" })
          .end((err, res) => {
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("token");
            done();
          })
      );
  });

  // Bad login attempts
  it("should error out when email is not provided", done => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ password: "password" })
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.error.should.equal("Please provide an email and password");
        done();
      });
  });

  it("should error out when password is not provided", done => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: "test@email.com" })
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.error.should.equal("Please provide an email and password");
        done();
      });
  });

  it("should reject bad attempts", done => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: "test@email.com", password: "password" })
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.error.should.equal("Invalid credentials");
        done();
      });
  });
});
