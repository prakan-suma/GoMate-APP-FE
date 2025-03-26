import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView,StyleSheet, TouchableOpacity,TextInput,Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "@context/LocationContext";
import { useRouter  } from "expo-router";
import Constants from "expo-constants";
import { useUser } from "@context/UserContext";
import { useTrip } from "@context/TripContext";

export default function SelectRoute (){
    const router = useRouter();
    const {setSelectedPlace,setLocationPlace,setlocationUser,setSelectedUserLocation,selectedUserLocation,selectedPlace,distance, setdistance,duration, setduration,locationPlace,location} = useLocation();
    const {setselectDriver,creattripdata} = useTrip();
    const {Role,setRole,userID} = useUser();
    const API_BE_URL = Constants.expoConfig.extra.API_BE_URL;
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const currentDate = new Date();
    const localDate = currentDate.getFullYear() +
    '-' + String(currentDate.getMonth() + 1).padStart(2, '0') +
    '-' + String(currentDate.getDate()).padStart(2, '0') +
    'T' + String(currentDate.getHours()).padStart(2, '0') +
    ':' + String(currentDate.getMinutes()).padStart(2, '0') +
    ':' + String(currentDate.getSeconds()).padStart(2, '0');

    const [driverNearME, setDriverNearME] = useState(null);
    const [Trips, setTrips] = useState(null);
    const [filteredTrips, setFilteredTrips] = useState([]);

    const handleCreateTrip = async () => {
        const data = {
            driver_id: userID,
            origin: selectedUserLocation?.name,
            destination: selectedPlace?.name,
            latitude_des: locationPlace?.latitude?.toString(),
            longitude_des: locationPlace?.longitude?.toString(),
            departure_time: localDate,
            available_seats: creattripdata?.available_seats,
            fare: creattripdata?.Fare,
        };
    
        console.log('Data being sent to API:', data); // เพิ่มการ log ข้อมูล
    
        if (!data.origin || !data.destination || !data.latitude_des || !data.longitude_des || !data.departure_time || !data.available_seats || !data.fare) {
            console.log("Error: Some required fields are missing");
            return;
        }
    
        try {
            const response = await fetch(`${API_BE_URL}/v1/trips/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
            if (response.ok) {
                console.log('Success', 'Trip created successfully');
            } else {
                console.log('Error occurred', result.detail || 'Unable to create Trip');
            }
        } catch (error) {
            console.log('Error', error.message);
        }
    };
    
    const handleBackPress = () => {
        setlocationUser(null);
        setSelectedUserLocation(null);
        setdistance(null);
        setduration(null);
    };

    const handleSelectDriver = (data) => {
        setselectDriver(data)
        router.push("/home/SelectDriver")
      };

    const hadleCreateTripPrass = () => {
        if(creattripdata.available_seats && creattripdata.available_seats != 0 && creattripdata.Fare && creattripdata.Fare != 0 ){
            setSelectedPlace(null);
            setLocationPlace(null);
            setSelectedUserLocation(null);
            setlocationUser(null);
            setdistance(null);
            setduration(null);
            handleCreateTrip();
            setRole(true);
            router.push("/(Tabs)/trip")
        }
        else if(!creattripdata.available_seats|| creattripdata.available_seats == 0){
            Alert.alert("กรุณาใส่จำนวนที่นั้ง");
            return;
        }
        else if(!creattripdata.Fare|| creattripdata.Fare == 0){
            Alert.alert("กรุณาใส่จำนวนค่าโดยสาร");
            return;
        }
    }

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // Earth's radius in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };
    
    const fetchDriverNearME = async () => {
        try {
            const response = await fetch(`${API_BE_URL}/v1/live-tracking/passengers/nearby-drivers/1?latitude=${location.latitude}&longitude=${location.longitude}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result.drivers; // ส่งคืนค่าแทนการเซ็ต State ทันที
        } catch (error) {
            console.error('Error fetching nearby drivers:', error);
            return [];
        }
    };
    
    const fetchTripsByDriver = async (driverId) => {
        try {
            const response = await fetch(`${API_BE_URL}/v1/trips/?user_ids=${driverId}&skip=0&limit=100`);
            if (!response.ok) {
                throw new Error('Failed to fetch trips');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching trips:', error);
            return [];
        }
    };
    
    const searchTrip = async () => {
        setLoading(true);
        try {
            const drivers = await fetchDriverNearME();
            if (!drivers || drivers.length === 0) {
                setFilteredTrips([]);
                return;
            }
    
            let allTrips = [];
            for (const driver of drivers) {
                const trips = await fetchTripsByDriver(driver.driver_id);
                allTrips = [...allTrips, ...trips];
            }
    
            const filteredTrips = allTrips.filter(trip => {
                const distance = haversineDistance(
                    locationPlace.latitude, locationPlace.longitude,
                    trip.latitude_des, trip.longitude_des
                );
                return distance <= 5;
            });
    
            setFilteredTrips(filteredTrips);
            console.log(filteredTrips);
        } catch (error) {
            console.error('Error in searchTrip:', error);
        } finally {
            setLoading(false);
        }
    };
    
    // เรียก searchTrip ทุกครั้งที่ Component โหลดหรือ Role เปลี่ยน
    useEffect(() => {
        if (!Role) {
            searchTrip();
        }
    }, [Role]);

    if(Role){
        return (
            <ScrollView
            style={{ flex: 1 }} 
            contentContainerStyle={{ paddingBottom: 20 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            <View className="w-full py-6 rounded-xl ">
                <View className="w-full flex-row justify-center mb-2">
                    <View className="w-1/2 h-1 bg-gray-300 rounded-lg" />
                </View>
                <View className="flex-row items-center mt-4">
                    <TouchableOpacity
                        onPress={handleBackPress}
                        className=""
                    >
                    <Ionicons name="chevron-back" size={24} color="" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10 }}>
                        เลือกเส้นทาง
                    </Text>
                </View>
                <View style={{paddingTop: 10,paddingLeft:15}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -2 }}>
                    {/* -2ผมรู้ว่าไม่ควร But ผมขี้เกียจละ */}
                    <View
                        style={{
                            backgroundColor: '#2C64F3',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 5,
                        }}
                        >
                        <Text style={{ color: '#fff',fontSize: 18, fontWeight: 'bold' }}>{duration} นาที</Text>
                        </View>
                    </View>

                    {/* เส้นสีฟ้า */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                        style={{
                            backgroundColor: '#2C64F3',
                            height: 2,
                            flex: 0.2, 
                        }}
                        />
                        <View
                        style={{
                            backgroundColor: '#2C64F3',
                            height: 2,
                            flex: 0.8,
                        }}
                        />
                    </View>
                    
                </View>
                

                <View style={{ padding: 20 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 18 }}> {duration} นาที ({distance} กม.)</Text>
                    <Text style={{ color: '#9CA3AF' }}>การจราจรตามแบบปกติ</Text>
                </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{
                        backgroundColor: '#2C64F3',
                        paddingVertical: 12,
                        paddingHorizontal: 30,
                        borderRadius: 8,
                        marginRight: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        }}onPress={hadleCreateTripPrass}>
                        <Ionicons name="car-outline" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 8, fontWeight: 'bold' }}>เริ่มเดินทาง</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                        backgroundColor: '#E5EAEE',
                        paddingVertical: 12,
                        paddingHorizontal: 30,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        }}>
                        <Ionicons name="share-outline" size={20} color="#9CA3AF" />
                        <Text style={{ color: '#9CA3AF', marginLeft: 8, fontWeight: 'bold' }}>แชร์</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    }
    else{
        return (
            <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            <View className="w-full py-6 rounded-xl ">
                <View className="w-full flex-row justify-center mb-2">
                    <View className="w-1/2 h-1 bg-gray-300 rounded-lg" />
                </View>
                <View className="flex-row items-center mt-4">
                    <TouchableOpacity
                        onPress={handleBackPress}
                        className=""
                    >
                    <Ionicons name="chevron-back" size={24} color="" />
                    </TouchableOpacity>
                    <Text className="font-bold text-2xl ml-4">เส้นทาง</Text>
                </View>
            </View>
            
            <View style={{flexDirection: "row",alignItems: "center",padding:10,marginRight:25}}>
                <Ionicons name="ellipse-outline" size={20} color="#2C64F3" style={{paddingRight:10}}/>
                <View className="flex-row items-center bg-white border rounded-lg px-4 py-1" style={{borderColor:"#2C64F3"}}>
                    <TextInput
                        className="flex-1 ml-2"
                        placeholder="ค้นหาสถานที่..."
                        value={selectedUserLocation ? selectedUserLocation.name : "ตำแหน่งปัจจุบันของคุณ"}
                        style={{fontSize: 18,color:"#2C64F3"}}
                        readOnly
                    />
                    </View>
            </View>
            <View style={{flexDirection: "row",alignItems: "center",padding:10,marginRight:25,}}>
                <Ionicons name="location-outline" size={25} color="#F49C26" style={{paddingRight:5}}/>
                <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-4 py-1" >
                    <TextInput
                        className="flex-1 ml-2"
                        value={selectedPlace.name}
                        style={{fontSize: 18,}}
                        readOnly
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 ,marginBottom:15}}>
                    <View
                    style={{
                        backgroundColor: '#CACACA',
                        height: 2,
                        flex: 1,
                    }}
                    />
            </View>
            <Text className="font-bold text-2xl ml-4" style={{marginTop:10,}}>คนขับใกล้คุณ</Text>
            <View style={{marginTop:10,}}>
            {filteredTrips.map((item) => (
                item.available_seats !== 0 && (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => handleSelectDriver(item)}
                        style={styles.card}
                    >
                        <Image source={require('../../assets/images/Car.png')} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.carName}>{item.driver.driver_documents.vehicle_brand} {item.driver.driver_documents.vehicle_model} {item.driver.driver_documents.vehicle_color}</Text>
                            <Text style={styles.text}>
                                <Ionicons name="person-outline" size={16} color="#2C64F3" /> {item.available_seats} | ค่าโดยสาร : {item.fare} ฿
                            </Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>
                                “3” <Ionicons name="star" size={14} color="gold" />
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            ))}
            </View>

            </ScrollView>
        );

    }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 25 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 ,padding: 10},
  card: { flexDirection: "row", backgroundColor: "#FFFFFF", padding: 15, marginBottom: 10, borderRadius: 10, },
  image: { width: 60, height: 60, marginRight: 10},
  details: { flex: 1, marginRight: 10,marginTop:5},
  carName: { fontSize: 16, fontWeight: "bold" },
  text: { fontSize: 16, color: "#555" },
  statusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto', // ทำให้คะแนนไปอยู่ด้านขวา
  },
  ratingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
});
