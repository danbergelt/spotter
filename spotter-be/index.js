const express = require("express");
const mongoose = require("mongoose");
require('dotenv/config')

const app = express();
const port = process.env.port || 1234;

// import routes
const userRoutes = require('./routes/user');

// middleware

app.use(express.json());
app.use('/user', userRoutes);

// Connect to DB

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB!")
);

app.listen(port);
