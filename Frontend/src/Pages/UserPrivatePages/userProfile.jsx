import React from "react";
import { useAuth } from "../../contextApi/authContext";

const UserProfile = () => {
    
  const { auth } = useAuth();

  return (
    <div>
      <h1>User Profile</h1>
      <p>{auth?.user?.name}</p>
      <p>{auth?.user?.email}</p>
    </div>
  );
};

export default UserProfile;
