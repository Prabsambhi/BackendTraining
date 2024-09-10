import React from "react";
import { useAuth } from "../contextApi/authContext";
import axios from "axios";
axios.defaults.withCredentials = true;

const Home = () => {
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/logout");

      console.log(response);

      setAuth({ user: null });

      localStorage.removeItem("auth");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome {auth?.user?.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
