import mongoose from "mongoose";

// connects to DB + test DB for

// mongoose typing is wrong - need to extend the interface in order to get access to the host property
interface MongooseConnection extends mongoose.Connection {
  host: string;
}

export const connectDB: () => Promise<void> = async () => {
  let conn: typeof mongoose = await mongoose.connect(process.env.DB!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`DB Connected: ${(conn.connection as MongooseConnection).host}`);
};

export const connectTestDB: () => Promise<void> = async () => {
  const conn: typeof mongoose = await mongoose.connect(process.env.T_DB!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(
    `TEST DB Connected: ${(conn.connection as MongooseConnection).host}`
  );
};