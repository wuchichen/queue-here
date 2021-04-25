const owner = require("../model/owner");
const diner = require("../model/diner");
const restaurant = require("../model/restaurant");
const booking = require("../model/booking");

module.exports.dbManager = {
  owner,
  diner,
  restaurant,
  booking,
};
