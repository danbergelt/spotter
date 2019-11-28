const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { connectDB, connectTestDB } = require("./config/db");
const errorHandler = require("./middleware/error");
dotenv.config();

// Route imports
const users = require("./routes/users");
const workouts = require("./routes/workouts");
const tags = require("./routes/tags");
const templates = require("./routes/templates");

// Connect to DB and run server
if (process.env.NODE_ENV === "development") {
  connectTestDB();
}

if (process.env.NODE_ENV === "production") {
  connectDB();
}

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Cookie parser
app.use(cookieParser());

// Dev logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", users);
app.use("/api/auth/workouts", workouts);
app.use("/api/auth/tags", tags);
app.use("/api/auth/templates", templates);

// Error handling
app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server started on port ${port} IN ${process.env.NODE_ENV} mode`)
);

// Unhandled rejection handling
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
