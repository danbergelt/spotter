const Tag = require("../../models/Tag");

exports.createTag = async id => {
  await Tag.deleteMany();
  const tag = new Tag({ color: "red", content: "test", user: id });
  return await tag.save();
};
