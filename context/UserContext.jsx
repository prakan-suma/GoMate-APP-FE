import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userID] = useState(2);
  const [isDriver] = useState(false);
  const [Role, setRole] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser,Role, setRole,userID,isDriver}}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
