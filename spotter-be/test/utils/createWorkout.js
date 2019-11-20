const Workout = require("../../models/Workout");

exports.createWorkout = async template => {
  await Workout.deleteMany();
  const workout = new Workout(template);
  return await workout.save();
}