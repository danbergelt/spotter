declare module "dotenv";
declare module "is-hexcolor";
declare namespace Express {
  export interface Request {
    user: { _id: string };
  }
}
