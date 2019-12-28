import Err from "../utils/Err";
import User from "../models/user";
import * as bcrypt from "bcryptjs";
import asyncHandler from "../middleware/async";

// @desc --> change password
// @route --> PUT /api/auth/user/password
// @access --> Private

export const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new Err("All fields are required", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new Err("New password fields must match", 400));
  }

  // Check for user
  const user = await User.findById((req as any).user._id).select("+password");

  if (!user) {
    return next(new Err("User not found", 401));
  }

  // Check if password matches
  //@ts-ignore
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
