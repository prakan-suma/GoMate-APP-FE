import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import SearchPlace from "@components/homes/SearchPlace";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

function SearchPlaceScreen() {
  const router = useRouter();

  return (
    <View className="p-4 flex-1">
      <View className="flex-row items-center ">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={24} />
        </TouchableOpacity>
        <Text className="text-xl ml-4 font-bold">ค้นหาสถานที่</Text>
      </View>

      <View className="my-6">
        <SearchPlace onClose={() => router.back()} />
      </View>
    </View>
  );
}

export default SearchPlaceScreen;
