const User = require("../../models/User");

exports.createUser = async () => {
  await User.deleteMany();
  const user = new User({ email: "test@email.com", password: "password" });
  await user.save();
  return user;
};
