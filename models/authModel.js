const { User } = require("../schemas/userSchema");

const getUser = (mail) => {
  const user = User.find({ mail });
  return user;
};

const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const getVerifiedUser = (mail, password) => {
  const verUser = User.find({ mail, password });
  return verUser;
};

const getUserWithId = async (personId) => {
  const user = await User.findById(personId, "-__v -password").catch((e) => {
    return "Invalid Id";
  });
  return user;
};

module.exports = {
  getUser,
  createUser,
  getVerifiedUser,
  getUserWithId,
};
