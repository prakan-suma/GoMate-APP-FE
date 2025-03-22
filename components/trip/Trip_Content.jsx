import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import UserTypeSwitch from "@components/homes/UserTypeSwitch";
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';


const Trip_Content = () => {

  return (
    <View className="w-full py-6 rounded-xl  gap-4">
      <UserTypeSwitch/>
    </View>
  );
};

export default Trip_Content;
