import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LocationBanner = ({ location }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 20,
        left: 75,
        right: 75,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Ionicons name="location-outline" size={24} color="#FFA500" />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
        {location}
      </Text>
    </View>
  );
};

export default LocationBanner;
