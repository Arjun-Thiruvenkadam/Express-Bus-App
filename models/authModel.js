const { User } = require("../schemas/userSchema");

const getUser = (email) => {
  const user = User.find({ mail: email });
  return user;
};

const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const getVerifiedUser = (user) => {
  const verUser = User.find(user);
  return verUser;
};

module.exports = {
  getUser,
  createUser,
  getVerifiedUser,
};
