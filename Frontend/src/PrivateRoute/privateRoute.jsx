import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
axios.defaults.withCredentials = true;

const PrivateRoute = () => {
  const [check, setCheck] = useState(false);

  const checkAuth = async () => {
    const res = await axios.get("http://localhost:3000/auth/dashboard");

    console.log(res.data.success);
    
    if (res.data.success) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return check ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
