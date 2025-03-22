import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Role, setRole] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser,Role, setRole}}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
