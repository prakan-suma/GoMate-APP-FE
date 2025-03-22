import React from "react";
import { View, Text, FlatList, StyleSheet ,Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const historyData = [
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
  },
  {
    id: "2",
    car: "Toyota yaris cross",
    passengers: 1,
    date: "18 ม.ค. 2025 21:00 น.",
    from: "Central Ladprao",
    to: "Siam Paragon",
    status: "ล้มเหลว",
    statusColor: "#8B1A10",
    icon: "close-outline",
  },
  {
    id: "3",
    car: "Mazda 3 hatchback",
    passengers: 1,
    date: "18 ม.ค. 2025 19:35 น.",
    from: "Central Ladprao",
    to: "จุฬา",
    status: "ล้มเหลว",
    statusColor: "#8B1A10",
    icon: "close-outline",
  },
  {
    id: "4",
    car: "Mazda 3 hatchback",
    passengers: 1,
    date: "16 ม.ค. 2025 17:20 น.",
    from: "จุฬา",
    to: "Siam Paragon",
    status: "สำเร็จแล้ว",
    statusColor: "#4EA134",
    icon: "checkmark-outline",
  },
  {
    id: "5",
    car: "Mazda 3 hatchback",
    passengers: 1,
    date: "12 ม.ค. 2025 16:20 น.",
    from: "โรบินสันลาดกระบัง",
    to: "สถ.",
    status: "สำเร็จแล้ว",
    statusColor: "#4EA134",
    icon: "checkmark-outline",
  },
  {
    id: "6",
    car: "Mazda 3 hatchback",
    passengers: 1,
    date: "5 ม.ค. 2025 5:39 น.",
    from: "หัวหมาก",
    to: "Siam premium outlet",
    status: "สำเร็จแล้ว",
    statusColor: "#4EA134",
    icon: "checkmark-outline",
  },
];

export default function History() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ประวัติ</Text>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={require('../../../assets/images/Car.png')} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.carName}>{item.car}</Text>
              <Text style={styles.text}><Ionicons name="person-outline" size={12} color="#2C64F3" />{item.passengers} |  {item.date}</Text>
              <Text style={styles.text}>
              {item.from} ➝ {item.to}
              </Text>
            </View>
            <View style={styles.statusRow}>
                <Text style={{ color: item.statusColor, fontWeight: "bold" ,marginRight:"10" }}>
                  {item.status}
                </Text>
                <Ionicons name={item.icon} size={32} color={item.statusColor} style={{marginRight:"10"}}/>
              </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 25 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 ,padding: 10},
  card: { flexDirection: "row", backgroundColor: "#f9f9f9", padding: 15, marginBottom: 10, borderRadius: 10, },
  image: { width: 60, height: 60, marginRight: 10},
  details: { flex: 1, marginRight: 10},
  carName: { fontSize: 16, fontWeight: "bold" },
  text: { fontSize: 14, color: "#555" },
  statusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 },
});