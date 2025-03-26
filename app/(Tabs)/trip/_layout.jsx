import { Stack } from 'expo-router'
import React from 'react'
import { UserProvider } from '@context/UserContext'
import { LocationProvider } from 'context/LocationContext'
import { TripProvider } from '@context/TripContext'

function TripLayout() {
  return (
    <LocationProvider>
      <UserProvider>
        <TripProvider>
            <Stack screenOptions={{title: "Trip", headerShown: false}}/>
        </TripProvider>
      </UserProvider>
    </LocationProvider>
  )
}

export default TripLayout