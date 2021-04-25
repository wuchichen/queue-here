const { dbManager } = require("../service/db-manager");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require("moment");
const axios = require("axios");

const inMemoryCache = {};

module.exports.createOne = async (req, res) => {
  // Create restaurant
  const owner = await dbManager.owner.model.findOne({ email: req.user.email });
  const restaurant = new dbManager.restaurant.model({
    owner: owner._id,
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    phone: req.body.phone,
    publicHoliday: req.body.publicHoliday,
    maxNumberAtTime: req.body.maxNumberAtTime,
    opens: req.body.opens,
  });
  const result = await restaurant.save();

  return res.json(result);
};

const formatDayOfWeek = (dayOfWeek) => {
  switch (dayOfWeek) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      throw "Unknow day of week input, valid value is 0-6";
  }
};

module.exports.getSlots = async (req, res) => {
  if (!req.query.reservedDate) {
    return res
      .status(404)
      .json({ message: "Missing reserved date in query string" });
  }

  const reservedDate = moment(req.query.reservedDate);
  const restaurantId = req.params.restaurantId;

  var holidaysPromise;

  // Prevent calling the external API too many times
  if (!inMemoryCache[reservedDate.year()]) {
    holidaysPromise = axios
      .get(
        `https://notes.rjchow.com/singapore_public_holidays/api/${reservedDate.year()}/data.json`
      )
      .then((data) => {
        inMemoryCache[reservedDate.year()] = data.data;
        return data.data;
      });
  } else {
    holidaysPromise = Promise.resolve(inMemoryCache[reservedDate.year()]);
  }

  // Querying booking collection
  const bookingsPromise = dbManager.booking.model.find({
    restaurant: new ObjectId(restaurantId),
    reservedDate: reservedDate,
  });

  // Querying restaurant collection
  const restaurantPromise = dbManager.restaurant.model.findById(restaurantId);

  // Get result of async calls
  const [bookings, restaurant, holidays] = await Promise.all([
    bookingsPromise,
    restaurantPromise,
    holidaysPromise,
  ]);

  // Check wheter the reserved date is public holiday
  if (!restaurant.publicHoliday && holidays) {
    for (let holiday of holidays) {
      if (moment(holiday.Date).isSame(reservedDate, "day")) {
        return res.json([]);
      }
    }
  }

  // Get opening interval of restaurant
  const dayOfWeek = formatDayOfWeek(reservedDate.day());
  const intervals = restaurant.opens[dayOfWeek]; //[{from:{hour: Number}, to:{hour: Number}}, ...]

  // convert intervals to slots
  // and check the accumulated diner for each slot
  const result = intervals.reduce((totalSlots, interval) => {
    // e.g. as below
    // interval = {from:{hour: Number}, to:{hour: Number}}
    // slots = [{hour: Number, count: Number}, ...]
    var slots = [];
    for (let i = interval.from.hour; i < interval.to.hour; i++) {
      // filter bookings to get the accumulated diner
      let count = bookings.reduce((accu, booking) => {
        if (
          booking.slot.hour === i &&
          moment(booking.reservedDate).isSame(reservedDate)
        ) {
          return accu + booking.numberOfCustomer;
        }
        return accu;
      }, 0);

      // slots
      slots = [...slots, { hour: i, count: count }];
    }
    return [...totalSlots, ...slots];
  }, []);

  return res.json(result);
};

module.exports.getAll = async (req, res) => {
  var filter = {};
  if (req.user.role === "owner") {
    filter = { owner: new ObjectId(req.user._id) };
  }

  // get restaurants POJO
  var result = await dbManager.restaurant.model
    .find(filter)
    .populate("owner", "email firstName lastName")
    .lean();

  return res.json(result);
};

module.exports.getOneById = async (req, res) => {
  const filter = { _id: new ObjectId(req.params.restaurantId) };

  // get restaurant POJO
  const result = await dbManager.restaurant.model
    .findOne(filter)
    .populate("owner", "email firstName lastName")
    .lean();

  return res.json(result);
};

module.exports.updateOneById = async (req, res) => {
  // Get restaurant
  var restaurant = await dbManager.restaurant.model.findOne({
    _id: req.params.restaurantId,
  });

  // Update restaurant info
  restaurant.name = req.body.name;
  restaurant.description = req.body.description;
  restaurant.address = req.body.address;
  restaurant.phone = req.body.phone;
  restaurant.publicHoliday = req.body.publicHoliday;
  restaurant.maxNumberAtTime = req.body.maxNumberAtTime;
  restaurant.opens = req.body.opens;
  const result = await restaurant.save();

  return res.json(result);
};
