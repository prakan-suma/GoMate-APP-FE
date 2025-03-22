import { Tabs } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 68,
          paddingTop: 14,
        },
        tabBarItemStyle: {
          flex: 1,
        },
        tabBarVisible: false,
      }}
    >
      {[
        { name: "home", label: "Home", icon: "home-outline", iconFocused: "home" },
        { name: "trip", label: "Trip", icon: "car-outline", iconFocused: "car" },
        { name: "history", label: "History", icon: "time-outline", iconFocused: "time" },
        { name: "setting", label: "Setting", icon: "settings-outline", iconFocused: "settings" },
      ].map(({ name, label, icon, iconFocused }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
            tabBarIcon: ({ focused }) => (
              <View className="items-center">
                <Ionicons
                  name={focused ? iconFocused : icon}
                  color={focused ? "#2C64F3" : "#7A9FC3"}
                  size={24}
                />
                <Text
                  style={{
                    color: focused ? "#2C64F3" : "#7A9FC3",
                    minWidth: 50,
                    textAlign: "center",
                  }}
                  className="text-sm mt-1"
                >
                  {label}
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}