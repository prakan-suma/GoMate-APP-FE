import React from "react";
import { View, Text, Image, FlatList, ScrollView,StyleSheet, TouchableOpacity,TextInput } from "react-native";
import Constants from "expo-constants";
import ButtonWithIcon from "@components/ui/ButtonWithIcon";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "@context/LocationContext";
import { Link,useRouter  } from "expo-router";
import { useUser } from "@context/UserContext";

export default function SelectRoute (){
    const {setlocationUser,setSelectedUserLocation,selectedUserLocation,selectedPlace,distance, setdistance,duration, setduration,} = useLocation();
    const {Role} = useUser();
    
    const handleBackPress = () => {
        setlocationUser(null);
        setSelectedUserLocation(null);
        setdistance(null);
        setduration(null);
    };

    const testData = [
        {
          id: "1",
          car: "Mazda 3 hatchback",
          passengers: 1,
          date: "10 ก.พ. 2025 9:00 น.",
          from: "จุฬา",
          to: "Siam Paragon",
          status: "สำเร็จแล้ว",
          statusColor: "#4EA134",
          icon: "checkmark-outline",
          rating: "4",
        },
        {
          id: "2",
          car: "Toyota yaris cross",
          passengers: 3,
          date: "18 ม.ค. 2025 21:00 น.",
          from: "Central Ladprao",
          to: "Siam Paragon",
          status: "ล้มเหลว",
          statusColor: "#8B1A10",
          icon: "close-outline",
          rating: "4",
        },
        {
          id: "3",
          car: "Mazda 3 hatchback",
          passengers: 4,
          date: "18 ม.ค. 2025 19:35 น.",
          from: "Central Ladprao",
          to: "จุฬา",
          status: "ล้มเหลว",
          statusColor: "#8B1A10",
          icon: "close-outline",
          rating: "4",
        },
      ];


    if(Role === true){
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
                        }}>
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
            {testData.map((item) => (
                <TouchableOpacity
                key={item.id}
                onPress={() => console.log('Pressed:', item)}
                style={styles.card}
                >
                <Image source={require('../../assets/images/Car.png')} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.carName}>{item.car}</Text>
                    <Text style={styles.text}>
                    <Ionicons name="person-outline" size={12} color="#2C64F3" /> {item.passengers}
                    </Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>
                    “{item.rating}” <Ionicons name="star" size={14} color="gold" />
                    </Text>
                </View>
                </TouchableOpacity>
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
  details: { flex: 1, marginRight: 10},
  carName: { fontSize: 16, fontWeight: "bold" },
  text: { fontSize: 14, color: "#555" },
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
