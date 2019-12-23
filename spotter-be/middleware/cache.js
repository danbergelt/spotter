const asyncHandler = require("./async");
const Exercise = require("../models/Exercise");
const { promisify } = require("util");
const redis = require("redis"),
  client = redis.createClient();

exports.prCache = asyncHandler(async (req, res, next) => {
  // before generating PRs manually, check to see if cache is stale
  const hgetall = promisify(client.hgetall).bind(client);

  const cache = await hgetall(req.user._id.toString());

  if (cache && cache.stale === "false") {
    console.log("fetching")
    res.status(200).json({
      success: true,
      prs: JSON.parse(cache.prs)
    });
  } else {
    next();
  }
});

exports.delExerciseFromCache = asyncHandler(async (req, res, next) => {
  // FOR TESTING PURPOSES
  // Need to pass as middleware otherwise automated error handling is not recognized at the callback level
  const hset = promisify(client.hset).bind(client);
  const hgetall = promisify(client.hgetall).bind(client);

  const cache = await hgetall(req.user._id.toString());

  if (cache) {
    const prs = JSON.parse(cache.prs);
    const exercise = await Exercise.findById(req.params.id);
    delete prs[exercise.name];
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
