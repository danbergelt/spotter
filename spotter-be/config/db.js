const mongoose = require("mongoose");

// connects to DB + test DB for

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`DB Connected: ${conn.connection.host}`.cyan.bold.underline);
};

const connectTestDB = async () => {
  const conn = await mongoose.connect(process.env.T_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`TEST DB Connected: ${conn.connection.host}`.magenta.bold.underline);
};

module.exports = { connectDB, connectTestDB };
