import SearchPlace from '@components/homes/SearchPlace'
import Trip_Content from '@components/trip/Trip_Content'
import React from 'react'
import { View } from 'react-native'

export default function Trip() {
  return (
    <View className='flex-1 h-full w-full'>
      <Trip_Content/>
    </View>
  )
}
