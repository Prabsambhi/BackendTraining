import React from "react";
import Register from "./Pages/Auth/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/login";
import ForgotPassword from "./Pages/Auth/forgotPassword";
import ResetPassword from "./Pages/Auth/resetPassword";
import Home from "./Pages/home";
import Dashboard from "./Pages/UserPrivatePages/dashboard";
import PrivateRoute from "./PrivateRoute/privateRoute";
import UserProfile from "./Pages/UserPrivatePages/userProfile";
import AddBlog from "./Pages/UserPrivatePages/AddBlog";
import AllBlogs from "./Pages/AllBlogs";
import BlogDetails from "./Pages/blogDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/addBlog" element={<AddBlog />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
