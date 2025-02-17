import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "@context/LocationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchPlace({ onClose }) {
  const GOOGLE_MAP_API_KEY = Constants.expoConfig.extra.GOOGLE_MAP_API_KEY;
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchHistoryVisible, setSearchHistoryVisible] = useState(true); // สถานะในการแสดงประวัติการค้นหา
  const { setLocation } = useLocation();

  // ฟังก์ชันเพื่อดึงประวัติการค้นหาจาก AsyncStorage
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

  // ฟังก์ชันเพื่อค้นหาสถานที่
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

      setPlaces(data.predictions);
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
      const placeName = data.result.name;
      setLocation({ latitude: lat, longitude: lng });

      setQuery("");
      setPlaces([]);
      setSearchHistoryVisible(true); // รีเซ็ตสถานะให้แสดงประวัติการค้นหาหลังจากกดค้นหา

      addSearchHistory(placeName);

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Fetch Place Details Error:", error);
    }
  };

  // ฟังก์ชันเพื่อบันทึกประวัติการค้นหา
  const addSearchHistory = async (place) => {
    const newHistory = [place, ...searchHistory];
    const uniqueHistory = [...new Set(newHistory)];
    if (uniqueHistory.length > 5) {
      uniqueHistory.pop();
    }

    setSearchHistory(uniqueHistory);
    await AsyncStorage.setItem("searchHistory", JSON.stringify(uniqueHistory));
  };

  // ฟังก์ชันเมื่อกดที่ประวัติการค้นหา
  const handleHistoryItemPress = (placeName) => {
    setQuery(placeName); // ตั้งค่า query เป็นชื่อที่เลือกจากประวัติ
    fetchPlaces(placeName); // เรียกค้นหาทันที
    setSearchHistoryVisible(false); // ซ่อนประวัติการค้นหา
  };

  return (
    <View className="w-full my-2">
      {/* Search Box */}
      <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-4 py-1">
        <Ionicons name="search" size={20} color="#2C64F3" />
        <TextInput
          className="flex-1 ml-2"
          placeholder="ค้นหาสถานที่..."
          value={query}
          onChangeText={fetchPlaces}
          onFocus={() => setSearchHistoryVisible(false)}  // ซ่อนประวัติเมื่อคลิกช่องค้นหา
          onBlur={() => setSearchHistoryVisible(true)}    // แสดงประวัติเมื่อไม่ได้โฟกัสช่องค้นหา
        />
      </View>

      {/* แสดงประวัติการค้นหาล่าสุด */}
      {searchHistoryVisible && searchHistory.length > 0 && (
        <View className="mt-4">
          <Text className="font-bold text-gray-700 mb-2">ค้นหาล่าสุด</Text>
          <FlatList
            data={searchHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row p-3 border-b border-slate-200"
                onPress={() => handleHistoryItemPress(item)} // ค้นหาทันทีเมื่อคลิกที่ประวัติ
              >
                <Ionicons name="time-outline" size={20} color="#6b7280" />
                <Text className="ml-3 text-gray-700">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* แสดงผลลัพธ์การค้นหาสถานที่ */}
      {places.length > 0 && (
        <FlatList
          data={places}
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
