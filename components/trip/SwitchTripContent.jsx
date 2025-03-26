import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from '@context/UserContext';
import { useTrip } from '@context/TripContext';
import { useRouter } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';

const SwitchTripContent = () => {
    const router = useRouter();
    const { Role, userID } = useUser();
    const { setTrippagedata } = useTrip();
    const [DriverData, setDriverData] = useState(null);
    const [PassengerData, setPassengerData] = useState([]);
    const [PassengerBookingData, setPassengerBookingData] = useState([]);  // เริ่มต้นเป็น []
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BE_URL = Constants.expoConfig.extra.API_BE_URL;

    const routetodriverpage = (data) => {
        if(data){
            if(!Role && !cheackPassengerTripSatatus(data.bookings)){
                return;
            }
            setTrippagedata(data);
            router.push("/trip/Show_Detail_Trip");
        }
    };

    const cheackPassengerTripSatatus = (data) => {
        const foundItem = data.find(item => item.passenger_id == userID);
        if (foundItem) {
            if(foundItem.status == "confirmed"){
                return true
                
            }
        }
        return false
    }

    const fetchDriverData = async () => {
        try {
            const response = await fetch(`${API_BE_URL}/v1/trips/?user_ids=${userID}&skip=0&limit=100`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setDriverData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPassengerTrip = async () => {
        try {
            const tempData = [];
            if (PassengerBookingData && Array.isArray(PassengerBookingData)) {
                const promises = PassengerBookingData.map(async (item) => {
                    const response = await fetch(`${API_BE_URL}/v1/trips/${item.trip_id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    tempData.push(result);
                });
                await Promise.all(promises);
                setPassengerData(tempData);
            } else {
                setPassengerData([]);
            }
        } catch (error) {
            console.error('There was an error fetching the passenger trip data:', error);
        }
    };
    

    const fetchPassengerBooking = async () => {
        try {
            const response = await fetch(`${API_BE_URL}/v1/booking/user/${userID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setPassengerData([])
            setPassengerBookingData(result);
            await fetchPassengerTrip()
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
        // console.log("PassengerBookingData :",PassengerBookingData);
        // console.log("PassengerData :",PassengerData);

    };
    const PassengerShowStatus = (data) => {
        // ใช้ find เพื่อค้นหาผู้โดยสารที่ตรงกับ userID
        const foundItem = data.find(item => item.passenger_id == userID);
        if (foundItem) {
            if(foundItem.status == "confirmed"){
                return(
                    <View style={{flexDirection: "row",alignItems: "center"}}>
                        <Ionicons name="checkmark-outline" size={28} color="#4EA134" />
                        <Text style={{fontSize: 18,fontWeight:'bold',color:"#4EA134"}}>ได้รับการยืนยัน</Text>
                    </View>
                );
            }
            else if (foundItem.status == "pending"){
                return(
                    <View style={{flexDirection: "row",alignItems: "center"}}>
                        <Ionicons name="hourglass-outline" size={28} color="#F29D38" />
                        <Text style={{fontSize: 18,fontWeight:'bold',color:"#F29D38"}}>รอดำเนินการ</Text>
                    </View>
                );
            }
            
        }
        return(<Text>Notfound</Text>);
    };

    useEffect(() => {
        if (PassengerBookingData && PassengerBookingData.length > 0) {
            fetchPassengerTrip(); // ดึงข้อมูล Trip หลังจากได้ข้อมูลการจองแล้ว
        }
    }, [PassengerBookingData]);
    
    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            setError(null);
            // console.log("userID:", userID);
            // console.log("Role:", Role);
            if (PassengerBookingData && PassengerBookingData.length > 0) {
                fetchPassengerTrip(); // ดึงข้อมูล Trip หลังจากได้ข้อมูลการจองแล้ว
            }
            if (Role) {
                fetchDriverData();
            } else {
                fetchPassengerBooking();
            }
        }, [Role])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }
    if (Role && DriverData && Array.isArray(DriverData) && DriverData.length > 0) {
        return (
            <View>
                <ScrollView>
                    <View style={{ marginTop: 10 ,paddingRight:30,paddingLeft:30}}>
                        {DriverData.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => routetodriverpage(item)}
                                style={styles.card}
                            >
                                <Image source={require('../../assets/images/Car.png')} style={styles.image} />
                                <View style={styles.details}>
                                    <Text style={styles.carName}>{item.driver.driver_documents.vehicle_brand} {item.driver.driver_documents.vehicle_model} {item.driver.driver_documents.vehicle_color}</Text>
                                    <Text style={styles.text}>
                                        <Ionicons name="person-outline" size={12} color="#2C64F3" /> {item.available_seats}
                                    </Text>
                                    <Text style={styles.text}>{item.origin} ➝ {item.destination}</Text>
                                </View>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingText}>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    } else if (!Role && PassengerData && Array.isArray(PassengerData) && PassengerData.length > 0) {
        return (
            <View>
                <ScrollView>
                    <View style={{ marginTop: 10,paddingRight:30,paddingLeft:30 }}>
                        {PassengerData.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => routetodriverpage(item)}
                                style={styles.card}
                            >
                                <Image source={require('../../assets/images/Car.png')} style={styles.image} />
                                <View style={styles.details}>
                                    <Text style={styles.carName}>{item.driver.driver_documents.vehicle_brand} {item.driver.driver_documents.vehicle_model} {item.driver.driver_documents.vehicle_color}</Text>
                                    <Text style={styles.text}>
                                        <Ionicons name="person-outline" size={12} color="#2C64F3" /> {item.available_seats}
                                    </Text>
                                    <Text style={styles.text}>{item.origin} ➝ {item.destination}</Text>
                                </View>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingText}>
                                        {PassengerShowStatus(item.bookings)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView> 
            </View>
        );
    } else {
        return <View><Text>No Trips Available</Text></View>;
    }
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 25 },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 10, padding: 10 },
    card: { flexDirection: "row", backgroundColor: "#FFFFFF", padding: 15, marginBottom: 10, borderRadius: 10 },
    image: { width: 60, height: 60, marginRight: 20 },
    details: { flex: 1, marginRight: 10 },
    carName: { fontSize: 16, fontWeight: "bold" },
    text: { fontSize: 14, color: "#555" },
    statusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    ratingText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default SwitchTripContent;
