const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/user");

const app = express();

// middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Connect to DB
const db = require("./config/keys").mongoURI;

mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

// Passport initialization + config implementation
app.use(passport.initialize());

require("./config/passport")(passport);

// Routes
app.use("/api", users);

const port = process.env.PORT || 1234;

app.listen(port, () => console.log(`Server started on port ${port}`));
