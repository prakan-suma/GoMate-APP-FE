import React, { useState } from "react";
import { View, Text, Switch, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useRouter  } from "expo-router";

const SettingScreen = () => {
  const navigation = useNavigation();
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(false);
  const router = useRouter();

  const goToEditPage = () => {
    router.push("/setting/EditProfile")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ตั้งค่า</Text>
      <View style={styles.profileContainer}>
        <Image source={{ uri: "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/1020D/production/_104916066_hi050616611.jpg.webp" }} style={styles.profileImage} />
        <View style={styles.profileText}>
          <Text style={styles.profileName}>ตุดตู่ อยู่นี่</Text>
          <Text>เพศ : ชาย   อายุ : 55 ปี</Text>
          <Text style={styles.email}>Tonynaja@gmail.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={goToEditPage}>
          <Text style={styles.editText}>แก้ไข</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.optionRow}>
          <Text>แจ้งเตือน E-mail</Text>
          <Switch value={emailNotification} onValueChange={setEmailNotification} />
        </View>
        <View style={styles.optionRow}>
          <Text>แจ้งเตือน SMS</Text>
          <Switch value={smsNotification} onValueChange={setSmsNotification} />
        </View>
        <TouchableOpacity style={styles.optionButton}><Text>เปลี่ยนรหัสผ่าน</Text></TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}><Text>เกี่ยวกับเรา</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 25},
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 ,padding: 10},
  profileContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  profileText: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: "bold" },
  email: { color: "black" },
  editButton: { backgroundColor: "#007bff", padding: 5, borderRadius: 5 },
  editText: { color: "white" },
  optionContainer: { backgroundColor: "#f8f8f8", borderRadius: 10, padding: 15 },
  optionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5 },
  optionButton: { paddingVertical: 20 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 15, borderTopWidth: 1, borderColor: "#ddd" },
  navButton: { alignItems: "center" },
});

export default SettingScreen;