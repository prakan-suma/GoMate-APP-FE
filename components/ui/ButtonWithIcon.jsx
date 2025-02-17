import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from 'react-native';
function ButtonWithIcon({ iconName, iconColor, text, bg }) {
  return (
    <TouchableOpacity className={`flex-1 items-center px-4 py-1  rounded-lg ${bg}`} >
      <Ionicons name={iconName} size={22} color={iconColor} />
      <Text className="text-white text-sm" >{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonWithIcon