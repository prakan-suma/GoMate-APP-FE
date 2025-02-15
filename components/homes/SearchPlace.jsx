import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

export default function SearchPlace({ onLocationSelected }) {
  const GOOGLE_MAP_API_KEY = Constants.expoConfig.extra.GOOGLE_MAP_API_KEY;
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

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

      console.log("Autocomplete Data:", data);
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
      onLocationSelected({ latitude: lat, longitude: lng });

      setQuery("");
      setPlaces([]);
    } catch (error) {
      console.error("Fetch Place Details Error:", error);
    }
  };

  return (
    <View className="absolute w-full z-10 mt-4 px-2">
      {/* Search Box */}
      <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-4 py-2">
        <Ionicons name="search" size={20} color="#2C64F3" />
        <TextInput
          className="flex-1 ml-2"
          placeholder="ค้นหาสถานที่..."
          value={query}
          onChangeText={fetchPlaces}
        />
      </View>

      {/* Result List */}
      {places.length > 0 && (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-3 border-b border-gray-200 bg-white"
              onPress={() => fetchPlaceDetails(item.place_id)}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled" 
          className="max-h-52 bg-white rounded-lg mt-2"
        />
      )}
    </View>
  );
}
