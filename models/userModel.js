const { User } = require("../schemas/userSchema");

const getUser = (mail) => {
  const user = User.findOne({ mail });
  return user;
};

const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const getVerifiedUser = (mail, password) => {
  const verifiedUser = User.find({ mail, password });
  return verifiedUser;
};

const getUserWithId = (personId) => {
  const user = User.findById(personId, "-__v -password")
    .exec()
    .catch((e) => "Invalid Id");
  return user;
};

module.exports = {
  getUser,
  getUserWithId,
  getVerifiedUser,
  createUser
};
