const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  color: {
    type: String,
    required: [true, "Please add a tag color"]
  },
  content: {
    type: String,
    maxlength: [20, "20 character max"]
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  }
});

module.exports = mongoose.model("Tag", TagSchema);
