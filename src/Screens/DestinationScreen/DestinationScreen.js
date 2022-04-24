import { useNavigation } from '@react-navigation/native';
import React, { PureComponent, useEffect, useState } from 'react'
import { SafeAreaView, Text, TextInput, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlaceRow from './PlaceRow';
import styles from './style';

navigator.geolocation = require('react-native-geolocation-service');

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const DestinationScreen =()=> {

  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace,setDestinationPlace] = useState(null);
  const navigation = useNavigation();
  const checkNavigation = () =>{
    
    if(originPlace && destinationPlace){
      
      navigation.navigate('DestinationMapScreen',{
        originPlace,
        destinationPlace,
      })
    }
  }
  useEffect(()=>{
    checkNavigation();
  },[originPlace,destinationPlace])
  return (
      <SafeAreaView>
        <View style={styles.container}>
          <GooglePlacesAutocomplete
            placeholder='From'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setOriginPlace({data,details});
            }}
            enablePoweredByContainer = {false}
            suppressDefaultStyles
            styles={{
              textInput:styles.textInput,
              container:{
                position:'absolute',
                top:30,
                left:10,
                right:20
              },
              listView:{
                position:'absolute',
                top:107,
                left:20,
                right:0,
                
              },
              separator: styles.separator,
            }}
            fetchDetails
            query={{
              key: 'AIzaSyBXGuBOL4bHYuxTN24G2kWV6YsHByPlVT8',
              language: 'en',
            }}
            renderRow={(data) => <PlaceRow data={data}/>}
            renderDescription = {(data) => data.description ||data.vinicity}
            predefinedPlaces={[homePlace, workPlace]}
          />
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setDestinationPlace({data,details});
            }}
            enablePoweredByContainer = {false}
            suppressDefaultStyles
            styles={{
              textInput:styles.textInput,
              container:{
                position:'absolute',
                top:80,
                left:10,
                right:20
              },
              listView:{
                width:'95%',
                left:20,
                
              },
              separator: styles.separator,
            }}
            fetchDetails
            query={{
              key: 'AIzaSyBXGuBOL4bHYuxTN24G2kWV6YsHByPlVT8',
              language: 'en',
            }}
            renderRow={(data) => <PlaceRow data={data}/>}
          />
          <View style={{position:'absolute',top:30,paddingRight:20}}>
          {/* Circle near Origin Input  */}
            <View style={styles.circle}/>
          {/* Line between dots  */}
          <View style={styles.line}/>
          {/* Square near Destination input  */}
          <View style={styles.square}/>
          </View>
        </View>
      </SafeAreaView>

  );
}

export default DestinationScreen
