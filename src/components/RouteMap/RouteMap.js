import React, { Component } from 'react'
import { Text, View,Image,FlatList } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import cars from '../../../assets/data/cars'

const GOOGLE_MAPS_APIKEY = 'AIzaSyBXGuBOL4bHYuxTN24G2kWV6YsHByPlVT8';
const RouteMap = ({or,des})=> {
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
   
    

    const origin = {
        latitude: or.details.geometry.location.lat,
        longitude: or.details.geometry.location.lng,
    }

    const destination = {
        latitude: des.details.geometry.location.lat,
        longitude: des.details.geometry.location.lng,
    }

    return (
      
        <MapView
        style={{
          width:'100%',
          height:'100%'
        }}
        showsUserLocation = {true}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       region={{
        latitude: 35.6324,
        longitude: 10.8960,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}>

        <MapViewDirections
            origin={origin}
            destination={destination}
            apikey = {GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="black"
        
        />
        <Marker
            coordinate={origin}
            title={'Origin'}
        />
        <Marker
            coordinate={destination}
            title={'Destination'}
        />



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
export default RouteMap
