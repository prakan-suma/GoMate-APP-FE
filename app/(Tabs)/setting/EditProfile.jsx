import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 

function EditProfile() {
    const router = useRouter(); 
    return (
      <View>
        <Text>EditProfile</Text>
      </View>
    );
}

export default EditProfile;
