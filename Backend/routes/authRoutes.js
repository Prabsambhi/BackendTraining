const express = require("express");
const router = express.Router();

const { requiredSignIn } = require("../middleware/authMiddleware");

const {
  registerController,
  loginController,
  dashboardController,
  forgotPasswordController,
  resetPasswordController
} = require("../controller/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/dashboard", requiredSignIn, dashboardController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

module.exports = router;
