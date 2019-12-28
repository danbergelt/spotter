import * as jwt from "jsonwebtoken";
import asyncHandler from "./async";
import Err from "../utils/Err";
import User from "../models/user";

// Protect routes
export const protect = asyncHandler(async (req, _, next) => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const u = await User.findById((decoded as any).id);

    if (u !== null) {
      req.user = u;
    }
    
    next();
  } catch (err) {
    return next(new Err("Connection lost, try refreshing", 401));
  }
});
