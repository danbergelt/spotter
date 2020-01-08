import jwt from "jsonwebtoken";
import asyncHandler from "./async";
import Err from "../utils/Err";
import User from "../models/user";
import { IUser } from "src/types/models";
import { IVerifiedToken } from "src/types/auth";

// Protect routes
export const protect = asyncHandler(async (req, _, next) => {
  let token: string | null = null;

  if (req.headers.authorization?.startsWith("Bearer")) {
    // set token from bearer
    token = req.headers.authorization.split(" ")[1];
  }

  // Check token exists
  if (!token) {
    return next(new Err("Access denied", 401));
  }

  try {
    // verify token
    const decoded: string | object = jwt.verify(token, process.env.JWT_SECRET!);

    const u: IUser | null = await User.findById((decoded as IVerifiedToken).id);

    if (u !== null) {
      req.user = u;
    }

    next();
  } catch (err) {
    return next(new Err("Connection lost, try refreshing", 401));
  }
});
