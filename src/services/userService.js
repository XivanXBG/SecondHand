const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../utils/JWT-async");
const { SECRET } = require("../constants.js");

exports.login = async (userData) => {
    const {email,password} = userData;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Username or password is invalid");
  }
  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    throw new Error("Username or password is invalid");
  }

  const data = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = await jwt.sign(data, SECRET, { expiresIn: "1d" });
  return token;
};

exports.register = async (userData) => {
  const user = await User.create(userData);
  
  const data = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = await jwt.sign(data, SECRET, { expiresIn: "1d" });
  return token;
};
