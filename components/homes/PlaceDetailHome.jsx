import React from "react";
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import ButtonWithIcon from "@components/ui/ButtonWithIcon";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "@context/LocationContext";

export default function PlaceDetailHome({ place }) {
  const GOOGLE_MAP_API_KEY = Constants.expoConfig.extra.GOOGLE_MAP_API_KEY;
  const { setSelectedPlace } = useLocation();

  const handleBackPress = () => {
    setSelectedPlace(null);
  };

  return (
    <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{ paddingBottom: 20 }}
    nestedScrollEnabled={true}
    showsVerticalScrollIndicator={false}
    scrollEventThrottle={16}
  >
      <View className="w-full py-6 rounded-xl ">
        <View className="w-full flex-row justify-center mb-2">
          <View className="w-1/2 h-1 bg-gray-300 rounded-lg" />
        </View>

        <View className="flex-row items-center mt-4">
          <TouchableOpacity
            onPress={handleBackPress}
            className=""
          >
            <Ionicons name="chevron-back" size={24} color="" />
          </TouchableOpacity>

          <Text className="font-bold text-xl ml-4">{place.name}</Text>
        </View>

        <View className="flex-row gap-2 justify-around my-6">
          <ButtonWithIcon iconName={"car"} iconColor={"white"} text={"เดินทาง"} bg={"bg-blue-500"} />
          <ButtonWithIcon iconName={"bookmark"} iconColor={"white"} text={"บันทึก"} bg={"bg-slate-400"} />
          <ButtonWithIcon iconName={"copy"} iconColor={"white"} text={"คัดลอก"} bg={"bg-slate-400"} />
          <ButtonWithIcon iconName={"share"} iconColor={"white"} text={"แชร์"} bg={"bg-slate-400"} />
        </View>

        <Text className="text-slate-500 text-sm mb-4">{place.address}</Text>

        {place?.photos?.length > 0 && (
          <FlatList
            data={place.photos}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${GOOGLE_MAP_API_KEY}`,
                }}
                style={{ width: 200, height: 150, borderRadius: 8, marginRight: 8 }}
              />
            )}
          />
        )}
      </View>
    </ScrollView>
  );
}