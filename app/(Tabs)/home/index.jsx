import Content from "@components/homes/Content";
import MapViewHome from "@components/homes/MapViewHome";
import React, { useRef, useState, useEffect } from "react";
import { View, Animated, ScrollView } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { useLocation } from "@context/LocationContext";
import { useUser } from "@context/UserContext";
import PlaceDetailHome from "@components/homes/PlaceDetailHome";
import SelectRoute from "@components/homes/SelectRoute";
import Constants from "expo-constants";


export default function Home() {
  const API_BE_URL = Constants.expoConfig.extra.API_BE_URL;
  const { location, setLocation, selectedPlace, locationUser} = useLocation();
  const { userID,isDriver } = useUser();
  const [contentHeight, setContentHeight] = useState(300);
  const [isExpanded, setIsExpanded] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const scrollViewRef = useRef(null);
  

  const height = useRef(new Animated.Value(300)).current;
  const lastGesture = useRef(300);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: height } }],
    { useNativeDriver: false }
  );

  const handleGestureEvent = (event) => {
    const { translationY } = event.nativeEvent;
    const newHeight = lastGesture.current - translationY;

    // เมื่อ panel อยู่ในสถานะขยายเต็มที่และมีเนื้อหามากกว่าความสูงที่กำหนด
    // เราจะอนุญาตให้เลื่อนภายในได้เฉพาะเมื่อ ScrollView อยู่ที่ตำแหน่งบนสุด
    if (isExpanded && contentHeight > 300 && translationY < 0) {
      setScrollEnabled(true);
      return;
    }

    if (newHeight >= 35 && newHeight <= 300) {
      height.setValue(newHeight);
      setScrollEnabled(false);
    }
  };

  const handleGestureEnd = (event) => {
    const { velocityY } = event.nativeEvent;
    const currentHeight = height._value;
    const finalHeight = velocityY > 0 || currentHeight < 150 ? 35 : 300;
    lastGesture.current = finalHeight;
    setIsExpanded(finalHeight === 300);

    Animated.spring(height, {
      toValue: finalHeight,
      damping: 16,
      mass: 1,
      stiffness: 150,
      useNativeDriver: false,
    }).start(() => {
      // เปิดใช้งาน scroll หลังจากขยายเต็มที่ ถ้าเนื้อหายาวเกินไป
      if (finalHeight === 300 && contentHeight > 300) {
        setScrollEnabled(true);
      } else {
        setScrollEnabled(false);
      }
    });
  };

  // การจัดการกับการเลื่อน ScrollView
  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    // เปิดใช้งาน gesture เมื่อเลื่อนถึงด้านบนของ ScrollView
    if (contentOffset.y <= 0) {
      setScrollEnabled(false);
    }
  };

  // การตรวจจับความสูงของเนื้อหาที่แท้จริง
  const onContentLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const sendDriverLocationToBackend = async (data) => {
    try {
      const senddata = {
        latitude: data.latitude,
        longitude: data.longitude
      }
      console.log(senddata);
      const response = await fetch(`${API_BE_URL}/v1/live-tracking/driver/${userID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(senddata),
      });
      console.log('Driver Location sent:', await response.json());
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const sendPassengerLocationToBackend = async (data) => {
    try {
      const senddata = {
        latitude: data.latitude,
        longitude: data.longitude
      }
      console.log(senddata);
      const response = await fetch(`${API_BE_URL}/v1/live-tracking/passenger/${userID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(senddata),
      });
      console.log('Passenger Location sent:', await response.json());
    } catch (error) {
      console.error('Error sending data:', error);
    }
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
      
      
    
    if(isDriver){
      sendDriverLocationToBackend(loc.coords);
    };
    sendPassengerLocationToBackend(loc.coords)
    })();
    const interval = setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission denied");
          return;
        }
        let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLocation(loc.coords);
        
        
      
      if(isDriver){
        sendDriverLocationToBackend(loc.coords);
      };
      sendPassengerLocationToBackend(loc.coords)
      })();
    }, 10000);

    //อันนี้เป็นResetเมื่อเรากดเปลียนหน้า
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
    return () => clearInterval(interval);
  }, [selectedPlace]);

  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onEnded={handleGestureEnd}
          enabled={!scrollEnabled}
        >
          <Animated.View
            style={{
              height,
              maxHeight: 500,
              // minHeight: "fit",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 24,
              paddingBottom: 24,
              margin:20,
              zIndex: 20,
              backgroundColor: '#fff',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 1,
            }}
          >
            <ScrollView
              ref={scrollViewRef}
              scrollEnabled={scrollEnabled}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={true}
            // contentContainerStyle={{ paddingTop: 12 }}
            >
              <View onLayout={onContentLayout}>
              {locationUser && selectedPlace ? (
                <SelectRoute/>  
              ) : selectedPlace ? (
                <PlaceDetailHome place={selectedPlace} />  
              ) : (
                <Content/>
              )}
              </View>
            </ScrollView>
          </Animated.View>
        </PanGestureHandler>

        {/* Map View */}
        <MapViewHome/>
      </View>
    </GestureHandlerRootView>
  );
}