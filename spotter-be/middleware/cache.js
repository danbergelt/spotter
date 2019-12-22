const asyncHandler = require("./async");
const Exercise = require("../models/Exercise");
const redis = require("redis"),
  client = redis.createClient();

exports.prCache = asyncHandler(async (req, res, next) => {
  // before generating PRs manually, check to see if cache is stale
  await client.hgetall(req.user._id.toString(), async (err, cache) => {
    if (err) throw err;

    // if the cache isn't stale, return the cached PRs
    if (cache && cache.stale === "false") {
      res.status(200).json({
        success: true,
        prs: JSON.parse(cache.prs)
      });
    } else {
      next();
    }
  });
});

exports.delExerciseFromCache = asyncHandler(async (req, res, next) => {
  // FOR TESTING PURPOSES
  // Need to pass as middleware otherwise automated error handling is not recognized at the callback level
  await client.hgetall(req.user._id.toString(), async (err, cache) => {
    if (cache) {
      const prs = JSON.parse(cache.prs);
      const exercise = await Exercise.findById(req.params.id);
      delete prs[exercise.name];
      // update PR cache
      await client.hset(req.user._id.toString(), "prs", JSON.stringify(prs));
      await Exercise.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        data: "Exercise deleted"
      });
    } else {
      next();
    }
  });
});
