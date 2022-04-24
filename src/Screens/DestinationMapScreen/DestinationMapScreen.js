import { useRoute } from '@react-navigation/native'
import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import HomeMap from '../../components/HomeMap/HomeMap'
import RouteMap from '../../components/RouteMap/RouteMap'
import UberTypes from '../../components/UberTypes/UberTypes'

const DestinationMapScreen = (props) =>{
  const route = useRoute();
  console.log(route.params)
  const {originPlace, destinationPlace} = route.params
    return (
      <View style={{
        display:'flex',justifyContent:'space-between'
      }}>
        <View style={{height:Dimensions.get('window').height - 400}}>
          <RouteMap or={originPlace} des={destinationPlace} />
        </View>
        <View style={{height:400}}>
          <UberTypes />
        </View>
      </View>
    )
  
}
export default DestinationMapScreen