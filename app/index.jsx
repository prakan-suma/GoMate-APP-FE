import Content from "@components/homes/Content";
import React, { useRef, useState } from "react";
import { View, Animated } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import MapViewHome from "@components/homes/MapViewHome";

export default function Home() {
  // Home const
  const height = useRef(new Animated.Value(300)).current;
  const lastGesture = useRef(300);

  // Map const
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  // เมื่อผู้ใช้เลือกสถานที่จาก autocomplete
  const handlePlaceSelected = (place) => {
    console.log('Selected place:', place);
    // คุณสามารถใช้ place.place_id เพื่อติดต่อ API เพิ่มเติม เช่น Place Details API
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      setSelectedLocation({ latitude: lat, longitude: lng });
    }
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
            <Content setSelectedLocation={setSelectedLocation} />
          </Animated.View>
        </PanGestureHandler>
        
        
        {/* Render MapViewHome เมื่อเลือกสถานที่ */}
        <MapViewHome selectedLocation={selectedLocation} />
      </View>
    </GestureHandlerRootView>
  );
}
