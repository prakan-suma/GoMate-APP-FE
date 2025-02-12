import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { View, StyleSheet, Text } from 'react-native';

const MapViewHome = ({ selectedLocation }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    };

    getLocation();
  }, []);

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: selectedLocation?.latitude || location?.latitude || 13.7563,
        longitude: selectedLocation?.longitude || location?.longitude || 100.5018,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {selectedLocation && (
        <Marker coordinate={selectedLocation} title="สถานที่ที่เลือก" />
      )}

      {location && !selectedLocation && (
        <Marker coordinate={location} title="ตำแหน่งปัจจุบัน" />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapViewHome;
