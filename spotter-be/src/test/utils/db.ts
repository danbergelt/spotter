import mongoose, { Model } from "mongoose";
require("dotenv").config();
import redis from "redis";
import { promisify } from "util";
const client: redis.RedisClient = redis.createClient();
const flush = promisify(client.flushall).bind(client);

// ES6 Promises (for mocking purposes)

export const dbHelper = async (Collection: Model<any>) => {
  mongoose.Promise = global.Promise;

  mongoose.connect(process.env.T_DB!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  mongoose.connection
    // .once('open', () => console.log('Connected!'.blue))
    .on("error", error => {
      console.warn(`Error: ${error}`);
    });
  
  await mongoose.connection.dropDatabase()

  beforeEach(async () => {
    await Collection.deleteMany({});
  });
  afterEach(async () => {
    await flush();
  });
};
