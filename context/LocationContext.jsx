import React, { createContext, useState, useContext } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <LocationContext.Provider value={{ location, setLocation, selectedPlace, setSelectedPlace }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
