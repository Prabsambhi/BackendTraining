import React, { useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Dashboard = () => {
  const handleDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/dashboard");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleDashboard();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
