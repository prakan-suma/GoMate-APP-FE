import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

function MapViewHome() {
  const [location, setLocation] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const getLocation = async () => {
        let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLocation(loc.coords);
      };

      getLocation();
      const locationSubscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (loc) => {
          setLocation(loc.coords);
        }
      );

      return () => {
        locationSubscription.then((sub) => sub.remove());
      };
    })();
  }, []);

  return (
    <View className='flex-1'>
    {location && (
      <MapView
        style={{
          width:"100%",
          height:"100%",
        }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {/* <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          
        /> */}
      </MapView>
    )}
  </View>
  )
}

export default MapViewHome

