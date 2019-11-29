const Template = require("../../models/Template");

exports.createTemplate = async template => {
  await Template.deleteMany();
  const temp = new Template(template);
  return await temp.save();
}