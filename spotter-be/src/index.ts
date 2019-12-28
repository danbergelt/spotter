import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB, connectTestDB } from "./config/db";
import errorHandler from "./middleware/error";
dotenv.config();

// Route imports
import users from "./routes/users";
import workouts from "./routes/workouts";
import tags from "./routes/tags";
import templates from "./routes/templates";
import auth from "./routes/auth";
import exercises from "./routes/exercises";
import prs from "./routes/prs";

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
app.use("/api/auth/user", auth);
app.use("/api/auth/exercises", exercises);
app.use("/api/auth/prs", prs);

// Error handling
app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server started on port ${port} IN ${process.env.NODE_ENV} mode`)
);

// Unhandled rejection handling

const handleRejectedPromise = function(
  reason: any,
  promise: Promise<any>
): void {
  console.log("Unexpected exception occured.", { reason, ex: promise });

  server.close(() => process.exit(1))
};

process.on("unhandledRejection", handleRejectedPromise);
