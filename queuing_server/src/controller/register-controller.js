const { dbManager } = require("../service/db-manager");
const bcrypt = require("bcrypt");

const registerDiner = async (req, res) => {
  // Get user from database
  const user = await dbManager.diner.model.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already existed" });
  }

  // Create account
  const saltRounds = 10;
  const hash = await bcrypt.hash(req.body.password, saltRounds);
  const diner = new dbManager.diner.model({
    email: req.body.email,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  // Update collection
  await diner.save();
  return res.status(200).json({});
};

const registerOwner = async (req, res) => {
  // Get user from database
  const user = await dbManager.owner.model.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already existed" });
  }

  // Create account
  const saltRounds = 10;
  const hash = await bcrypt.hash(req.body.password, saltRounds);
  const owner = new dbManager.owner.model({
    email: req.body.email,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  // Update collection
  await owner.save();
  return res.status(200).json({});
};

module.exports = {
  registerDiner,
  registerOwner,
};
