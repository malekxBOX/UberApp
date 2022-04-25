import React from 'react'
import { Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const origin = {latitude: 35.6324, longitude: 10.8960};
const destination = {latitude: 35.8245, longitude: 10.6346};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBXGuBOL4bHYuxTN24G2kWV6YsHByPlVT8';

const  HomeScreen = ( props) => {
  
    return (
      <View>
          <Text>You Good! 😢</Text>
        <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={{
        width:'100%',
        height:'100%',
       }}
       initialRegion={{
         latitude: 35.2547,
         longitude: 10.83541,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
     >
         <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
        />
     </MapView>
      </View>
    )
  
}

export default HomeScreen;