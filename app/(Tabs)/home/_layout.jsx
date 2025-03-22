import { UserProvider } from '@context/UserContext'
import { LocationProvider } from 'context/LocationContext'
import { Stack } from 'expo-router'
import React from 'react'

function HomeLayout() {
  return (
    <LocationProvider>
      <UserProvider>
        <Stack
          screenOptions={{
            title: "ค้นหาสถานที่",
            headerShown: false,
          }} />
      </UserProvider>
    </LocationProvider>
  )

}

export default HomeLayout