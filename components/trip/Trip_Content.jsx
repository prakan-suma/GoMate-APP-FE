import React, { useState,useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import UserTypeSwitch from "@components/homes/UserTypeSwitch";
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';
import SwitchTripContent from "./SwitchTripContent";
import { useUser } from "@context/UserContext";


const Trip_Content = () => {
  const {Role} = useUser()
  const [ShowHeader, setShowHeader] = useState(null);

  useEffect(() => {
    if(Role){
      setShowHeader("ทริปและคำขอของคุณ")
    }
    else{
      setShowHeader("ทริปของคุณ")
    }
          
  }, [Role]);
  

  return (
    <View className="w-full py-6 rounded-xl  gap-4">
      <View style={{padding: 20}}>
        <Text style={{fontSize: 24, fontWeight: "bold" }}>{ShowHeader}</Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center',}}>
        <UserTypeSwitch/>
      </View>
      
      <SwitchTripContent/>
    </View>
  );
};

export default Trip_Content;
