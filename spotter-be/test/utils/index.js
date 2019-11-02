const express = require("express");
const users = require("../../routes/users");
const dotenv = require("dotenv");
const User = require('../../models/User');
const errorHandler = require("../../middleware/error");
dotenv.config();

// Connect to DB and run server
const app = express();

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", users);

// Error handling
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// Unhandled rejection handling
process.on("unhandledRejection", () => {
  server.close(() => process.exit(1));
});

module.exports = app;