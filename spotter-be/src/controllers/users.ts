import Err from "../utils/Err";
import User from "../models/user";
import asyncHandler from "../middleware/async";
import { refreshToken, genToken, clearRefreshToken } from "../utils/tokens";
import * as jwt from "jsonwebtoken";
import * as redis from "redis";

const client = redis.createClient();

// @desc --> register user
// @route --> POST /api/auth/register
// @access --> Public

export const register = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  // create user
  const user = await User.create({
    email,
    password,
    role
  });

  // initialize PR cache for this user
  await client.hset(
    user._id.toString(),
    "stale",
    "false",
    "prs",
    //@ts-ignore
    JSON.stringify({})
  );

  refreshToken(
    res,
    genToken(user._id, process.env.REF_SECRET!, (process.env.REF_EXPIRE as any))
  );

  sendToken(user, 201, res);
});

// @desc --> login user
// @route --> POST /api/auth/login
// @access --> Public

export const login = asyncHandler(async (req, res, next) => {
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
  //@ts-ignore
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new Err("Invalid credentials", 401));
  }

  refreshToken(
    res,
    genToken(user._id, process.env.REF_SECRET!, (process.env.REF_EXPIRE as any))
  );

  sendToken(user, 200, res);
});

// @desc --> logout
// @route --> POST /api/auth/logout
// @access --> Public

export const logout = asyncHandler(async (_, res) => {
  clearRefreshToken(res);

  return res.status(200).json({ success: true, data: "Logged out" });
});

// @desc --> refresh token
// @route --> POST /api/auth/refresh
// @access --> Private

//@ts-ignore
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.toll;

  if (!token) {
    return res.send({ success: false, token: null });
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.REF_SECRET!);
  } catch (error) {
    return res.send({ success: false, token: null });
  }

  // refresh token is valid and we can send back new access token
  // @ts-ignore
  const user = await User.findOne({ id: payload.userId });

  if (!user) {
    return res.send({ success: false, token: null });
  }

  refreshToken(
    res,
    genToken(user._id, process.env.REF_SECRET!, (process.env.REF_EXPIRE as any))
  );

  sendToken(user, 200, res);
});

// Get token from model, send response
const sendToken = (user: any, statusCode: any, res: any) => {
  // Create token
  const token = user.getToken();

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_EXPIRE as any) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    (options as any).secure = true;
  }

  res.status(statusCode).json({ success: true, token, id: user._id });
};
