import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import { useAuth } from "../../contextApi/authContext";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState({});

  const { auth } = useAuth();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/blog/upload-blog-pic",
        formData
      );

      setCoverImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/blog/add-blog", {
        title,
        content,
        author: auth?.user?._id,
        coverImage: coverImage?.url,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form-register">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Content</label>
        <textarea
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label>Cover Image</label>
        <input type="file" onChange={handleImage} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;
