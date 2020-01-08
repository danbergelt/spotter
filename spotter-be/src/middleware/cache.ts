import asyncHandler from "./async";
import Exercise from "../models/Exercise";
import { promisify } from "util";
import redis from "redis";
import { IExercise } from "src/types/models";
import { IPr } from "src/types/cache";

const client: redis.RedisClient = redis.createClient();

interface ICache {
  stale: string;
  prs: string;
}

export const prCache = asyncHandler(async (req, res, next) => {
  // before generating PRs manually, check to see if cache is stale
  const hgetall: Function = promisify(client.hgetall).bind(client);

  const cache: ICache = await hgetall(req.user!._id.toString());

  // if the user has a cache and the cache is not marked as stale, use that as the return object
  if (cache?.stale === "false") {
    res.status(200).json({
      success: true,
      prs: JSON.parse(cache.prs)
    });
  } else {
    next();
  }
});

export const delExerciseFromCache = asyncHandler(async (req, res, next) => {
  // Passing as middleware otherwise automated error handling is not recognized due to closure
  const hset: Function = promisify(client.hset).bind(client);
  const hgetall: Function = promisify(client.hgetall).bind(client);

  const cache: ICache = await hgetall(req.user._id.toString());

  // 1. if this user has a cache, parse their prs string into an object
  // 2. find the deleted exercise by the parameter passed by the client
  // 3. if an exercise is found, delete that exercise by key from the object
  // 4. update the user's PR cache, and resume with deletion
  if (cache) {
    const prs: IPr = JSON.parse(cache.prs);
    const exercise: IExercise | null = await Exercise.findById(req.params.id);
    if (exercise) delete prs[exercise.name];
    await hset(req.user._id.toString(), "prs", JSON.stringify(prs));
    await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: "Exercise deleted"
    });
  } else {
    next();
  }
});
