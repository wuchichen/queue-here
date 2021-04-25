const router = require("express").Router();
const registerController = require("../controller/register-controller");

router.post("/diner", registerController.registerDiner);
router.post("/owner", registerController.registerOwner);

// Exports router
module.exports = router;
