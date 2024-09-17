const express = require("express");
const fs = require("fs");
const router = express.Router();
const cloudinary = require("cloudinary");
const ExpressFormiddable = require("express-formidable");

const { requiredSignIn } = require("../middleware/authMiddleware");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

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

      const result = await cloudinary.uploader.upload(req.files.image.path);

      fs.unlink(req.files.image.path, (err) => {
        if (err) {
          console.log("Failed to delete temp file", err);
        } else {
          console.log("Temporary file is deleted successfully");
        }
      });

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
