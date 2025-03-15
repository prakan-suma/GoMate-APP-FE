import React, { Component,useEffect,useState } from 'react';
import { View, Text,TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


const SwitchContent = ({value}) => {
    const [passengerCount, setPassengerCount] = useState("1");
    useEffect(() => {
        if(passengerCount == "0"){
            setPassengerCount("1")
        }
    })
    if (value === true) {
        return (
            <View>
                <View style={{marginBottom: 10,}}>
                    <Text className="text-gray-800 font-bold">เปิดรับผู้โดยสารจำนวน</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#E5EAEE",
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 1,
                    width: 90,
                }}>
                    <Ionicons name="person-outline" size={24} color="#2C64F3" />
                    <TextInput
                        value={passengerCount}
                        keyboardType="numeric"
                        onChangeText={setPassengerCount}
                        style={{
                            flex: 1,
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: "#2C64F3",
                            textAlign: "center",
                        }}
                    />
                </View>
            </View>
          );
    }
}

export default SwitchContent;


