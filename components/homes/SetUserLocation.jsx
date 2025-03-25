import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "@context/LocationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function SetUserLocation({ onClose }){
    const GOOGLE_MAP_API_KEY = Constants.expoConfig.extra.GOOGLE_MAP_API_KEY;
    const [query, setQuery] = useState("");
    const [userlocation, set_userlocation] = useState([]);

    const [searchHistory, setSearchHistory] = useState([]);
    const [searchHistoryVisible, setSearchHistoryVisible] = useState(true);
    const {setlocationUser,setSelectedUserLocation,selectedPlace,location} = useLocation();
    
    const handlePressNowLoacation = async () => {
      // ดึงตำแหน่งปัจจุบันของผู้ใช้
      if (location) {
        // เมื่อมีตำแหน่งของผู้ใช้
        setlocationUser({ latitude: location.latitude, longitude: location.longitude });
  
        // ใช้ Google Maps API เพื่อค้นหาข้อมูลสถานที่จาก latitude, longitude
        const placeDetails = await fetchPlaceDetailsByCoordinates(location.latitude, location.longitude);
  
        // เมื่อได้รับข้อมูลจาก Google Maps API
        if (placeDetails) {
          setSelectedUserLocation(placeDetails); // อัพเดทข้อมูลสถานที่
        }
      }
      if (onClose) {
        onClose();
      }
    };
  
    // ฟังก์ชันค้นหาข้อมูลสถานที่โดยใช้ latitude และ longitude
    const fetchPlaceDetailsByCoordinates = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API_KEY}`
        );
        const data = await response.json();
  
        if (data.status !== "OK") {
          console.error("Error fetching place details:", data.error_message || data.status);
          return null;
        }
  
        // ดึงข้อมูลที่จำเป็นจากผลลัพธ์
        const placeDetails = data.results[0];
        return {
          name: placeDetails.formatted_address,
          address: placeDetails.formatted_address,
          photos: placeDetails.photos || [],
        };
      } catch (error) {
        console.error("Fetch Place Details Error:", error);
        return null;
      }
    };

    const loadSearchHistory = async () => {
        try {
          const history = await AsyncStorage.getItem("searchHistory");
          if (history !== null) {
            setSearchHistory(JSON.parse(history));
          }
        } catch (error) {
          console.error("Error loading search history:", error);
        }
      };
    
      useEffect(() => {
        loadSearchHistory();
      }, []);
    
    
    const fetchPlaces = async (text) => {
        setQuery(text);
        if (text.length < 3) return;

        try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&language=en&region=th&key=${GOOGLE_MAP_API_KEY}`
        );
        const data = await response.json();

        if (data.status !== "OK") {
            console.error("Error fetching places:", data.error_message || data.status);
            return;
        }

        set_userlocation(data.predictions);
        } catch (error) {
        console.error("Fetch Places Error:", error);
        }
    };

    const fetchPlaceDetails = async (placeId) => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAP_API_KEY}`
          );
          const data = await response.json();
    
          if (data.status !== "OK") {
            console.error("Error fetching place details:", data.error_message || data.status);
            return;
          }
    
          const { lat, lng } = data.result.geometry.location;
          
          // dataset for selected place 
          const UserLocationDetails = {
            name:data.result.name,
            address: data.result.formatted_address,
            photos: data.result.photos || [],
          };
    
          setlocationUser({ latitude: lat, longitude: lng });
          setSelectedUserLocation(UserLocationDetails);
    
          setQuery("");
          set_userlocation([]);
          setSearchHistoryVisible(true);
    
          addSearchHistory(UserLocationDetails.name);
    
          if (onClose) {
            onClose();
          }
        } catch (error) {
          console.error("Fetch Place Details Error:", error);
        }
      };

    const addSearchHistory = async (place) => {
        const newHistory = [place, ...searchHistory];
        const uniqueHistory = [...new Set(newHistory)];
        if (uniqueHistory.length > 5) {
        uniqueHistory.pop();
        }

        setSearchHistory(uniqueHistory);
        await AsyncStorage.setItem("searchHistory", JSON.stringify(uniqueHistory));
    };

    const handleHistoryItemPress = (uselocationName) => {
        setQuery(uselocationName);
        fetchPlaces(uselocationName);
        setSearchHistoryVisible(false);
    };



    return (
      <View className="w-full my-2">
        {/* Search Box */}
        <View style={{flexDirection: "row",alignItems: "center",padding:10,marginRight:25,}}>
            <Ionicons name="ellipse-outline" size={20} color="#2C64F3" style={{paddingRight:10}}/>
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-4 py-1" style={{borderColor:"#2C64F3"}}>
                <TextInput
                    className="flex-1 ml-2"
                    placeholder="ค้นหาตำแหน่งของคุณ"
                    value={query}
                    onChangeText={fetchPlaces}
                    onFocus={() => setSearchHistoryVisible(false)}
                    onBlur={() => setSearchHistoryVisible(true)}
                    style={{fontSize: 18}}
                />
            </View>
        </View>
        <View style={{flexDirection: "row",alignItems: "center",padding:10,marginRight:25,}}>
            <Ionicons name="location-outline" size={25} color="#F49C26" style={{paddingRight:5}}/>
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-4 py-1" >
                <TextInput
                    className="flex-1 ml-2"
                    value={selectedPlace.name}
                    readOnly
                />
            </View>
        </View>
        <TouchableOpacity className="flex-row p-3 border-b border-slate-200" onPress={() => handlePressNowLoacation() }>
            <Ionicons name="locate-outline" size={20} color="#2C64F3" />
            <Text className="ml-4 text-slate-600" style={{color: "#2C64F3",}}>ตำแหน่งของคุณ</Text>
        </TouchableOpacity>

        {/* แสดงประวัติการค้นหาล่าสุด */}
        {searchHistoryVisible && searchHistory.length > 0 && (
            <View className="mt-4">
                <FlatList
                    data={searchHistory}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="flex-row p-3 border-b border-slate-200"
                        onPress={() => handleHistoryItemPress(item)}
                      >
                        <Ionicons name="time-outline" size={20} color="#6b7280" />
                        <Text className="ml-3 text-gray-700">{item}</Text>
                      </TouchableOpacity>
                    )}
                />
            </View>
        )}
        {/* แสดงผลลัพธ์การค้นหาสถานที่ */}
        {userlocation.length > 0 && (
            <FlatList
                data={userlocation}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                <TouchableOpacity
                    className="flex-row p-3 border-b border-slate-200"
                    onPress={() => fetchPlaceDetails(item.place_id)}
                >
                    <Ionicons name="location-outline" size={24} color="#475569" />
                    <Text className="ml-4 text-slate-600">{item.description}</Text>
                </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="handled"
                className="max-h-fit rounded-lg mt-2"
            />
        )}

      </View>
    );
}
