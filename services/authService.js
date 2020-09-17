const authModel = require('../models/userModel');

// helper
const getSignUpPayload = (authPayload) => {
  const user = {
    userName: authPayload.userName,
    mail: authPayload.mail,
    password: authPayload.password,
  };
  return user;
};

const signUp = async (authPayload) => {
  const result = await authModel.getUser(authPayload.mail);
  if (result) return 'Email already registered';
  const user = getSignUpPayload(authPayload);
  const newUser = await authModel.createUser(user);
  const payload = {
    name: newUser.userName,
    // eslint-disable-next-line no-underscore-dangle
    token: newUser._id,
  };
  return payload;
};

const login = async (authPayload) => {
  const verifiedUser = await authModel.getVerifiedUser(
    authPayload.email,
    authPayload.password
  );
  if (verifiedUser.length > 0) {
    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      token: verifiedUser[0]._id,
      name: verifiedUser[0].userName,
    };
    return payload;
  }
  return 'Check username and password';
};

module.exports = {
  signUp,
  login,
};
