import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, TextInput,Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@context/UserContext";
import { useTrip } from "@context/TripContext";
import { useLocation } from "@context/LocationContext";
import Constants from "expo-constants";

const SelectDriver = () => {
  const router = useRouter();
  const { userID } = useUser();
  const { selectDriver, setselectDriver } = useTrip();
  const { setSelectedPlace, setLocationPlace, setSelectedUserLocation, setlocationUser, setdistance, setduration } = useLocation();
  const [passengerCount, setPassengerCount] = useState(1);
  const API_BE_URL = Constants.expoConfig.extra.API_BE_URL;

  const handleBackPress = () => {
    setselectDriver(null);
    router.back();
  };

  const CreateBooking = async () => {
    const data = {
      trip_id: selectDriver.id,
      passenger_id: userID,
      amount: parseInt(passengerCount),
    };
  
    console.log('Data being sent to API:', data); // เพิ่มการ log ข้อมูล
  
    try {
      const response = await fetch(`${API_BE_URL}/v1/booking/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Success', 'Booking successfully');
      } else {
        console.log('Error occurred', result.detail || 'Unable to Booking Trip');
      }
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  const hadlereqPrass = () => {
    if(passengerCount != "" && selectDriver.available_seats >= passengerCount){
      setSelectedPlace(null);
      setLocationPlace(null);
      setSelectedUserLocation(null);
      setlocationUser(null);
      setdistance(null);
      setduration(null);
      CreateBooking();
      router.back();
      router.push("/(Tabs)/trip");
    }
    else if(selectDriver.available_seats < passengerCount){
      Alert.alert("ที่นั้งไม่เพี่ยงพอต่อการจอง");
      return;
    }
    else{
      Alert.alert("กรุณากรอกจำนวนผู้โดยสารที่ถูกต้อง");
      return;
    }
  };

  return (
    <View className="p-4 flex-1">
      {/* Header Section */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="chevron-back-outline" size={24} />
        </TouchableOpacity>
        <Text className="text-xl ml-4 font-bold">
          {selectDriver.driver.driver_documents.vehicle_brand} {selectDriver.driver.driver_documents.vehicle_model} {selectDriver.driver.driver_documents.vehicle_color}
        </Text>
      </View>

      <View style={{ padding: 35 }}>
        <View className="items-center mb-6">
          <Image source={{ uri: selectDriver.avatar }} className="w-24 h-24 rounded-full" />
          <Text className="text-lg font-bold mt-4">{selectDriver.driver.name}</Text>
          <Text className="text-gray-500">
            {selectDriver.driver.driver_documents.vehicle_brand} {selectDriver.driver.driver_documents.vehicle_model} สี {selectDriver.driver.driver_documents.vehicle_color}
          </Text>
          <Text className="text-gray-400">ทะเบียน {selectDriver.driver.driver_documents.vehicle_registration}</Text>
          <Text className="text-blue-500 text-xl font-bold mt-2">"3" ★</Text>
        </View>

        {/* Passenger Count Input */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-2">จำนวนคน</Text>
          <View className="flex-row items-center p-4 border rounded-md">
            <Ionicons name="person-outline" size={20} color="#2C64F3" />
            <TextInput
              className="ml-2 flex-1"
              keyboardType="numeric"
              value={passengerCount.toString()}
              onChangeText={(text) => setPassengerCount(text.replace(/[^0-9]/g, ""))}
              placeholder="ระบุจำนวนคน"
              style={{
                fontWeight:"bold",
                fontSize: 18,
              }}
            />
          </View>
        </View>

        {/* Remark Section */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-2">หมายเหตุ</Text>
          <TextInput
            className="p-4 border rounded-md h-32 text-gray-800"
            placeholder="คุณสามารถฝากข้อความถึงผู้ขับได้..."
            multiline
          />
        </View>

        <TouchableOpacity className="bg-blue-500 p-4 rounded-md items-center" onPress={hadlereqPrass}>
          <Text className="text-white font-bold">ส่งคำขอ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectDriver;