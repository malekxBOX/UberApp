import {  SafeAreaView, Text, View,StatusBar } from 'react-native';
import {Icon} from 'react-native-elements'
import HomeScreen from './src/screens/HomeScreen';
import * as Location from 'expo-location'
import React ,{ useEffect } from 'react';

import { Amplify,Auth,API,graphqlOperation } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)
import { withAuthenticator } from 'aws-amplify-react-native';
import {getCarId} from './src/graphql/queries';
import {createCar} from './src/graphql/mutations';

function App() {

  const checkPermission = async()=>{
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status === 'granted') {
        const permission = await askPermission();
        return permission
    }
    return true
};

const askPermission = async()=>{
    const permission = await Location.requestForegroundPermissionsAsync();
    return permission.status === 'granted';
};

const getLocation = async()=>{
    try {
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            return;
        }
        const {
            coords:{latitude,longitude},
        } = await Location.getCurrentPositionAsync();
        setLatLng({latitude:latitude,longitude:longitude})
    } catch (error) { 
        
    }
}
useEffect(()=>{
  checkPermission();
  getLocation(),[]
})
useEffect(()=>{
  const updateUserCar = async()=>{

    // Get Auth user 

    const authenticatedUser = await Auth.currentAuthenticatedUser({bypassCache: true});
    if(!authenticatedUser){
      return ;
    }

    // check if the user has ready a car 

    const carData = await API.graphql(
      graphqlOperation(
        getCarId,
        {id: authenticatedUser.attributes.sub}
      )
    )

    if (!!carData.data.getCar) {
      console.log("User has already a car assigned")
      return;
    }

    // if not, create a new car for the user 
    const newCar = {
      id: authenticatedUser.attributes.sub,
      type:'UberX',
      userId: authenticatedUser.attributes.sub,
    }
    await API.graphql(graphqlOperation(
      createCar, {input: newCar}
    ))
  }
  updateUserCar();
},[])
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <HomeScreen />
    </SafeAreaView>
    </>
  );
}

export default withAuthenticator(App)
