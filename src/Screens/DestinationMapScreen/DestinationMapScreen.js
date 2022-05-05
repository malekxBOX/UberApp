import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Dimensions, Text, View } from 'react-native'
import HomeMap from '../../components/HomeMap/HomeMap'
import RouteMap from '../../components/RouteMap/RouteMap'
import UberTypes from '../../components/UberTypes/UberTypes'
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createOrder} from '../../graphql/mutations'

const DestinationMapScreen = (props) =>{

 const typeState =  useState (null);

  const route = useRoute();
  const navigation = useNavigation();
  const {originPlace, destinationPlace} = route.params

  const onSubmit = async()=>{
    const [type] = typeState
    if (!type) {
      return ;
    }

    // submit to server

    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      console.log(originPlace.details.geometry.location.lat);
      const date = new Date();

       const input = {
         createdAt: date.toISOString(),
         type, 
         originLatitude: originPlace.details.geometry.location.lat,
         oreiginLongitude: originPlace.details.geometry.location.lng,
         destLatitude:destinationPlace.details.geometry.location.lat,
         destLongitude:destinationPlace.details.geometry.location.lat,
         userId:userInfo.attributes.sub,
         carId:"1",
         status: "NEW",
       } 

      const response = await API.graphql(
        graphqlOperation(
        createOrder,{
          input: input
        },
        )
      )

      console.log(response);
      navigation.navigate('OrderPage' , {id:response.data.createOrder.id})

    } catch (e) {
      console.error(e);
    }

  }
    return (
      <View style={{
        display:'flex',justifyContent:'space-between'
      }}>
        <View style={{height:Dimensions.get('window').height - 400}}>
          <RouteMap or={originPlace} des={destinationPlace} />
        </View>
        <View style={{height:400}}>
          <UberTypes  typeState={typeState} onSubmit={onSubmit} />
        </View>
      </View>
    )
  
}
export default DestinationMapScreen