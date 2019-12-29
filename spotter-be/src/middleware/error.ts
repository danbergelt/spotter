import { Response, Request, NextFunction } from "express";
import Err from "../utils/Err";

interface NodeError extends Error {
  code: number;
  message: string;
  errors: Array<{ message: string }>;
  statusCode: number;
}

const errorHandler = (
  err: NodeError,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  let error: NodeError = { ...err };
  error.message = err.message;

  // Mongoose bad Object ID
  if (err.name === "CastError") {
    const message: string = "Resource not found";
    //@ts-ignore
    error = new Err(message, 404);
  }

  // Dup field
  if (err.code === 11000) {
    const message: string = "Duplicate detected, try again";
    //@ts-ignore
    error = new Err(message, 400);
  }

  // Validation err
  if (err.name === "ValidationError") {
    const message: string | Array<any> = Object.values(err.errors).map(
      val => val.message
    );
    //@ts-ignore
    error = new Err(message, 400);
  }

  // Misc.

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error"
  });
};

export default errorHandler;
