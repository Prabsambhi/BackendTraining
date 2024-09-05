import React from "react";
import Register from "./Pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import ForgotPassword from "./Pages/forgotPassword";
import ResetPassword from "./Pages/resetPassword";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
