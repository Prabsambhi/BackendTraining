import axios from "axios";
import React, { useState, useEffect } from "react";

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

  return <div>AllBlogs</div>;
};

export default AllBlogs;
