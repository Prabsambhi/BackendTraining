const blogModel = require("../Model/blogModel");

exports.addBlogController = async (req, res) => {
  try {
    const { title, content, author, coverImage } = req.body;

    console.log(title, content, author, coverImage);

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

    console.log("Saved");

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
    const blogs = await blogModel.find().populate("author", "name profilePic");

    res.status(201).send({
      success: true,
      message: "Blog fetched succcessfully",
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

exports.getSingleBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!blogId) {
      res.status(404).send({
        success: false,
        message: "blog not found",
        error,
      });
    }
    const blog = await blogModel
      .findById(blogId)
      .populate("author", "name profilePic");

    if (!blog) {
      res.status(404).send({
        success: false,
        message: "Error in getting single blog",
        error,
      });
    }

    res.status(201).send({
      success: true,
      message: "Single Blog fetched succcessfully",
      blog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting single blog",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
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

exports.toggleLike = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    const { user_id } = req.body;

    console.log(user_id, req.params.id);

    if (!blog) {
      res.status(404).send({
        success: false,
        message: "blog not found",
        error,
      });
    }

    const userIndex = blog.likes.indexOf(user_id);

    if (userIndex === -1) {
      // user has not liked the blog (id is not present in our likes array)
      blog.likes.push(user_id);
      await blog.save();

      res.status(201).send({
        success: true,
        message: "Blog Liked",
        blog,
      });
    } else {
      // user has already liked the blog (id is present in our likes array)
      blog.likes.splice(userIndex, 1);
      await blog.save();
      res.status(201).send({
        success: true,
        message: "Blog Unliked",
        blog,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in liking the blog",
      err,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { comment, user_id } = req.body;

    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found",
        error,
      });
    }

    blog.comments.push({
      user: user_id,
      comment,
    });

    await blog.save();

    res.status(201).send({
      success: true,
      message: "Comment Added Successfully",
      blog,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in adding the comment",
      err,
    });
  }
};
