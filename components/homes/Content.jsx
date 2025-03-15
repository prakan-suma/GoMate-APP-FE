import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import UserTypeSwitch from "./UserTypeSwitch";
import SwitchContent from "./SwitchContent";
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';

const Content = () => {
  const [userType, setUserType] = useState(false);
  return (
    <View className="w-full py-6 rounded-xl  gap-4">
      <View className="w-full flex-row justify-center mb-2">
        <View className="w-1/2 h-1 bg-gray-300 rounded-lg" />
      </View>
      
      <Text className="text-gray-800 font-bold">เลือกประเภทผู้ใช้งาน</Text>

      <UserTypeSwitch value={userType} onValueChange={setUserType} />

      <View>
        <SwitchContent value={userType}/>
      </View>

      <View className="my-1">
        <Text className="text-gray-400 font-regular">สวัสดียามเช้า</Text>
        <Text className="text-xl font-bold">วันนี้คุณต้องการเดินทางไปที่ไหน?</Text>
      </View>

      <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-4">
        <Link href={"/home/SearchPlaceScreen"} className="w-full py-3 flex-row items-center">
          <View className="flex-row items-center">
            <Ionicons name="search" size={20} color="#2C64F3" />
            <Text className="text-gray-400 ml-2">ค้นหาสถานที่...</Text>
          </View>
        </Link>
      </View>
    </View>
  );
};

export default Content;
