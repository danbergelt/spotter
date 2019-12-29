import { Request, Response, NextFunction } from "express";

const asyncHandler = (
  fn: (A: Request, B: Response, C: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
