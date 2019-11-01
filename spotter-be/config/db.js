const mongoose = require('mongoose')

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`DB Connected: ${conn.connection.host}`);
}

module.exports = connectDB;