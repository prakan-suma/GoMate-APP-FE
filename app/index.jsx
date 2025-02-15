import Content from "@components/homes/Content";
import MapViewHome from "@components/homes/MapViewHome";
import SearchPlace from "@components/homes/SearchPlace";
import React, { useRef, useState, useEffect } from "react";
import { View, Animated } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import * as Location from "expo-location";

export default function Home() {
  // Home const
  const height = useRef(new Animated.Value(300)).current;
  const lastGesture = useRef(300);

  // Map const
  const [location, setLocation] = useState(null);


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

  // map fetch 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
  
      const getLocation = async () => {
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        console.log("Current Location:", loc.coords);
        setLocation(loc.coords);
      };
  
      await getLocation();
  
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (loc) => {
          console.log("Updated Location:", loc.coords);
          setLocation((prev) => ({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          }));
        }
      );
  
      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);
  // end map fetch 

  console.log("MapViewHome Location:", location);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
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

        {/* search bar */}
        <View>
          <SearchPlace onLocationSelected={setLocation}/>
        </View>

        {/* map view  */}
        <View className="w-full h-full">
          <MapViewHome location={location} />
        </View>

      </View>
    </GestureHandlerRootView>
  );
}
