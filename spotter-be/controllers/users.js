const Err = require("../utils/Err");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");

// @desc --> register user
// @route --> POST /api/auth/register
// @access --> Public

exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  // create user
  const user = await User.create({
    email,
    password,
    role
  });

  sendToken(user, 201, res);
});

// @desc --> login user
// @route --> POST /api/auth/login
// @access --> Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new Err("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Err("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new Err("Invalid credentials", 401));
  }

  sendToken(user, 200, res);
});

// Get token from model, send response
const sendToken = (user, statusCode, res) => {
  // Create token
  const token = user.getToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).json({success: true, token})
};
