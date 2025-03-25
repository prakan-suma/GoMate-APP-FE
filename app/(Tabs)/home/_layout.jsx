import { UserProvider } from '@context/UserContext'
import { LocationProvider } from 'context/LocationContext'
import { TripProvider } from '@context/TripContext'
import { Stack } from 'expo-router'
import React from 'react'

function HomeLayout() {
  return (
    <LocationProvider>
      <UserProvider>
        <TripProvider>
            <Stack
              screenOptions={{
                title: "ค้นหาสถานที่",
                headerShown: false,
              }} />
        </TripProvider>
      </UserProvider>
    </LocationProvider>
  )

}

export default HomeLayout