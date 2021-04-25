const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { dbManager } = require("../service/db-manager");

const dinerLogin = async (req, res) => {
  // Get user from database
  const user = await dbManager.diner.model.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (valid) {
    // Generate access token
    var token = jwt.sign(
      { _id: user._id, email: user.email, role: "diner" },
      process.env.TOKEN_SECRET,
      { algorithm: process.env.TOKEN_ALGORITHM }
    );
    return res.status(200).json({ access_token: token });
  } else {
    return res.status(400).json({ message: "Incorrect password" });
  }
};

const ownerLogin = async (req, res) => {
  // Get user from database
  const user = await dbManager.owner.model.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (valid) {
    // Generate access token
    var token = jwt.sign(
      { _id: user._id, email: user.email, role: "owner" },
      process.env.TOKEN_SECRET,
      { algorithm: process.env.TOKEN_ALGORITHM }
    );
    return res.status(200).json({ access_token: token });
  } else {
    return res.status(400).json({ message: "Incorrect password" });
  }
};

module.exports = {
  dinerLogin,
  ownerLogin,
};
