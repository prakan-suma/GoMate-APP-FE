import React from 'react';
import { View } from 'react-native'
import MapView from 'react-native-maps'

function MapViewHome({location}) {
  return (
    <View className='flex-1'>
    {location ? (
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
      </MapView>
    ) : null}
  </View>
  )
}

export default MapViewHome

