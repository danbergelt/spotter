import { Request, Response, NextFunction } from "express";


// wrapper that abstracts try/catch blocks
// is there a way I can implement this on the FE?


const asyncHandler = (
  fn: (A: Request, B: Response, C: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
