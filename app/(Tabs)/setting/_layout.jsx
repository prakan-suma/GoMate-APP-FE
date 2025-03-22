import { Stack } from 'expo-router'
import React from 'react'

function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{title: "Setting",headerShown: false,}}/>
    </Stack>
  )
}

export default SettingLayout