import React from "react";
import Register from "./Pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import ForgotPassword from "./Pages/forgotPassword";
import ResetPassword from "./Pages/resetPassword";
import Home from "./Pages/home";
import Dashboard from "./Pages/dashboard";
import PrivateRoute from "./PrivateRoute/privateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
