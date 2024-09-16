const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const ExpressFormiddable = require("express-formidable");

const dotenv = require("dotenv");
dotenv.config();

const { requiredSignIn } = require("../middleware/authMiddleware");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

console.log(process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_KEY);

const {
  registerController,
  loginController,
  dashboardController,
  forgotPasswordController,
  resetPasswordController,
  logoutController,
} = require("../controller/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/dashboard", requiredSignIn, dashboardController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);
router.post("/logout", logoutController);

router.get("/verify-user", requiredSignIn, (req, res) => {
  res.status(200).send({
    success: true,
  });
});

router.post(
  "/upload-profile-pic",
  ExpressFormiddable({
    maxFieldsSize: 1024 * 1024 * 5,
  }),

  async (req, res) => {
    try {
      if (!req.files || !req.files.image) {
        return res.status(400).send({
          error: "No image file found",
        });
      }

      console.log(req.files.image);

      const result = await cloudinary.uploader.upload(req.files.image.path);

      console.log(result);

      res.status(200).send({
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Error uploading image",
      });
    }
  }
);

module.exports = router;
