import Err from "../utils/Err";
import User from "../models/user";
import bcrypt from "bcryptjs";
import asyncHandler from "../middleware/async";
import { IUser } from "../types/models";
import { sendMail, forgotPasswordTemplate } from "../utils/sendMail";

type TUserDetailKeys =
  | "oldEmail"
  | "newEmail"
  | "confirmEmail"
  | "oldPassword"
  | "newPassword"
  | "confirmPassword";

type TUserDetails = Record<TUserDetailKeys, string>;

// @desc --> change password
// @route --> PUT /api/auth/user/password
// @access --> Private

export const changeEmail = asyncHandler(async (req, res, next) => {
  const { oldEmail, newEmail, confirmEmail }: TUserDetails = req.body;

  // confirm that all fields are present
  if (!oldEmail || !newEmail || !confirmEmail) {
    return next(new Err("All fields are required", 400));
  }

  // confirm that the user confirmed their new email and that the two fields match
  if (newEmail !== confirmEmail) {
    return next(new Err("New email fields must match", 400));
  }

  const user: IUser | null = await User.findById(req.user._id);

  // confirm that the old email field matches the email on record
  if (oldEmail !== user!.email) {
    return next(new Err("Invalid credentials", 400));
  }

  // update the user's email
  await User.findByIdAndUpdate(
    req.user._id,
    { email: confirmEmail },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: "Email updated"
  });
});

// @desc --> change password
// @route --> PUT /api/auth/user/password
// @access --> Private

export const changePassword = asyncHandler(async (req, res, next) => {
  // extract the user's input data
  const { oldPassword, newPassword, confirmPassword }: TUserDetails = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new Err("All fields are required", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new Err("New password fields must match", 400));
  }

  // Check for user
  const user: IUser | null = await User.findById(req.user._id).select(
    "+password"
  );

  // Check if password matches
  const isMatch: boolean = await user!.matchPassword(oldPassword);

  if (!isMatch) {
    return next(new Err("Invalid credentials", 400));
  }

  // hash the new password
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(newPassword, salt);

  await User.findByIdAndUpdate(
    req.user._id,
    {
      password: hashedPassword
    },
    { new: true }
  );

  // return a success message after the user is updated
  res.status(200).json({
    success: true,
    data: "Password updated"
  });
});

// @desc --> delete account
// @route --> DELETE /api/auth/user/delete
// @access --> Private

export const deleteAccount = asyncHandler(async (req, res) => {
  const user: IUser | null = await User.findById(req.user._id);

  // was not able to implement pre-hooks with deleteOne, so opting for remove() instead
  if (user) {
    await user.remove();
  }

  return res.status(200).json({
    success: true
  });
});

// @desc --> forgot password
// @route --> POST /api/auth/user/forgotpassword
// @access --> Public

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Err("No user found with that email", 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // create reset url
  const resetUrl: string =
    process.env.NODE_ENV === "production"
      ? `https://www.getspotter.io/-/${resetToken}`
      : `http://localhost:3000/-/${resetToken}`;

  try {
    // send the message via Mailgun
    await sendMail(
      req.body.email,
      "Spotter | Forgot Password",
      forgotPasswordTemplate(resetUrl)
    );
    // if successful, return an object with the user
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    // clear the reset field items on this user's document
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    // save the user, return an error message
    await user.save({ validateBeforeSave: false });
    return next(new Err("Email could not be sent", 500));
  }
});
