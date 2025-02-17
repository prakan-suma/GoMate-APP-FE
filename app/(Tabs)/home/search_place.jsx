import React from "react";
import { View } from "react-native";
import SearchPlace from "@components/homes/SearchPlace";
import { useRouter } from "expo-router"; 

function SearchPlaceScreen() {
  const router = useRouter();

  return (
    <View className="p-4">
       <SearchPlace onClose={() => router.back()} /> 
    </View>
  );
}

export default SearchPlaceScreen;
