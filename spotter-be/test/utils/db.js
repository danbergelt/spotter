const mongoose = require("mongoose");
require("dotenv").config();

// ES6 Promises (for mocking purposes)

exports.dbHelper = Collection => {
  mongoose.Promise = global.Promise;

  mongoose.connect(
  process.env.T_DB,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );

  mongoose.connection
    // .once('open', () => console.log('Connected!'))
    .on("error", error => {
      console.warn(`Error: ${error}`);
    });

  beforeEach(async () => {
    await Collection.deleteMany();
  });
};
