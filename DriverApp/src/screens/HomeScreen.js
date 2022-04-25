import React, { useState } from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles'
import NewOrderPopup from '../components/NewOrderPopup';


const origin = {latitude: 35.6324, longitude: 10.8960};
const destination = {latitude: 35.8245, longitude: 10.6346};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBXGuBOL4bHYuxTN24G2kWV6YsHByPlVT8';

const  HomeScreen = (props) => {
  const [isOnline, setIsOnline] = useState(false);
  const onGoPress = () =>{
    setIsOnline(!isOnline);
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
         <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
         />
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

      
      
        {
          isOnline
          ? <Pressable
          onPress={onGoPress}
          style={[styles.goButton,{bottom:110,right:10,backgroundColor:'red'}]}
          ><Text style = {styles.goText}>END</Text></Pressable> 
          :<Pressable
          onPress={onGoPress}
          style={[styles.goButton,{bottom:110,right:10}]}
          ><Text style = {styles.goText}>Go</Text></Pressable> 
        }
      
       


     <View style={styles.bottomContainer}>
        <Icon 
          type='material-community'
          name='tune'
          size={24}
          color='#4a4a4a'
        />
        {
          isOnline 
          ? <Text style={styles.bottomText} >You're Online </Text>
          : <Text style={styles.bottomText} >You're offline </Text>
        }
        
        <Icon 
          type='material-community'
          name='menu'
          size={30}
          color='#4a4a4a'
        />
     </View>
     <NewOrderPopup />
      </View>
    )
  
}

export default HomeScreen;