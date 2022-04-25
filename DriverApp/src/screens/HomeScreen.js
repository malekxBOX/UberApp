import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles'
import NewOrderPopup from '../components/NewOrderPopup';
import { API,graphqlOperation,Auth } from 'aws-amplify';
import {getCar} from '../graphql/queries';
import { updateCar } from '../graphql/mutations';

const origin = {latitude: 35.6324, longitude: 10.8960};
const destination = {latitude: 35.8245, longitude: 10.6346};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBXGuBOL4bHYuxTN24G2kWV6YsHByPlVT8';

const  HomeScreen = (props) => {
  const [car, setCar] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    id:'1',
    type:'UberX',
    // 35.8174971824911, 10.640756287352575
    originLatitude:35.8120 ,
    oreiginLongitude: 10.6260,
    destLatitude: 36.8065,
    destLongitude: 10.1815,
    user:{
      rating: 4.0,
      name: 'Ciara',
    },
  })

  const fetchCar = async()=>{
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const carData = await API.graphql(
        graphqlOperation(
          getCar, {id: userData.attributes.sub}
        ),
      );
      setCar(carData.data.getCar);
    } catch (e) {
      console.error(e)
    }
  }
useEffect(()=>{
fetchCar();
},[])

  const onDecline = () =>{
    setNewOrder(null)
  }

  const onAccept = () => {
    setOrder(newOrder)
    setNewOrder(null)
  }

  const onGoPress = async () =>{
    // Update the car and set it to active
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id:userData.attributes.sub,
        isActive: !car.isActive,
      }
      const updateCarData = await API.graphql(
        graphqlOperation(
          updateCar,{input}
        )
      )
      console.log(updateCarData.data.updateCar);
      setCar(updateCarData.data.updateCar);
    } catch (e) {
      console.error(e)
    }
  }

  const onUserLocationChange = (event) =>{
 
    setMyPosition(event.nativeEvent.coordinate)
  }
  const onDirectionFound = (event) =>{
    
    console.log("Direction Found", event)
    if(order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.3,
        isFinished: order.pickedUp && event.distance < 0.2,
      })
    }
  }

const getDestination = () =>{
  if(order && order.pickedUp){
    return {
      latitude: order.destLatitude,
      longitude: order.destLongitude,
    }
  }
  return {
    latitude: order.originLatitude,
    longitude: order.oreiginLongitude,
  }
}



  const renderBottomTitle = () =>{

    if(order && order.isFinished){
        return (
          <View style={{alignItems:'center'}}>
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#cb1a1a',width:200,padding:10,justifyContent:'center'}}>
              <Text> COMPLETE {order.type}</Text>
            </View>
            <Text style={styles.bottomText}>
            {order.user.name} 
            </Text>
          </View>
        )
      }

    if(order && order.pickedUp){
      
      return (
        <View style={{alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1):'?'} min</Text>
            <View style={{backgroundColor:'#d41212',marginHorizontal:20, width:30,height:30,alignItems:'center',justifyContent:'center',borderRadius:20}}>
              <Icon 
              type='material-community'
              name='account'
              size={20}
              color='white'
              />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>
          Dropping Off {order.user.name} 
          </Text>
        </View>
      )
    }


    if(order){
      
      return (
        <View style={{alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1):'?'} min</Text>
            <View style={{backgroundColor:'#1e9203',marginHorizontal:20, width:30,height:30,alignItems:'center',justifyContent:'center',borderRadius:20}}>
              <Icon 
              type='material-community'
              name='account'
              size={20}
              color='white'
              />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>
          Picking Up {order.user.name} 
          </Text>
        </View>
      )
    }
     if ( car?.isActive )
       return (
       <Text style={styles.bottomText} >You're Online </Text>
       )
    else
    return (
      <Text style={styles.bottomText} >You're offline </Text>
      )
    
  }

    return (
      <View>
          
          <MapView
        style={{
          width:'100%',
          height:Dimensions.get('window').height -100 ,
        }}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        followsUserLocation={true}
        zoomEnabled={true}
        rotateEnabled={true}
        initialRegion=
        {{
          latitude: 35.6324,
          longitude: 10.8960,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
       }}>
         {order && (
              <MapViewDirections
              onReady={onDirectionFound}
              origin={myPosition}
              destination={getDestination()}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth= {6}
              strokeColor= 'red'
            />
         )}
         
     </MapView>

     <Pressable
       onPress={()=>console.warn("Balance")}
       style={styles.balanceButton}
       >
      <Text style = {styles.balanceText}>
        <Text style={{color:'lightgreen'}}>
          $ 
        </Text>
       0.00
      </Text>
       </Pressable> 

       <Pressable
       onPress={()=>console.warn("Hey")}
       style={[styles.roundButton,{top:10,left:10}]}
       >
      <Icon 
          type='material-community'
          name='menu'
          size={24}
          color='#4a4a4a'
        />
       </Pressable>

       <Pressable
       onPress={()=>console.warn("Hey")}
       style={[styles.roundButton,{top:10,right:10}]}
       >
      <Icon 
          type='material-community'
          name='magnify'
          size={24}
          color='#4a4a4a'
        />
       </Pressable>

       <Pressable
       onPress={()=>console.warn("Hey")}
       style={[styles.roundButton,{bottom:110,left:10}]}
       >
      <Icon 
          type='material-community'
          name='shield'
          size={24}
          color='#1495ff'
        />
       </Pressable>

       <Pressable
       onPress={()=>console.warn("Hey")}
       style={[styles.roundButton,{bottom:110,right:10}]}
       >
      <Icon 
          type='material-community'
          name='star-box'
          size={24}
          color='#4a4a4a'
        />
       </Pressable>

      <Pressable
          onPress={onGoPress}
          style={[styles.goButton,{bottom:110,right:10}]}
          >
      <Text style = {styles.goText}>
        {
          car?.isActive ? 'END' : 'GO'
         
        }
        </Text>
      </Pressable>
       


     <View style={styles.bottomContainer}>
        <Icon 
          type='material-community'
          name='tune'
          size={24}
          color='#4a4a4a'
        />
      {renderBottomTitle()}
        
        <Icon 
          type='material-community'
          name='menu'
          size={30}
          color='#4a4a4a'
        />
     </View>
     {newOrder && <NewOrderPopup 
      newOrder = {newOrder}
      duration = {2}
      distance = {0.5}
      onDecline = {onDecline}
      onAccept = {()=>onAccept(newOrder)}
     />}
     </View>
    )
  
}

export default HomeScreen;