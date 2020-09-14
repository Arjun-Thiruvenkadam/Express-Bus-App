const userModel = require("../models/userModel.js");

const getUserWithId = async (personId) => {
  const user = await userModel.getUserWithId(personId);
  if (!user) return "No User Available with the given id";
  return user;
};

const getUser = async (mail) => {
  const user = await userModel.getUser(mail);
  return user;
};

const createUser = async (user) => {
  const newUser = await userModel.createUser(user);
  return newUser;
};

const getVerifiedUser = async (mail, password) => {
  const user = await this.userModel.getVerifiedUser(mail, password);
  return user;
};

module.exports = {
  getUserWithId,
  getVerifiedUser,
  getUser,
  createUser
};
