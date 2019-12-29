import { Request, Response, NextFunction } from "express";

interface Req extends Request {
  user: { _id: string };
}

const asyncHandler = (
  fn: (A: Req, B: Response, C: NextFunction) => Promise<any>
) => (req: Req, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
