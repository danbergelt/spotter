import express, { Express } from "express";
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
import { Server } from "http";

// Connect to DB and run server
if (process.env.NODE_ENV === "development") {
  connectTestDB();
}

if (process.env.NODE_ENV === "production") {
  connectDB();
}

const app: Express = express();

// CORS

const whitelist: Array<string> = ["http://localhost:3000"];
app.use(
  cors({
    origin: (origin, res) => {
      if (whitelist.indexOf(origin!) !== -1) {
        res(null, true);
      } else {
        res(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// Cookie parser
app.use(
  [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/user/forgotPassword/:id",
    "/api/auth/logout",
    "/api/auth/refresh"
  ],
  cookieParser()
);

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

const port: number = Number(process.env.PORT) || 5000;

const server: Server = app.listen(port, () =>
  console.log(`Server started on port ${port} IN ${process.env.NODE_ENV} mode`)
);

// Unhandled rejection handling

const handleRejectedPromise = function(
  reason: any,
  promise: Promise<any>
): void {
  console.log("Unexpected exception occured.", { reason, ex: promise });

  server.close(() => process.exit(1));
};

process.on("unhandledRejection", handleRejectedPromise);
