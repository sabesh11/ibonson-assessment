const User = require("../models/User");
const bycrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userexisitng = User.findOne({ email });

  if (userexisitng) {
    req.status(400);
    throw new Error("User exisitng");
  }

  const hashPassword = await bycrypt.hash(password, 10);

  const user = await User.create({
    email,
    name,
    password: hashPassword,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    token: generateToken(user._id),
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const plainpassword = await bycrypt.compare(password, user.password);
  if (user && plainpassword) {
    res.json({
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentiols");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
