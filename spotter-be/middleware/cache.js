const asyncHandler = require("./async");
const redis = require("redis"),
  client = redis.createClient();

exports.prCache = asyncHandler(async (req, res, next) => {
  // before generating PRs manually, check to see if previous PR generation is stale
  await client.hgetall(req.user._id.toString(), async (err, cache) => {
    if (err) throw err;

    // if the cache isn't stale, return the cached PRs
    if (cache.stale === "false") {
      res.status(200).json({
        success: true,
        prs: JSON.parse(cache.prs)
      });
    } else {
      next();
    }
  });
});
