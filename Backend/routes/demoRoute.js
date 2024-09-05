const express = require("express");
const router = express.Router();

const {
  homeController,
  aboutController,
  helpController,
} = require("../controller/demoController");

router.get("/", homeController);
router.get("/about", aboutController);
router.get("/help", helpController);

module.exports = router;
