const app = require("../../utils/index");
const chaiHttp = require("chai-http");
const chai = require("chai");
const should = chai.should();

// configure Chai HTTP
chai.use(chaiHttp);

describe("logout functionality", () => {
  it("should logout user and send proper message", done => {
    chai
      .request(app)
      .get("/api/auth/logout")
      .set("Cookie", "toll=cookie")
      .end((err, res) => {
        should.exist(res)
        chai.expect(res).to.have.cookie("toll")
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.data.should.equal("Logged out")
        done()
      });
  });
});
