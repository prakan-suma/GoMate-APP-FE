import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useLocation } from "@context/LocationContext";

function MapViewHome() {
  const {location,locationPlace,locationUser,setdistance,setduration} = useLocation(); 
  const GOOGLE_MAP_API_KEY = Constants.expoConfig.extra.GOOGLE_MAP_API_KEY;
  const [routeInfo, setRouteInfo] = useState({ distance: 0, duration: 0 });



  if(locationPlace === null && locationUser === null){
    return (
      <View style={{ flex: 1 }}>
        {location ? (
          <MapView
            style={{ width: "100%", height: "100%" }}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
          >
          </MapView>
        ) : null}
      </View>
    );
  }
  else if(locationPlace !== null && locationUser === null){
    return (
      <View style={{ flex: 1 }}>
        {location ? (
          <MapView
            style={{ width: "100%", height: "100%" }}
            region={{
              latitude: locationPlace.latitude,
              longitude: locationPlace.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            <Marker
              coordinate={{ latitude: locationPlace.latitude, longitude: locationPlace.longitude }}
              title="Selected Location"
              description="This is the place you searched for"
            />
          </MapView>
        ) : null}
      </View>
    );
  }
  else if(locationPlace !== null && locationUser !== null){
    return (
      <View style={{ flex: 1 }}>
          <MapView
            style={{ width: "100%", height: "100%" }}
            region={{
              latitude: locationUser.latitude,
              longitude: locationUser.longitude,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: locationUser.latitude,
                longitude: locationUser.longitude,
              }}
              title="Your Location"
              description="Current Position"
            />
            <Marker
              coordinate={{
                latitude: locationPlace.latitude,
                longitude: locationPlace.longitude,
              }}
              title="Selected Location"
              description="Destination"
            />
            <MapViewDirections
              origin={{
                latitude: locationUser.latitude,
                longitude: locationUser.longitude,
              }}
              destination={{
                latitude: locationPlace.latitude,
                longitude: locationPlace.longitude,
              }}
              
              apikey={GOOGLE_MAP_API_KEY} 
              strokeWidth={4} 
              strokeColor="blue"
              optimizeWaypoints={true}
              onReady={(result) => {
                  setdistance(Math.round(result.distance));
                  setduration(Math.round(result.duration));
              }}
            />
          </MapView>
      </View>
    );
  }
}

export default MapViewHome;
