import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer  } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react'
import { View,Text } from 'react-native';
import CustomDrawer from './CustomDrawer';
import Home from './Home';

const Drawer = createDrawerNavigator();

const DummyScreen = (props)=>(
    <View style = {{flex:1,justifyContent:'center', alignItems:'center'}}>
        <Text>{props.name}</Text>
    </View>
)
const RootNavigation = (props) =>  {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
           <Drawer.Navigator drawerContent={
            (props)=>(
              <CustomDrawer {...props}/>
            )
           }
           screenOptions = {{
            headerShown : false,
        }}
          //  drawerContent={(props)=>(
          //    <CustomDrawer {...props}/>)
           
          //  }
           >
               <Drawer.Screen name="HomePage" component={Home }/>

               <Drawer.Screen name='Your Trips' >
                   {() => <DummyScreen name={'Your Trips'}/>}
                </Drawer.Screen>

                <Drawer.Screen name='Help' >
                   {() => <DummyScreen name={'Help'}/>}
                </Drawer.Screen>

                <Drawer.Screen name='Wallet' >
                  {() =>  <DummyScreen name={'Wallet'}/>}
                </Drawer.Screen>

                <Drawer.Screen name='Settings' >
                   {() => <DummyScreen name={'Settings'}/>}
                </Drawer.Screen>

           </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation
