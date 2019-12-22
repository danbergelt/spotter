const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const User = require("../../models/User");
const errorHandler = require("../../middleware/error");
dotenv.config();

// Route imports
const users = require("../../routes/users");
const workouts = require("../../routes/workouts");
const tags = require("../../routes/tags");
const templates = require("../../routes/templates");
const auth = require("../../routes/auth");
const exercises = require("../../routes/exercises");
const prs = require("../../routes/prs");

// Connect to DB and run server
const app = express();

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
  console.log(`Server ${`FOR TESTING`.yellow.inverse} started on port ${port}`)
);

// Unhandled rejection handling
process.on("unhandledRejection", () => {
  server.close(() => process.exit(1));
});

module.exports = app;
