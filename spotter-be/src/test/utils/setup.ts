import mongoose from 'mongoose';
require('dotenv').config();
before(async () => {
  mongoose.Promise = global.Promise;

  await mongoose.connect(process.env.T_DB!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  mongoose.connection.on('error', error => console.warn(error));
});
