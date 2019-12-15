const Err = require("../utils/Err");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../middleware/async");

// @desc --> change password
// @route --> PUT /api/auth/user/password
// @access --> Private

exports.changePassword = asyncHandler(async (req, res, next) => {

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new Err("All fields are required", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new Err("New password fields must match", 400));
  }

  // Check for user
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new Err("User not found", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(oldPassword);

  if (!isMatch) {
    return next(new Err("Invalid credentials", 400));
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(newPassword, salt);

  await User.findByIdAndUpdate(
    req.user._id,
    {
      password: hashedPassword
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: "Password updated"
  });
});
