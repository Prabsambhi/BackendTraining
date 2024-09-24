const blogModel = require("../Model/blogModel");

exports.addBlogController = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title) {
      return res.send({ error: "Title is required" });
    }

    if (!content) {
      return res.send({ error: "Content is required" });
    }
    if (!author) {
      return res.send({ error: "Author is required" });
    }
    if (!coverImage) {
      return res.send({ error: "CoverImage is required" });
    }

    const newBlog = new blogModel({
      title,
      content,
      author,
      coverImage,
    });

    await newBlog.save();

    res.status(201).send({
      success: true,
      message: "Blog created succcessfully",
      newBlog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in creating Blog",
      error,
    });
  }
};

exports.getAllBlog = async (req, res) => {
  try {
    const blogs = await blogModel.find()

    res.status(201).send({
      success: true,
      message: "Blog created succcessfully",
      blogs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!blogId) {
      res.status(404).send({
        success: false,
        message: "blog not found",
        error,
      });
    }

    const deletedBlog = await blogModel.findByIdAndDelete(blogId);

    res.status(201).send({
      success: true,
      message: "Blog deleted succcessfully",
      deletedBlog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};
