const authService = require("../models/authModel");

//helper
const getSignUpPayload = (authPayload) => {
  const user = {
    userName: authPayload.userName,
    mail: authPayload.mail,
    password: authPayload.password,
  };
  return user;
};

//helper
const getUser = async (personId) => {
  const user = await authService.getUserWithId(personId);
  if (!user) return "No User Available with the given id";
  return user;
};

const signUp = async (authPayload) => {
  const result = await authService.getUser(authPayload.mail);
  if (result.length > 0) return "Email already registered";
  const user = getSignUpPayload(authPayload);
  const newUser = await authService.createUser(user);
  const payload = {
    name: newUser.userName,
    token: newUser._id,
  };
  return payload;
};

const login = async (authPayload) => {
  const verifiedUser = await authService.getVerifiedUser(
    authPayload.email,
    authPayload.password
  );
  if (verifiedUser.length > 0) {
    const payload = {
      token: verifiedUser[0]._id,
      name: verifiedUser[0].userName,
    };
    return payload;
  } else {
    return "Check username and password";
  }
};

module.exports = {
  signUp,
  login,
  getUser,
};
