const { dbManager } = require("../service/db-manager");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require("moment");

module.exports.createOne = async (req, res) => {
  if (req.user.role !== "diner") {
    return res.status(403).json({ message: "permission deny" });
  }

  // Create booking
  const booking = new dbManager.booking.model({
    restaurant: new ObjectId(req.body.restaurant),
    bookingBy: new ObjectId(req.user._id),
    bookingAt: new Date(),
    reservedDate: new Date(req.body.reservedDate), // Pass req.reservedDate as ISO string
    slot: req.body.slot,
    numberOfCustomer: req.body.numberOfCustomer,
  });
  const result = await booking.save();

  return res.json(result);
};

module.exports.getAll = async (req, res) => {
  var filter;
  // Update filter according to role
  if (req.user.role === "owner") {
    // Two layer query
    var restaurants = await dbManager.restaurant.model
      .find({
        owner: new ObjectId(req.user._id),
      })
      .lean();
    filter = {
      restaurant: { $in: restaurants.map((r) => r._id) },
    };
  } else if (req.user.role === "diner") {
    filter = { bookingBy: new ObjectId(req.user._id) };
  } else {
    return res.status(403).json({ message: "permission deny" });
  }

  // get bookings POJO
  var result = await dbManager.booking.model
    .find(filter)
    .populate([
      {
        path: "restaurant",
        model: "Restaurant",
        populate: {
          path: "owner",
          model: "Owner",
          select: "_id email firstName lastName",
        },
      },
      {
        path: "bookingBy",
        model: "Diner",
        select: "_id email firstName lastName",
      },
    ])
    .lean();

  return res.json(result);
};

module.exports.getOneById = async (req, res) => {
  const filter = { _id: new ObjectId(req.params.bookingId) };

  // get booking POJO
  const result = await dbManager.booking.model
    .findOne(filter)
    .populate([
      {
        path: "restaurant",
        model: "Restaurant",
        populate: {
          path: "owner",
          model: "Owner",
          select: "_id email firstName lastName",
        },
      },
      {
        path: "bookingBy",
        model: "Diner",
        select: "_id email firstName lastName",
      },
    ])
    .lean();
  return res.json(result);
};

module.exports.updateOneById = async (req, res) => {
  // Update booking
  var booking = await dbManager.booking.model.findOne({
    _id: req.params.bookingId,
  });

  booking.bookingAt = new Date();
  booking.reservedDate = new Date(req.body.reservedDate);
  booking.slot = req.body.slot;
  booking.numberOfCustomer = req.body.numberOfCustomer;

  const result = await booking.save();

  return res.json(result);
};
