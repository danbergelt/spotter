const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { genToken } = require("../utils/tokens");
const Schema = mongoose.Schema;

// User model
const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please add an email"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password needs to be at least 6 characters"],
    select: false
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password on save
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign token and return
UserSchema.methods.getToken = function() {
  return genToken(this._id, process.env.JWT_SECRET, process.env.JWT_EXPIRE);
};

// Match password on login
UserSchema.methods.matchPassword = async function(pw) {
  return await bcrypt.compare(pw, this.password);
};

module.exports = User = mongoose.model("users", UserSchema);
