import React, { useState,useEffect } from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import SearchPlace from "@components/homes/SearchPlace";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from '@context/LocationContext';
import { useUser } from "@context/UserContext";
import { useTrip } from "@context/TripContext";
import Constants from "expo-constants";

export default function TripDetailContent(){
    const {Role} = useUser();
    const {distance,duration} = useLocation();
    const {Trippagedata,setTrippagedata} = useTrip();
    const [TripData, setTripData] = useState([]);

    const API_BE_URL = Constants.expoConfig.extra.API_BE_URL;

    const handleCancel = async (bookingId) => {
        if (!bookingId) {
            console.log('Invalid booking ID');
            return;
        }
    
        try {
            const response = await fetch(`${API_BE_URL}/v1/booking/${bookingId}`, {
                method: 'DELETE',  // Corrected the HTTP method here
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_ACCESS_TOKEN`  // Replace with actual token
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(errorData.message || 'Failed to cancel booking');
            }
    
            const result = await response.json();
            console.log('Booking cancelled successfully!', result);
    
            await fetchTripData();  // Assuming fetchTripData fetches the updated trip data
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    };
    

    const handleUpdate = async (bookingId) => {
        if (!bookingId) {
          console.log('Invalid booking ID');
          return;
        }
      
        try {
          const response = await fetch(`${API_BE_URL}/v1/booking/${bookingId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            },
            body: JSON.stringify({ status: "confirmed" }),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(errorData.message || 'Failed to update data');
          }
      
          const result = await response.json();
          console.log('Data updated successfully!', result);
          await fetchTripData();
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };
      

    const fetchTripData = async () => {
        try {
            const response = await fetch(`${API_BE_URL}/v1/trips/${Trippagedata.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setTripData(result);
            setTrippagedata(result);
        } catch (error) {
            console.log(error.message);
        } 
    };

    const ShowPassengerReq = (data) =>{
        if (data) {
            if(data.status == "pending"){
                return(
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20,
                        backgroundColor: "#FFF",
                        borderRadius: 8,
                        elevation: 1,
                        marginVertical: 5,
                      }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.passenger.name}</Text>
                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <Ionicons name="star" size={14} color="#2C64F3" />
                                <Ionicons name="star" size={14} color="#2C64F3" />
                                <Ionicons name="star" size={14} color="#2C64F3" />
                                <Ionicons name="star" size={14} color="#313C59" />
                                <Ionicons name="star" size={14} color="#313C59" />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity style={{
                                backgroundColor: "#1877F2",
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                borderRadius: 5,
                            }} onPress={() => handleUpdate(data.id)}>
                                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }} >ยอมรับ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: "#B0B0B0",
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                borderRadius: 5,
                            }} onPress={() => handleCancel(data.id)}>
                                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>ปฏิเสธ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }
        }
    }
    const ShowPassenger = (data) =>{
        if (data) {
            if(data.status == "confirmed"){
                return(
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20,
                        backgroundColor: "#FFF",
                        borderRadius: 8,
                        elevation: 1,
                        marginVertical: 5,
                      }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.passenger.name}</Text>
                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <Ionicons name="star" size={14} color="#2C64F3" />
                                <Ionicons name="star" size={14} color="#2C64F3" />
                                <Ionicons name="star" size={14} color="#2C64F3" />
                                <Ionicons name="star" size={14} color="#313C59" />
                                <Ionicons name="star" size={14} color="#313C59" />
                            </View>
                        </View>
                    </View>
                );
            }
        }
    }

    useEffect(() => {
        fetchTripData();
    }, []);

    if(Role){
        return (
            <View className="p-4 flex-1">
                <View className="w-full flex-row justify-center mb-2">
                    <View className="w-1/2 h-1 bg-gray-300 rounded-lg" />
                </View>
                <View className="flex-row items-center mt-4">
                    <Text className="font-bold text-2xl ">คำขอเป็นผู้โดยสาร</Text>
                </View>
                {TripData?.bookings?.map((item) => (
                    ShowPassengerReq(item)
                ))}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 ,marginBottom:15}}>
                    <View style={{backgroundColor: '#CACACA',height: 2,flex: 1,}}/>
                </View>
                <View className="flex-row items-center mt-4">
                    <Text className="font-bold text-2xl ">ผู้โดยสาร</Text>
                </View>
                {TripData?.bookings?.map((item) => (
                    ShowPassenger(item)
                ))}
            </View>
        );
    }
    else{
        return (
            <View className="p-4 flex-1">
            {/* Header Bar */}
            <View className="w-full flex-row justify-center mb-4">
                <View className="w-1/2 h-1 bg-gray-300 rounded-lg" />
            </View>

            {/* Title Section */}
            <View className="flex-row items-center mb-6">
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>ทริปของคุณ</Text>
            </View>

            {/* Distance Section */}
            <View className="flex-row items-center mb-4">
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>ระยะทางการเดินทางของคุณ {distance} กม.</Text>
            </View>

            {/* Duration Section */}
            <View className="flex-row items-center mb-4">
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>ระยะเวลาการเดินทางของคุณ {duration} นาที</Text>
            </View>

            {/* Buttons Section */}
            <TouchableOpacity
                style={{
                backgroundColor: '#1877F2',
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: 'center',
                marginBottom: 12,
                }}
            >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>สิ้นสุดการเดินทาง</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                backgroundColor: '#B0B0B0',
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: 'center',
                }}
            >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ยกเลิก</Text>
            </TouchableOpacity>
            </View>
        );
    }
}
