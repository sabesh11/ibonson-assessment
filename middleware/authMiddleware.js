const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async () => {
  let token;

  if (req.headers.authorization?.includes("Bearer")) {
    try {
      token = req.headers.authorization.spilit("")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      req.status(401);
      throw new Error("unauthorize");
    }
  }

  req.status(401);
  throw new Error("no token");
};

module.exports = { protect };
