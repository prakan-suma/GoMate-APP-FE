import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function MapViewHome({ location }) {
  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={{
            width: "100%",
            height: "100%",
          }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Search Result"
            description="This is the place you searched for"
          />
        </MapView>
      ) : null}
    </View>
  );
}

export default MapViewHome;
