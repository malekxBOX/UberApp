import React, { useEffect, useState } from 'react'
import { Text, View,Image,FlatList } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {API, graphqlOperation} from 'aws-amplify';
import {listCars} from '../../graphql/queries'

import cars from '../../../assets/data/cars'

const HomeMap = (props)=> {
  const [cars, setCars] = useState ([]);

  useEffect(()=>{
    const fetchCars = async() =>{
        try {
          const response = await API.graphql(
            graphqlOperation(
              listCars
            )
          )
          setCars(response.data.listCars.items)
          console.log(response)
        } catch (e) {
          console.error(e)
        }
    };
    fetchCars();
  },[])
  const getImage  = (type)=>{
    if (type === 'UberX') {
        return require('../../../assets/top-UberX.png')
    }
    if (type === 'Comfort') {
        return require('../../../assets/top-Comfort.png')
    }
    if (type === 'UberXL') {
        return require('../../../assets/top-UberXL.png')
    }
      }
    return (
      
        <MapView
        style={{
          width:'100%',
          height:'100%',
        }}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       showsUserLocation = {true}
       region={{
        latitude: 35.6324,
        longitude: 10.8960,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}>

{cars.map((car) => (
        
        <Marker
          key={car.id}
          coordinate={{latitude: car.latitude, longitude: car.longitude}}
        >
          <Image
            style={{
              height:40,
              width:50,
              resizeMode: 'contain',
              transform:[{
                rotate:`${car.heading}deg`
              }]
            }}
            source={getImage(car.type)}
          />
        </Marker>
      
)
)}
    </MapView>
      
    )
  }
export default HomeMap
