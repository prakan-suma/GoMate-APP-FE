import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import * as Font from "expo-font";
import '../global.css'

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

  Text.defaultProps = {
    ...Text.defaultProps,
    style: [
      { fontFamily: "ibm-regular" },
      Text.defaultProps?.style  
    ]
  };

  return <Stack screenOptions={{headerShown:false}}/>;
}