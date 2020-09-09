const authService = require("../models/authModel");

const auth = (authPayload) => {
  if (!authPayload.login) {
    return signUp(authPayload);
  } else {
    return login(authPayload);
  }
};

const signUp = async (authPayload) => {
  const result = await authService.getUser(authPayload.email);
  if (result.length > 0) return "Email already registered";
  const user = getSignUpPayload(authPayload);
  const newUser = await authService.createUser(user);
  const payload = {
    name: newUser.userName,
    token: newUser._id,
  };
  return payload;
};

const getSignUpPayload = (authPayload) => {
  const user = {
    userName: authPayload.name,
    mail: authPayload.email,
    password: authPayload.password,
  };
  return user;
};

const login = async (authPayload) => {
  const user = {
    mail: authPayload.email,
    password: authPayload.password,
  };
  const verifiedUser = await authService.getVerifiedUser(user);
  if (verifiedUser.length > 0) {
    const payload = {
      token: verifiedUser[0]._id,
      name: verifiedUser[0].userName,
    };
    return payload;
  } else {
    return "false";
  }
};

module.exports = {
  auth,
};
