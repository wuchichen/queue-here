const mongoose = require("mongoose");

const openingTimeSubSchema = new mongoose.Schema(
  {
    from: { hour: Number },
    to: { hour: Number },
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  name: String, // shop name
  address: String, // shop address
  phone: String, // shop contact number
  description: String, // shop description
  publicHoliday: Boolean, // whether closing the shop on public holiday
  maxNumberAtTime: Number, // max customer queuing number at a time
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Owner",
  },
  opens: {
    Mon: [openingTimeSubSchema],
    Tue: [openingTimeSubSchema],
    Wed: [openingTimeSubSchema],
    Thu: [openingTimeSubSchema],
    Fri: [openingTimeSubSchema],
    Sat: [openingTimeSubSchema],
    Sun: [openingTimeSubSchema],
  },
});

const model = mongoose.model("Restaurant", schema);

module.exports = {
  schema,
  model,
};
