import React from "react";
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import ButtonWithIcon from "@components/ui/ButtonWithIcon";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "@context/LocationContext";
import { Link,useRouter  } from "expo-router";

export default function SelectRoute (){
    const {setlocationUser,setSelectedUserLocation} = useLocation();
    
    const handleBackPress = () => {
        setlocationUser(null);
        setSelectedUserLocation(null);
    };

    return (
        <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View className="w-full py-6 rounded-xl ">
            <View className="w-full flex-row justify-center mb-2">
                <View className="w-1/2 h-1 bg-gray-300 rounded-lg" />
            </View>
            <View className="flex-row items-center mt-4">
                <TouchableOpacity
                    onPress={handleBackPress}
                    className=""
                >
                <Ionicons name="chevron-back" size={24} color="" />
                </TouchableOpacity>
            </View>

        </View>
        </ScrollView>
    );
}
