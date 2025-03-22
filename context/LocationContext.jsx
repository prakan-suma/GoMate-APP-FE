import React, { createContext, useState, useContext } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [locationPlace, setLocationPlace] = useState(null);
  const [selectedUserLocation, setSelectedUserLocation] = useState(null);
  const [locationUser, setlocationUser] = useState(null);
  const [distance, setdistance] = useState(null);
  const [duration, setduration] = useState(null);



  return (
    <LocationContext.Provider value={{ location, setLocation, locationPlace, setLocationPlace, selectedPlace, setSelectedPlace, selectedUserLocation, setSelectedUserLocation ,
    locationUser, setlocationUser,distance, setdistance,duration, setduration}}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
