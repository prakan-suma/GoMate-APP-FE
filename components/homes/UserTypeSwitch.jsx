import React, { useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { useUser } from '@context/UserContext';


const UserTypeSwitch = () => {
  const [switchTranslate] = useState(new Animated.Value(Role ? 1 : 0));
  const {Role,setRole,isDriver} = useUser();

  const toggleSwitch = () => {
    Animated.spring(switchTranslate, {
      toValue: Role ? 0 : 1,
      useNativeDriver: true,
    }).start();
    setRole(!Role);
  };

  if(isDriver){
    return (
      <Pressable onPress={toggleSwitch} >
        <View
        style={{backgroundColor:"#81A3FC"}}
          className="w-48 h-10 rounded-full flex-row items-center relative overflow-hidden"
        >
          <Animated.View
            className="absolute h-8  rounded-full"
            style={{
              backgroundColor:"#2C64F3",
              width: '50%',
              transform: [{
                translateX: switchTranslate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [4, 80]
                })
              }]
            }}
          />
  
          <View className="flex-1 h-full flex-row">
            <View
              className="flex-1 items-center justify-center">
              <Text
                style={{
                  fontFamily: "ibm-regular"
                }}
                className={"pl-2 text-white"}
              >
                ผู้โดยสาร
              </Text>
            </View>
  
            <View
              className="flex-1 items-center justify-center"
            >
              <Text
                style={{
                  fontFamily: "ibm-regular"
                }}
                className={"pr-2 text-white"}
              >
                คนขับ
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }
};

export default UserTypeSwitch;
