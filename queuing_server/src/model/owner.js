const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const model = mongoose.model("Owner", schema);

module.exports = {
  schema,
  model,
};
