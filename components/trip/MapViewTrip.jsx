import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useLocation } from "@context/LocationContext";
import { useUser } from "@context/UserContext";
import { useTrip } from "@context/TripContext";

function MapViewTrip() {
    const { location, setdistance, setduration } = useLocation(); 
    const { Role } = useUser(); 
    const { Trippagedata } = useTrip(); 
    const [PassengerLocation, setPassengerLocation] = useState([]);
    const [DriverLocation, setDriverLocation] = useState(null);
    const GOOGLE_MAP_API_KEY = Constants.expoConfig.extra.GOOGLE_MAP_API_KEY;
    const API_BE_URL = Constants.expoConfig.extra.API_BE_URL;

    const fetchDriverLocation = async () => {
        try {
            const response = await fetch(`${API_BE_URL}/v1/live-tracking/driver/${Trippagedata.driver_id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setDriverLocation(result);
        } catch (error) {
            console.error("Error fetching driver location:", error.message);
        }
    };

    const fetchPassengerLocation = async () => {
        try {
            const tempData = [];
            if (Trippagedata.bookings && Array.isArray(Trippagedata.bookings)) {
                const promises = Trippagedata.bookings.map(async (item) => {
                    if(item.status == "confirmed"){
                        const response = await fetch(`${API_BE_URL}/v1/live-tracking/passenger/${item.passenger_id}`);
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const result = await response.json();
                        tempData.push(result);
                    }
                });
                await Promise.all(promises);
                setPassengerLocation(tempData);
            }
        } catch (error) {
            console.error('Error fetching passenger data:', error);
        }
    };

    useEffect(() => {
        if (Role) {
            fetchPassengerLocation();
        } else {
            fetchDriverLocation();
        }

        const interval = setInterval(() => {
            if (Role) {
                fetchPassengerLocation();
            } else {
                fetchDriverLocation();
            }
        }, 10000); // Refresh every 10 seconds

        return () => clearInterval(interval);
    }, [Role, Trippagedata]);

    if (!location || !Trippagedata || !location.latitude || !location.longitude) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading map...</Text>
            </View>
        );
    }

    if (Role) {
        // Passenger view
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ width: "100%", height: "100%" }}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.07,
                        longitudeDelta: 0.07,
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                    {PassengerLocation.map((item) => (
                        <Marker
                            key={item.passenger_id}
                            coordinate={{
                                latitude: item.location.latitude,
                                longitude: item.location.longitude,
                            }}
                            image={require('../../assets/images/Passenger.png')}
                            style={{ width: 4, height: 4 }}
                        />
                    ))}
                    <Marker
                        coordinate={{
                            latitude: parseFloat(Trippagedata.latitude_des),
                            longitude: parseFloat(Trippagedata.longitude_des),
                        }}
                        title="Destination"
                        description="Selected Location"
                    />
                    <MapViewDirections
                        origin={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        destination={{
                            latitude: parseFloat(Trippagedata.latitude_des),
                            longitude: parseFloat(Trippagedata.longitude_des),
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

    // Driver view
    if (!Role && DriverLocation && DriverLocation.location) {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ width: "100%", height: "100%" }}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.07,
                        longitudeDelta: 0.07,
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                    <Marker
                        coordinate={{
                            latitude: DriverLocation.location.latitude,
                            longitude: DriverLocation.location.longitude,
                        }}
                        title="Driver"
                        image={require('../../assets/images/Car_on_Map.png')}
                        style={{ width: 4, height: 4 }}
                    />
                    <Marker
                        coordinate={{
                            latitude: parseFloat(Trippagedata.latitude_des),
                            longitude: parseFloat(Trippagedata.longitude_des),
                        }}
                        title="Destination"
                        description="Selected Location"
                    />
                    <MapViewDirections
                        origin={{
                            latitude: DriverLocation.location.latitude,
                            longitude: DriverLocation.location.longitude,
                        }}
                        destination={{
                            latitude: parseFloat(Trippagedata.latitude_des),
                            longitude: parseFloat(Trippagedata.longitude_des),
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

    return null; // If none of the above conditions are met, render nothing
}

export default MapViewTrip;
