import mongoose from "mongoose";
before(async() => {
  mongoose.Promise = global.Promise;

  console.log("fwofow")

  await mongoose.connect(process.env.T_DB!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  mongoose.connection.on("error", error => console.warn(error))
})