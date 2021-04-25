const router = require("express").Router();
const bookingController = require("../controller/booking-controller");

// Create
router.post("/", bookingController.createOne);

// Read
router.get("/", bookingController.getAll);

router.get("/:bookingId", bookingController.getOneById);

// Update
router.put("/:bookingId", bookingController.updateOneById);

module.exports = router;
