const authService = require("../models/authModel");

const auth = (req, res) => {
  const authPayload = req.body;
  if (!authPayload.login) {
    signUp(authPayload, res);
  } else {
    login(authPayload, res);
  }
};

const signUp = async (authPayload, res) => {
  const result = await authService.getUser(authPayload.email);
  if (result.length > 0) res.send("Email already registered");
  const user = getSignUpPayload(authPayload);
  const newUser = await authService.createUser(user);
  const payload = {
    name: newUser.userName,
    token: newUser._id,
  };
  res.send(payload);
};

const getSignUpPayload = (authPayload) => {
  const user = {
    userName: authPayload.name,
    mail: authPayload.email,
    password: authPayload.password,
  };
  return user;
};

const login = async (authPayload, res) => {
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
    return res.send(payload);
  } else {
    return res.send("false");
  }
};

module.exports = {
  auth,
};
