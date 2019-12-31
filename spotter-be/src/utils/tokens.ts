import { Response } from "express";
import jwt from "jsonwebtoken";

// generate a token on demand
export const genToken = (id: string, sec: string, exp: string): string => {
  return jwt.sign({ id }, sec, {
    expiresIn: exp
  });
};

// generate a refresh token on demand
export const refreshToken = (res: Response, token: string): Response => {
  return res.cookie("toll", token, {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    expires: new Date(Number(new Date()) + 604800000)
  });
};

// generate a dead refresh token when the user logs out
export const clearRefreshToken = (res: Response): Response => {
  return res.cookie("toll", "", {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    expires: new Date(Date.now() * 0)
  });
};
