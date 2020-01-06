import mongoose, { Model } from "mongoose";
require("dotenv").config();

export const dbHelper = async (Collection: Model<any>) => {
  mongoose.Promise = global.Promise;

  await mongoose.connect(process.env.T_DB!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  mongoose.connection.on("error", error => {
    console.warn(`Err: ${error}`)
  })

  beforeEach(async () => {
    await Collection.deleteMany({});
  });
};
