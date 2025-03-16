import React, { Component,useEffect,useState } from 'react';
import { View, Text,TextInput , TouchableOpacity,Button} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";


const SwitchContent = ({value}) => {
    const [passengerCount, setPassengerCount] = useState("1");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
 
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false); 
        if (selectedDate) setDate(selectedDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) setTime(selectedTime);
    };
    
    useEffect(() => {
        if(passengerCount == "0"){
            setPassengerCount("1")
        }
    })
    if (value === true) {
        return (
            <View>
                <View style={{marginBottom: 10,}}>
                    <Text className="text-gray-800 font-bold">เปิดรับผู้โดยสารจำนวน</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#E5EAEE",
                    borderRadius: 8,
                    paddingHorizontal: 10, 
                    paddingVertical: 1,
                    width: 90,
                }}>
                    <Ionicons name="person-outline" size={24} color="#2C64F3" />
                    <TextInput
                        value={passengerCount}
                        keyboardType="numeric"
                        onChangeText={setPassengerCount}
                        style={{
                            flex: 1,
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: "#2C64F3",
                            textAlign: "center",
                        }}
                    />
                    

                    
                </View>
                <View>
                <View style={{marginBottom: 10,}}>
                        <Text className="text-gray-800 font-bold">วันและเวลาการเดินทาง</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                    }}>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{
                            flexDirection: "row",
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 8,
                            padding: 10,
                            flex: 1,
                            alignItems: "center",
                            marginHorizontal: 5,
                            
                            
                            
                        }}>
                            <Ionicons name="calendar-outline" size={24} color="#2C64F3" />
                            <Text style={{
                                flex: 1,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: "#2C64F3",
                            }}>{date.toLocaleDateString()}</Text>
                        
                        
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{
                            flexDirection: "row",
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 8,
                            padding: 10,
                            flex: 1,
                            alignItems: "center",
                            marginHorizontal: 5,
                        }}>
                            <Ionicons name="alarm-outline" size={24} color="#2C64F3" />
                            <Text style={{
                                flex: 1,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: "#2C64F3",
                            }}>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                    {showDatePicker && (
                        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
                    )}
                    {showTimePicker && (
                        <DateTimePicker value={time} mode="time" display="default" onChange={handleTimeChange} />
                    )} 
            </View>
          );
    }
}

export default SwitchContent;


