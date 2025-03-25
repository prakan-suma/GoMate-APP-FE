import React, { createContext, useState, useContext } from 'react';


const TripContext = createContext();


export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState(null);
  const [selectDriver, setselectDriver] = useState(null);
  const [creattripdata, setcreattripdata] = useState(null);
  const [Trippagedata, setTrippagedata] = useState(null);

  return (
    <TripContext.Provider value={{ tripData, setTripData,selectDriver, setselectDriver,creattripdata, setcreattripdata,Trippagedata, setTrippagedata}}>
      {children}
    </TripContext.Provider>
  );
};


export const useTrip = () => useContext(TripContext);
