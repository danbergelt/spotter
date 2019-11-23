const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();

// Load models
const User = require("./models/User");
const Workout = require("./models/Workout");
const Tag = require("./models/Tag");

// Connect to DB
mongoose.connect(process.env.T_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/seeds/users.json`, "utf-8")
);

const workouts = JSON.parse(
  fs.readFileSync(`${__dirname}/seeds/workouts.json`, "utf-8")
);

// Seed
const seed = async () => {
  try {
    await User.create(users);
    await Workout.create(workouts);
    console.log("Data seeded".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Wipe
const wipe = async () => {
  try {
    await User.deleteMany();
    await Tag.deleteMany();
    await Workout.deleteMany();
    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-s") {
  seed();
} else if (process.argv[2] === "-w") {
  wipe();
}
