import Err from "../utils/Err";
import User from "../models/user";
import asyncHandler from "../middleware/async";
import { refreshToken, genToken, clearRefreshToken } from "../utils/tokens";
import jwt from "jsonwebtoken";
import redis from "redis";
import { IUser } from "src/types/models";
import { promisify } from "util";
import { Response } from "express";
import { IVerifiedToken } from "../types/auth";

const client: redis.RedisClient = redis.createClient();

interface UserDetails {
  email: string;
  password: string;
  role: string;
}

// @desc --> register user
// @route --> POST /api/auth/register
// @access --> Public

export const register = asyncHandler(async (req, res) => {
  const { email, password, role }: UserDetails = req.body;

  // create user
  const user: IUser = await User.create({
    email,
    password,
    role
  });

  const hset: Function = promisify(client.hset).bind(client);

  // initialize PR cache for this user
  await hset(user._id.toString(), "stale", "false", "prs", JSON.stringify({}));

  refreshToken(
    res,
    genToken(user._id, process.env.REF_SECRET!, process.env.REF_EXPIRE!)
  );

  sendToken(user, 201, res);
});

// @desc --> login user
// @route --> POST /api/auth/login
// @access --> Public

export const login = asyncHandler(async (req, res, next) => {
  const { email, password }: Partial<UserDetails> = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new Err("Please provide an email and password", 400));
  }

  // Check for user
  const user: IUser | null = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Err("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch: boolean = await user.matchPassword(password);

  if (!isMatch) {
    return next(new Err("Invalid credentials", 401));
  }

  refreshToken(
    res,
    genToken(user._id, process.env.REF_SECRET!, process.env.REF_EXPIRE!)
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

export const refresh = asyncHandler(async (req, res) => {
  const token: string | null = req.cookies.toll;

  if (!token) {
    return res.send({ success: false, token: null });
  }

  let payload: string | object;

  try {
    payload = jwt.verify(token, process.env.REF_SECRET!);
  } catch (_) {
    return res.send({ success: false, token: null });
  }

  // refresh token is valid and we can send back new access token
  const user: IUser | null = await User.findOne({
    _id: (payload as IVerifiedToken).id
  });

  if (!user) {
    return res.send({ success: false, token: null });
  }

  refreshToken(
    res,
    genToken(user._id, process.env.REF_SECRET!, process.env.REF_EXPIRE as any)
  );

  return sendToken(user, 200, res);
});

// Get token from model, send response
const sendToken = (user: IUser, statusCode: number, res: Response): void => {
  // Create token
  const token: string = user.getToken();

  const options: { expires: Date; httpOnly: boolean; secure?: boolean } = {
    expires: new Date(
      Date.now() + (process.env.JWT_EXPIRE as any) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).json({ success: true, token, id: user._id });
};
