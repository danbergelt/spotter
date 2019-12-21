const asyncHandler = require("./async");
const redis = require("redis"),
  client = redis.createClient();

exports.prCache = asyncHandler(async (req, res, next) => {
  await client.hgetall(req.user._id.toString(), async (err, cache) => {
    if (err) throw err;

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
