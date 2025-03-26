import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,Image,StyleSheet,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!name) newErrors.name = "กรุณากรอกชื่อ";
    if (!dob) newErrors.dob = "กรุณากรอกวันเกิด";
    if (!email.includes("@")) newErrors.email = "อีเมลไม่ถูกต้อง";
    if (!phone.match(/^\+\d{2} \d{2,3}-\d{3}-\d{4}$/)) newErrors.phone = "เบอร์โทรศัพท์ไม่ถูกต้อง";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      console.log("Profile saved!");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView top={25}>
        <View className="flex-row items-center mb-6 " >
          <TouchableOpacity onPress={() => router.back() }>
            <Ionicons name="chevron-back-outline" size={24}  />
          </TouchableOpacity>
          <Text className="text-xl ml-4 font-bold">แก้ไขโปรไฟล์</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/07/Prayut_2022.jpg" }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="create" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <Ionicons name="person" size={20} style={styles.icon} />
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="ชื่อ" />
          </View>
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <Ionicons name="calendar" size={20} style={styles.icon} />
            <TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="วันเกิด (DD/MM/YYYY)" />
          </View>
          {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={20} style={styles.icon} />
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="อีเมล" />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <Ionicons name="call" size={20} style={styles.icon} />
            <TextInput style={styles.input} value={phone} onChangeText={setPhone}   keyboardType="phone-pad" placeholder="เบอร์โทรศัพท์" />
          </View>
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>
        <View style={styles.pickerContainer}>
          <Ionicons name="male-female" right={-10} size={20} style={styles.icon} />
          <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
            <Picker.Item label="ชาย" value="male" />
            <Picker.Item label="หญิง" value="female" />
            <Picker.Item label="อื่นๆ" value="other" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>บันทึก</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 135,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    padding: 6,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
  icon: {
    marginRight: 10,
    color: "#555",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 3,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 55,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default EditProfile;