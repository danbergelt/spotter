const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User model
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = User = mongoose.model("users", UserSchema);