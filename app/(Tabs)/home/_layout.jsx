import { Stack } from 'expo-router'
import React from 'react'

function HomeLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }} />
  )
}

export default HomeLayout