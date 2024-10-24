import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contextApi/authContext";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(null);

  const { auth } = useAuth();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/blog/get-single-blog/${id}`
        );
        setBlog(response?.data);
        setLikes(response?.data?.blog?.likes?.length);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBlog();
  }, []);

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/blog/toggle-like/${id}`,
        {
          user_id: auth?.user?._id,
        }
      );
      if (response.data.message === "Blog Liked") {
        setLikes(likes + 1);
      }
      if (response.data.message === "Blog Unliked") {
        setLikes(likes - 1);
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/blog/add-comment/${id}`,
        {
          user_id: auth?.user?._id,
          comment,
        }
      );

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>BlogDetails</div>
      <p>{likes}</p>
      <button onClick={toggleLike}>ToggleLike</button>
      <form onSubmit={addComment}>
        <label>Add comment</label>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default BlogDetails;
