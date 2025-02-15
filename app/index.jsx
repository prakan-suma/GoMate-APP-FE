import Content from "@components/homes/Content";
import MapViewHome from "@components/homes/MapViewHome";
import React, { useRef, useState } from "react";
import { View, Animated } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

export default function Home() {
  // Home const
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

    const threshold = 50;
    const shouldCollapse = velocityY > 0 || currentHeight < threshold;
    const finalHeight = shouldCollapse ? 35 : 300;
    lastGesture.current = finalHeight;

    Animated.spring(height, {
      toValue: finalHeight,
      damping: 16,
      mass: 1,
      stiffness: 150,
      useNativeDriver: false,
    }).start();
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={{ flex: 1 }} />
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onEnded={handleGestureEnd}
        >
          <Animated.View
            style={{
              height,
              position: 'absolute',
              bottom: 0,
              zIndex: 20,
              left: 0,
              right: 0,
              paddingHorizontal: 24,
              paddingBottom: 24,
            }}
          >
            <Content />
          </Animated.View>
        </PanGestureHandler>

        <View className="w-full h-full">
          <MapViewHome />
        </View>

      </View>
    </GestureHandlerRootView>
  );
}
