import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import UserTypeSwitch from "./UserTypeSwitch";
import SearchInput from "@components/inputs/SearchInput";
import axios from "axios";
import Constants from 'expo-constants';
import { Ionicons } from "@expo/vector-icons";

const GOOGLE_MAP_API_KEY = Constants.expoConfig.extra.GOOGLE_MAP_API_KEY;

function Content() {
  const [userType, setUserType] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  
  return (
    <View style={styles.container}>
      <View style={styles.dragIndicator}>
        <View style={styles.dragIndicatorBar} />
      </View>

      <Text style={styles.headerText}>เลือกประเภทผู้ใช้งาน</Text>

      <UserTypeSwitch
        value={userType}
        onValueChange={setUserType}
      />

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingSubtext}>สวัสดียามเช้า</Text>
        <Text style={styles.greetingMainText}>วันนี้คุณต้องการเดินทางไปที่ไหน?</Text>
      </View>

      <SearchInput
        placeholder="ค้นหาสถานที่..."
        value={searchValue} 
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    gap: 16,
  },
  dragIndicator: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dragIndicatorBar: {
    width: '50%',
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
  },
  headerText: {
    color: '#1F2937',
    fontFamily: 'ibm-bold',
  },
  greetingContainer: {
    marginVertical: 4,
  },
  greetingSubtext: {
    color: '#9CA3AF',
    fontFamily: 'ibm-regular',
  },
  greetingMainText: {
    fontSize: 18,
    fontFamily: 'ibm-bold',
  },
  placesList: {
    maxHeight: 200,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  placeTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  placePrimaryText: {
    fontSize: 14,
    fontFamily: 'ibm-regular',
    color: '#1F2937',
  },
  placeSecondaryText: {
    fontSize: 12,
    fontFamily: 'ibm-regular',
    color: '#6B7280',
    marginTop: 2,
  },
});

export default Content;