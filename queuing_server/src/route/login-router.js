const router = require("express").Router();
const loginController = require("../controller/login-controller");

router.post("/diner", loginController.dinerLogin);
router.post("/owner", loginController.ownerLogin);

// Exports router
module.exports = router;
