import { Stack } from 'expo-router'
import React from 'react'

function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{title: "Setting"}}/>
    </Stack>
  )
}

export default SettingLayout