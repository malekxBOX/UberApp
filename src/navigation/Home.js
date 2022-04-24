
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react'

import DestinationMapScreen from '../Screens/DestinationMapScreen/DestinationMapScreen'
import DestinationScreen from '../Screens/DestinationScreen/DestinationScreen'
import HomeScreen from '../Screens/HomeScreen'

const Home = () =>  {
    const Stack = createNativeStackNavigator();
    return (
        
            <Stack.Navigator
            screenOptions = {{
                headerShown : false,
            }}
            
            >
                <Stack.Screen name ={'Home'} component = {HomeScreen} />
                <Stack.Screen name ={'DestinationScreen'} component = {DestinationScreen} />
                <Stack.Screen name ={'DestinationMapScreen'} component = {DestinationMapScreen} />
            </Stack.Navigator>
    )
}

export default Home
