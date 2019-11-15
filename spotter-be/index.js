const express = require("express");
const users = require("./routes/users");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const { connectDB, connectTestDB } = require("./config/db");
const errorHandler = require("./middleware/error");
dotenv.config();

// Connect to DB and run server
if (process.env.NODE_ENV === "development") {
  connectTestDB();
}

if (process.env.NODE_ENV === "production") {
  connectDB();
}

const app = express();

// Dev logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", users);

// Error handling
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server started on port ${port} IN ${process.env.NODE_ENV} mode`)
);

// Unhandled rejection handling
process.on("unhandledRejection", () => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1));
});
