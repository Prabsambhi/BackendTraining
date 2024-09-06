import { useContext, createContext, useEffect, useState } from "react";

const Authcontext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
      });
    }
  }, []);

  return (
    <Authcontext.Provider value={{ auth, setAuth }}>
      {children}
    </Authcontext.Provider>
  );
};

const useAuth = () => useContext(Authcontext);

export { useAuth, AuthProvider };
