const Exercise = require("../../models/Exercise");

exports.createExercise = async id => {
  await Exercise.deleteMany();
  const exercise = new Exercise({ name: "name", user: id });
  return await exercise.save();
};