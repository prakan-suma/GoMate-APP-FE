import { Stack } from 'expo-router'
import React from 'react'
import { UserProvider } from '@context/UserContext'
import { LocationProvider } from 'context/LocationContext'

function TripLayout() {
  return (
    <LocationProvider>
      <UserProvider>
        <Stack>
          <Stack.Screen name='index' options={{title: "Trip"}}/>
        </Stack>
      </UserProvider>
    </LocationProvider>
  )
}

export default TripLayout