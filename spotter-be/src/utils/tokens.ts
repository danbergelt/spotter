import { Response } from "express";
import * as jwt from "jsonwebtoken";

export const genToken = (id: string, sec: string, exp: string) => {
  return jwt.sign({ id }, sec, {
    expiresIn: exp
  });
};

export const refreshToken = (res: Response, token: string) => {
  return res.cookie("toll", token, {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    expires: new Date(Number(new Date()) + 604800000)
  });
};

export const clearRefreshToken = (res: Response) => {
  return res.cookie("toll", "", {
    httpOnly: process.env.NODE_ENV === "development" ? false : true,
    expires: new Date(Date.now() * 0)
  });
};
