import {  SafeAreaView, Text, View,StatusBar } from 'react-native';
import {Icon} from 'react-native-elements'
import HomeScreen from './src/screens/HomeScreen';
import * as Location from 'expo-location'
import { useEffect } from 'react';

export default function App() {

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
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <HomeScreen />
    </SafeAreaView>
    </>
  );
}


