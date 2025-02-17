import Content from "@components/homes/Content";
import MapViewHome from "@components/homes/MapViewHome";
import React, { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { useLocation } from "@context/LocationContext";

export default function Home() {
  const { location, setLocation } = useLocation(); // ใช้ location จาก Context

  // Gesture state
  const height = useRef(new Animated.Value(300)).current;
  const lastGesture = useRef(300);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: height } }],
    { useNativeDriver: false }
  );

  const handleGestureEvent = (event) => {
    const { translationY } = event.nativeEvent;
    const newHeight = lastGesture.current - translationY;
    if (newHeight >= 35 && newHeight <= 300) {
      height.setValue(newHeight);
    }
  };

  const handleGestureEnd = (event) => {
    const { velocityY } = event.nativeEvent;
    const currentHeight = height._value;
    const finalHeight = velocityY > 0 || currentHeight < 50 ? 35 : 300;
    lastGesture.current = finalHeight;

    Animated.spring(height, {
      toValue: finalHeight,
      damping: 16,
      mass: 1,
      stiffness: 150,
      useNativeDriver: false,
    }).start();
  };

  // Fetch location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation(loc.coords);
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <PanGestureHandler onGestureEvent={handleGestureEvent} onEnded={handleGestureEnd}>
          <Animated.View
            style={{
              height,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 24,
              paddingBottom: 24,
              zIndex: 20,
            }}
          >
            <Content />
          </Animated.View>
        </PanGestureHandler>

        {/* Map View */}
        <MapViewHome />
      </View>
    </GestureHandlerRootView>
  );
}
