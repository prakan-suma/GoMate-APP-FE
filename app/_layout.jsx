import { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import "../global.css";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "ibm-regular": require("@assets/fonts/IBMPlexSansThai-Regular.ttf"),
        "ibm-bold": require("@assets/fonts/IBMPlexSansThai-Bold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>; 
  }

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "ibm-regular" };
  
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
      }}
    >
      {[
        { name: "index", label: "Home", icon: "home-outline", iconFocused: "home" },
        { name: "driver", label: "Driver", icon: "car-outline", iconFocused: "car" },
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
              <View className="items-center  ">
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
