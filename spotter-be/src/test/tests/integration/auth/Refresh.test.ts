import { describe} from "mocha";
import User from "../../../../models/user";
import chaiHttp from "chai-http";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
//@ts-ignore
const should = chai.should();
import { dbHelper } from "../../../utils/db";

// configure Chai HTTP
chai.use(chaiHttp);

describe("refresh functionality", () => {
  dbHelper(User);

  // HAVING ISSUES WITH THIS TEST, WILL RETURN LATER

  // it("should send a new access token and refresh cookie", done => {
  //   const agent = chai.request.agent(app);

  //   agent
  //     .post("/api/auth/register")
  //     .send({ email: "email@email.com", password: "mypassword" })
  //     .end((err, res) => {
  //       chai.expect(res).to.have.cookie("toll");
  //       return agent
  //         .get("/api/auth/refresh")
  //         .set("Authorization", `Bearer ${res.body.token}`)
  //         .end((err, res) => {
  //           console.log(res)
  //         });
  //     });
  // });
});
