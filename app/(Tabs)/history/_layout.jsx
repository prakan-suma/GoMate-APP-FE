import { Stack } from 'expo-router'
import React from 'react'

function HistoryLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{title: "History"}}/>
    </Stack>
  )
}

export default HistoryLayout