import { Model } from "mongoose";
require("dotenv").config();

export const dbHelper = async (Collection: Model<any>) => {
  beforeEach(async () => {
    await Collection.deleteMany({});
  });
};
