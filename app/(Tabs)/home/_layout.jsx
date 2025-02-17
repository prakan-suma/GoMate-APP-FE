import { LocationProvider } from 'context/LocationContext'
import { Stack } from 'expo-router'
import React from 'react'

function HomeLayout() {
  return (
    <LocationProvider>
      <Stack
        screenOptions={{
          title: "ค้นหาสถานที่",
          headerShown: false,
        }} />
    </LocationProvider>
  )

}

export default HomeLayout