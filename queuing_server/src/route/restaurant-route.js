const router = require("express").Router();
const restaurantController = require("../controller/restaurant-controller");

// Create
router.post("/", restaurantController.createOne);

// Read
router.get("/", restaurantController.getAll);

router.get("/:restaurantId", restaurantController.getOneById);

router.get("/:restaurantId/slots", restaurantController.getSlots);

// Update
router.put("/:restaurantId", restaurantController.updateOneById);

module.exports = router;
