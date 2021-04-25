const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
  },
  bookingBy: {
    type: mongoose.Types.ObjectId,
    ref: "Diner",
  },
  bookingAt: Date, // additional info
  reservedDate: Date, // Date without time
  slot: { hour: Number }, // time goes here
  numberOfCustomer: Number,
});

const model = mongoose.model("Booking", schema);

module.exports = {
  model,
  schema,
};
