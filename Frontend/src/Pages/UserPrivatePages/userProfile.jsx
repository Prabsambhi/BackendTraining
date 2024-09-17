import React from "react";
import { useAuth } from "../../contextApi/authContext";

const UserProfile = () => {
  const { auth } = useAuth();

  return (
    <div>
      <h1>{auth?.user?.name}'s Profile</h1>
      <p>{auth?.user?.email}</p>
      <p>{auth?.user?.phone}</p>
      <img src={auth?.user?.profilePic} style={{height: "200px", width: "400px"}}/>
    </div>
  );
};

export default UserProfile;
