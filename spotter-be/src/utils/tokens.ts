import { Response } from "express";

const jwt = require("jsonwebtoken");

export const genToken = (id: string, sec: string, exp: number) => {
  return jwt.sign({ id }, sec, {
    expiresIn: exp
  });
};

export const refreshToken = (res: Response, token: string) => {
  res.cookie("toll", token, {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    expires: new Date(Number(new Date()) + 604800000)
  });
};

export const clearRefreshToken = (res: Response) => {
  res.cookie("toll", "", {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    expires: new Date(Date.now() * 0)
  });
};
