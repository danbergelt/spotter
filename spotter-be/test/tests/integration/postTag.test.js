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

describe("POST tag by user id", () => {
  dbHelper(Tag);

  let uId;

  // create test user
  beforeEach(async () => {
    const { _id } = await createUser();
    uId = _id;
    return uId;
  });

  it("should post tag", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .post("/api/auth/tags")
      .set("Authorization", `Bearer ${token}`)
      .send({ color: "red", content: "test", user: uId })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(true);
        res.should.have.status(201);
        res.body.tag.color.should.equal("red");
        res.body.tag.content.should.equal("test");
        res.body.tag.user.should.equal(String(uId));
        done();
      });
  });

  it("should not post tag with bad token", done => {
    chai
      .request(app)
      .post("/api/auth/tags")
      .set("Authorization", `Bearer token`)
      .send({ color: "red", content: "test", user: uId })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should not post tag with no token", done => {
    chai
      .request(app)
      .post("/api/auth/tags")
      .send({ color: "red", content: "test", user: uId })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(401);
        res.body.error.should.equal("Access denied");
        done();
      });
  });

  it("should not post tag with undefined color", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .post("/api/auth/tags")
      .set("Authorization", `Bearer ${token}`)
      .send({ color: "", content: "test", user: uId })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("Please add a tag color");
        done();
      });
  });

  it("should not post tag with long content", done => {
    const token = genToken(uId);
    chai
      .request(app)
      .post("/api/auth/tags")
      .set("Authorization", `Bearer ${token}`)
      .send({
        color: "red",
        content: "testjiojiojiojiojiojiojiojiojiojiojioj",
        user: uId
      })
      .end((err, res) => {
        should.exist(res);
        res.body.success.should.equal(false);
        res.should.have.status(400);
        res.body.error.should.equal("20 character max");
        done();
      });
  });

  describe("wrapper for testing custom duplicates check (no content)", () => {
    beforeEach(async () => {
      dbHelper(Tag);
      await Tag.create({ color: "red", user: uId });
    });

    it("should not post duplicate tag (no content)", done => {
      const token = genToken(uId);
      chai
        .request(app)
        .post("/api/auth/tags")
        .set("Authorization", `Bearer ${token}`)
        .send({ color: "red", user: uId })
        .end((err, res) => {
          should.exist(res);
          res.body.success.should.equal(false);
          res.should.have.status(400);
          res.body.error.should.equal("Tag already exists");
          done();
        });
    });

    it("can post tag with duplicate color and different content", done => {
      const token = genToken(uId);
      chai
        .request(app)
        .post("/api/auth/tags")
        .set("Authorization", `Bearer ${token}`)
        .send({ color: "red", content: "test", user: uId })
        .end((err, res) => {
          should.exist(res);
          res.body.success.should.equal(true);
          res.should.have.status(201);
          res.body.tag.user.should.equal(String(uId));
          done();
        });
    });
  });

  describe("wrapper for testing custom duplicates check (with content)", () => {
    beforeEach(async () => {
      dbHelper(Tag);
      await Tag.create({ color: "red", content: "test", user: uId });
    });

    it("should not post duplicate tag (with content)", done => {
      const token = genToken(uId);
      chai
        .request(app)
        .post("/api/auth/tags")
        .set("Authorization", `Bearer ${token}`)
        .send({ color: "red", content: "test", user: uId })
        .end((err, res) => {
          should.exist(res);
          res.body.success.should.equal(false);
          res.should.have.status(400);
          res.body.error.should.equal("Tag already exists");
          done();
        });
    });

    it("can post tag with duplicate color and different content", done => {
      const token = genToken(uId);
      chai
        .request(app)
        .post("/api/auth/tags")
        .set("Authorization", `Bearer ${token}`)
        .send({ color: "red", content: "test2", user: uId })
        .end((err, res) => {
          should.exist(res);
          res.body.success.should.equal(true);
          res.should.have.status(201);
          res.body.tag.user.should.equal(String(uId));
          done();
        });
    });

    it("can post tag with duplicate color and no content", done => {
      const token = genToken(uId);
      chai
        .request(app)
        .post("/api/auth/tags")
        .set("Authorization", `Bearer ${token}`)
        .send({ color: "red", user: uId })
        .end((err, res) => {
          should.exist(res);
          res.body.success.should.equal(true);
          res.should.have.status(201);
          res.body.tag.user.should.equal(String(uId));
          done();
        });
    });

    it("can post tag with different color and duplicate content", done => {
      const token = genToken(uId);
      chai
        .request(app)
        .post("/api/auth/tags")
        .set("Authorization", `Bearer ${token}`)
        .send({ color: "blue", content: "test", user: uId })
        .end((err, res) => {
          should.exist(res);
          res.body.success.should.equal(true);
          res.should.have.status(201);
          res.body.tag.user.should.equal(String(uId));
          done();
        });
    });
  });

  describe("wrapper for testing collection size max", () => {
    // push 25 tags into collection (max size)
    beforeEach(async () => {
      const insert = [];
      for (let i = 0; i < 25; i++) {
        insert.push({ color: "red", content: `${i}`, user: uId });
      }
      await Tag.insertMany(insert);
    });

    it("should not post tag when 25 tags already exist", done => {
      const token = genToken(uId);
      chai
        .request(app)
        .post("/api/auth/tags")
        .set("Authorization", `Bearer ${token}`)
        .send({ color: "red", content: "test", user: uId })
        .end((err, res) => {
          should.exist(res);
          res.body.success.should.equal(false);
          res.should.have.status(400);
          res.body.error.should.equal("Too many tags, delete one to make room");
          done();
        });
    });
  });
});
