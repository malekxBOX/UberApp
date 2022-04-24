import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,PermissionsAndroid, Platform } from 'react-native';
import DestinationMapScreen from './src/Screens/DestinationMapScreen/DestinationMapScreen';
import HomeScreen from './src/Screens/HomeScreen'
import DestinationScreen from './src/Screens/DestinationScreen/DestinationScreen'
import { useEffect } from 'react';
import * as Location from 'expo-location'
import RootNavigation from './src/navigation/RootNavigation';
import { withAuthenticator } from 'aws-amplify-react-native';


import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

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
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <RootNavigation/>
    </>
  );
}

export default withAuthenticator(App);