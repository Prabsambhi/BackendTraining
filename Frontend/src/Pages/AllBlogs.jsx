import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/blog/get-all-blogs"
        );
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
      } catch (err) {
        console.log(err);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div>
      <h1>All Blogs</h1>
      {blogs?.map((item) => (
        <Link to={`/blog-details/${item?._id}`} key={item?._id}>
          <h1>{item?.title}</h1>
          <img src={item?.coverImage} />
          <h3>{item?.author?.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default AllBlogs;
