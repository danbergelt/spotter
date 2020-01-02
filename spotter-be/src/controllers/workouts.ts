import Workout from "../models/Workout";
import asyncHandler from "../middleware/async";
import Err from "../utils/Err";
import { promisify } from "util";
const hex = require("is-hexcolor");
const stringify = require("csv-stringify");
import fs from "fs";
import path from "path";
import redis from "redis";
import { IWorkout, ITag } from "src/types/models";

const client: redis.RedisClient = redis.createClient();

// @desc --> get all workouts by user id
// @route --> GET /api/auth/workouts
// @access --> Private

export const getWorkoutsByUserId = asyncHandler(async (req, res) => {
  const pagination: { page: number; limit: number } = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
  };

  const workouts: Array<IWorkout> = await Workout.find({ user: req.user._id })
    .skip(pagination.page * pagination.limit)
    .limit(pagination.limit);

  return res
    .status(200)
    .json({ success: true, count: workouts.length, workouts });
});

// @desc --> get time sorted list of workouts by user id
// @route --> GET /api/auth/workouts/range
// @access --> Private

export const workoutRangeByUserId = asyncHandler(async (req, res, next) => {
  if (!req.body.range) {
    return next(new Err("Please supply a date range", 400));
  }

  const workouts: Array<IWorkout> = await Workout.find({
    user: req.user._id,
    date: { $in: req.body.range }
  }).sort({ date: 1 });

  return res
    .status(200)
    .json({ success: true, count: workouts.length, workouts });
});

// @desc --> add workout
// @route --> POST /api/auth/workouts
// @access --> Private

export const addWorkout = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  let colorValidate: Array<ITag | false> = [];

  if (req.body.tags && req.body.tags.length) {
    colorValidate = req.body.tags.map((el: ITag) => hex(el.color));
  }

  if (colorValidate.includes(false)) {
    return next(new Err("Invalid color detected", 400));
  }

  const workout: IWorkout = await Workout.create(req.body);

  const hset: Function = promisify(client.hset).bind(client);
  await hset(req.user._id.toString(), "stale", "true");

  return res.status(201).json({
    success: true,
    data: workout
  });
});

// @desc --> edit workout
// @route --> PUT /api/auth/workouts/:id
// @access --> Private

export const editWorkout = asyncHandler(async (req, res) => {
  let workout: IWorkout | null = await Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  const hset: Function = promisify(client.hset).bind(client);
  await hset(req.user._id.toString(), "stale", "true");

  return res.status(200).json({
    success: true,
    data: workout
  });
});

// @desc --> delete workout
// @route --> DELETE /api/auth/workouts/:id
// @access --> Private

export const deleteWorkout = asyncHandler(async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);

  const hset: Function = promisify(client.hset).bind(client);
  await hset(req.user._id.toString(), "stale", "true");

  return res.status(200).json({
    success: true,
    data: "Workout deleted"
  });
});

// @desc --> download workout data as a CSV
// @route --> DELETE /api/auth/workouts/download
// @access --> Private

export const downloadWorkoutData = asyncHandler(async (req, res, next) => {
  // fetch all workouts by the user id
  const workouts: Array<IWorkout> = await Workout.find({ user: req.user._id });

  // convert the workouts to JSON
  const workouts_JSON = JSON.parse(JSON.stringify(workouts));

  // convert the JSON to CSV and write to a file via FS
  const filename: string = `download-${req.user._id}-workouts.csv`;
  const absPath: string = path.join(__dirname, "/static/", filename);

  // promisify csv converter and FS functions
  const csv = promisify(stringify);
  const write = promisify(fs.writeFile);
  const remove = promisify(fs.unlink);

  // create CSV string output
  const workouts_CSV = await csv(workouts_JSON, { header: true });

  // write to a CSV file in a local static path (temporary)
  await write(absPath, workouts_CSV);

  // download the file to the user
  return res.download(absPath, async err => {
    if (err) {
      if (res.headersSent) {
        // log the err to the console (this should not happen, should default to the below response)
        console.log(err);
      } else {
        return next(new Err("Could not download, an error occurred", 400));
      }
    }

    // remove the temporary file from the local static path
    await remove(absPath).catch(_ =>
      next(new Err("An error occurred, unable to download file", 500))
    );
  });
});
