import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
axios.defaults.withCredentials = true;

const PrivateRoute = () => {
  const [check, setCheck] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/verify-user");

      if (res.data.success) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    } catch (err) {
      setCheck(false);
      console.log(err);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (check === null) {
    return <h1>Loading....</h1>;
  }

  return check ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
