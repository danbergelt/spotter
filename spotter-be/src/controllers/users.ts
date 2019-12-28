import { NextFunction, Response, Request } from "express";

const Err = require("../utils/Err");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const {
  refreshToken,
  genToken,
  clearRefreshToken
} = require("../utils/tokens");
const jwt = require("jsonwebtoken");
const redis = require("redis"),
  client = redis.createClient();

interface Req extends Request {
  user: { _id: string };
}

// @desc --> register user
// @route --> POST /api/auth/register
// @access --> Public

exports.register = asyncHandler(
  async (req: Req, res: Response, _: NextFunction) => {
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
      JSON.stringify({})
    );

    refreshToken(
      res,
      genToken(user._id, process.env.REF_SECRET, process.env.REF_EXPIRE)
    );

    sendToken(user, 201, res);
  }
);

// @desc --> login user
// @route --> POST /api/auth/login
// @access --> Public

exports.login = asyncHandler(
  async (req: Req, res: Response, next: NextFunction) => {
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

    refreshToken(
      res,
      genToken(user._id, process.env.REF_SECRET, process.env.REF_EXPIRE)
    );

    sendToken(user, 200, res);
  }
);

// @desc --> logout
// @route --> POST /api/auth/logout
// @access --> Public

exports.logout = asyncHandler(
  async (_: Req, res: Response, __: NextFunction) => {
    clearRefreshToken(res);

    return res.status(200).json({ success: true, data: "Logged out" });
  }
);

// @desc --> refresh token
// @route --> POST /api/auth/refresh
// @access --> Private

//@ts-ignore
exports.refresh = asyncHandler(async (req: Req, res: Response, next: NextFunction) => {
    const token = req.cookies.toll;

    if (!token) {
      return res.send({ success: false, token: null });
    }

    let payload;

    try {
      payload = jwt.verify(token, process.env.REF_SECRET);
    } catch (error) {
      return res.send({ success: false, token: null });
    }

    // refresh token is valid and we can send back new access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ success: false, token: null });
    }

    refreshToken(
      res,
      genToken(user._id, process.env.REF_SECRET, process.env.REF_EXPIRE)
    );

    sendToken(user, 200, res);
  }
);

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
