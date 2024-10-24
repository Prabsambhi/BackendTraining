const express = require("express");
const fs = require("fs");
const router = express.Router();
const cloudinary = require("cloudinary");
const ExpressFormiddable = require("express-formidable");

const { requiredSignIn } = require("../middleware/authMiddleware");

const {
  addBlogController,
  getAllBlog,
  deleteBlog,
  getSingleBlog,
  toggleLike,
  addComment,
  editBlogController,
} = require("../controller/blogController");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

router.post("/add-blog", requiredSignIn, addBlogController);
router.put("/edit-blog/:id", requiredSignIn, editBlogController);
router.get("/get-all-blogs", getAllBlog);
router.get("/get-single-blog/:id", getSingleBlog);
router.delete("/delete-blog/:id", requiredSignIn, deleteBlog);

// ToggleLike

router.post("/toggle-like/:id", requiredSignIn, toggleLike);

// Add Comment

router.post("/add-comment/:id", requiredSignIn, addComment);

router.post(
  "/upload-blog-pic",
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

      console.log(req.files.image.path);

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
