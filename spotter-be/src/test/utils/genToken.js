const jwt = require("jsonwebtoken");

exports.genToken = user =>
  jwt.sign({ id: user }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
