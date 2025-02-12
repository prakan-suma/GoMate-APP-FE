import React from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

function SearchInput({ placeholder, value, onChangeText, onSearch }) {
  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#9CA3AF',
      borderRadius: 8,
      paddingHorizontal: 10
    }}>
      <Ionicons name="search" size={20} color="#2C64F3" />
      <TextInput
        style={{
          flex: 1,
          marginLeft: 10,
          fontFamily: "ibm-regular",
          textAlign: 'left',
          paddingVertical: 12,
        }}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={() => {
          Keyboard.dismiss(); 
          if (onSearch) onSearch(value); 
        }}
        returnKeyType="search" 
      />
    </View>
  );
}

export default SearchInput;
