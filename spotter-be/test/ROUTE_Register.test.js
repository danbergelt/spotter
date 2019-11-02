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

describe("Register new user", () => {
  // Successful registration --> POST/register
  it("should register new user", done => {
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ email: "test@email.com", password: "password" })
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        done();
      });
  });

  // Invalid email errs
  it("cannot register w/ invalid email", done => {
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ email: "bad", password: "password" })
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.error.should.equal("Please add a valid email");
        done();
      });
  });

  it("cannot register with no email", done => {
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ password: "password" })
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.error.should.equal("Please add an email");
        done();
      });
  });

  it("cannot create duplicates", done => {
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ email: "test@email.com", password: "password" })
      .end(() =>
        chai
          .request(app)
          .post("/api/auth/register")
          .send({ email: "test@email.com", password: "password" })
          .end((err, resTwo) => {
            should.exist(resTwo);
            resTwo.should.have.status(400);
            resTwo.body.should.be.a("object");
            resTwo.body.error.should.equal("Duplicate field value detected");
            done();
          })
      );
  });

  // Invalid password errs
  it("cannot register with no password", done => {
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ email: "test@email.com" })
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.error.should.equal("Please add a password");
        done();
      });
  });

  it("cannot register with password < 6 chars", done => {
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ email: "test@email.com", password: "pass" })
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.error.should.equal(
          "Password needs to be at least 6 characters"
        );
        done();
      });
  });
});
