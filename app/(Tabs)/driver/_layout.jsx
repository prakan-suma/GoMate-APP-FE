import { Stack } from 'expo-router'
import React from 'react'

function DriverLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{title: "driver"}}/>
    </Stack>
  )
}

export default DriverLayout