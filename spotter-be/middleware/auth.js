const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const Err = require("../utils/Err");
const User = require("../models/User");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from bearer
    token = req.headers.authorization.split(" ")[1];
  }

  // Check token exists
  if (!token) {
    return next(new Err("Access denied", 401));
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new Err("Access denied", 401));
  }
});
