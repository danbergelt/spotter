const app = require("../../../utils/index");
import { describe, it } from "mocha";
import User from "../../../../models/user";
import chaiHttp from "chai-http";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
//@ts-ignore
const should = chai.should();
import { dbHelper } from "../../../utils/db";
import redis from "redis";
import { promisify } from "util";
const client: redis.RedisClient = redis.createClient();
const hget = promisify(client.hgetall).bind(client);

// configure Chai HTTP
chai.use(chaiHttp);

describe("delete account", () => {

  dbHelper(User)

  it("should successfully delete account", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/register")
      .send({ email: "test@email.com", password: "password" });
    
    const cache = await(hget(res.body.id))

    cache.should.be.ok

    const res2 = await chai.request(app).delete("/api/auth/user/delete").set("Authorization", `Bearer ${res.body.token}`)

    res2.body.success.should.be.ok

    const empt = await(hget(res.body.id))

    chai.expect(empt).to.not.be.ok
  });
});
