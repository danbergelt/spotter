import User from "../../models/User";

export const createUser = async () => {
  await User.deleteMany({});
  const user = new User({ email: "test@email.com", password: "password" });
  await user.save();
  return user;
};
