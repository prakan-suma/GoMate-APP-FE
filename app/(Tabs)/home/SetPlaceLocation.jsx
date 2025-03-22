import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SetUserLocation from "@components/homes/SetUserLocation";
import { useLocation } from "@context/LocationContext";

function SetPlaceLocation() {
    const router = useRouter();
    const {setlocationUser} = useLocation();

    return (
      <View className="p-4 flex-1">
            <View className="flex-row items-center ">
              <TouchableOpacity onPress={() => {setlocationUser(null); router.back();}}>
                <Ionicons name="chevron-back-outline" size={24} />
              </TouchableOpacity>
              <Text className="text-xl ml-4 font-bold">เลือกจุดหมาย</Text>
            </View>
            <View className="my-6">
              <SetUserLocation onClose={() => router.back()}/>
            </View>
        </View>
    );
}

export default SetPlaceLocation;

