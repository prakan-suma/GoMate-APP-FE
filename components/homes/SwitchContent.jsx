import React, { Component,useEffect,useState } from 'react';
import { View, Text,TextInput , TouchableOpacity,Button} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useUser } from '@context/UserContext';
import { useTrip } from '@context/TripContext';


const SwitchContent = () => {
    const {creattripdata,setcreattripdata} = useTrip();
    const [passengerCount, setPassengerCount] = useState("1");
    const [fare, setFare] = useState('1');
    const { Role, setRole } = useUser();

    const handleFareChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setFare(numericText);
      };
    
      const handlePassengerChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setPassengerCount(numericText);
      };
    
      useEffect(() => {
        const fareValue = parseInt(fare) || 0;
        const passengerValue = parseInt(passengerCount) || 1;
        setcreattripdata({ Fare: fareValue, available_seats: passengerValue });
      }, [fare, passengerCount, setcreattripdata,Role]);
    

    if (Role === true) {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
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
                    marginBottom: 10,
                }}>
                    <Ionicons name="person-outline" size={24} color="#2C64F3" />
                    <TextInput
                        value={passengerCount}
                        keyboardType="numeric"
                        onChangeText={handlePassengerChange}
                        style={{
                            flex: 1,
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: "#2C64F3",
                            textAlign: "center",
                        }}
                    />
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text className="text-gray-800 font-bold">ค่าโดยสาร</Text>
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
                    <Ionicons name="cash-outline" size={24} color="#2C64F3" />
                    <TextInput
                        value={fare}
                        keyboardType="numeric"
                        onChangeText={handleFareChange}
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
};

export default SwitchContent;



