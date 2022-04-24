import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React, { Component } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import {Auth} from 'aws-amplify'
const CustomDrawer =(props)=>{
    return (
      <DrawerContentScrollView {...props}>
        <View style={{backgroundColor:'#212121',padding:15}}>



            {/* User Row */}

            <View style={{
                flexDirection:'row',
                alignItems:'center'
            }}>
                <View style={{
                    backgroundColor:"#cacaca",
                    width:70,
                    height:70,
                    borderRadius:35,
                    marginRight:10
                }}>
                  <Icon 
                    type='material-community'
                    name='account'
                    size={60}
                    color='grey'
                  />
                </View>
                <View>
                     <Text style={{color:'white',fontSize:24}}>Ben Salah Malek</Text> 
                     <View style={{flexDirection:'row'}}>
                     <Text style={{color:'lightgrey'}}>5.00 </Text>
                      <Icon 
                     type='material-community'
                     name='hexagram'
                     color={'white'}
                     size={15}
                     />
                     </View>
                  </View> 
            </View>



            {/* Message Row */}
            <View style={{
                
                borderBottomWidth:0.5,
                borderBottomColor:'#eee',
                borderTopWidth:0.5,
                borderTopColor:'#eee',
                paddingVertical:5,
                marginVertical:10,
                flexDirection:"row",
                justifyContent:"space-between"
                
                }}>
                <Pressable onPress={()=>{console.warn('Message')}} >
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:250,alignItems:'center'}}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Text style={{color:'#ddd',paddingVertical:5,lineHeight:40,letterSpacing:1}}>Messages</Text>
                       <View style={{height:10,width:10,backgroundColor:'lightgreen',borderRadius:15,marginLeft:15}}></View>
                    </View>
                    <View>
                        <Icon   
                            type='material-community'
                            name='chevron-right'
                            color={'#ddd'}
                        />
                    </View>
                    </View>
                    
                </Pressable>     

            </View>



            {/* Do more  */}
            <Pressable onPress={()=>{console.warn('Do more with your account')}}>
                <Text style={{color:'#ddd',paddingVertical:5,letterSpacing:1}}>Do more with your account</Text>

            </Pressable>
            {/* Make money */}
            <Pressable onPress={()=>{console.warn('Make Money Driving')}}>
                <Text style={{color:'white',letterSpacing:1,marginTop:10}}>Make money driving</Text>

            </Pressable>

             

        </View>
        <DrawerItemList {...props}/>
        {/* LOGOUT */}
        <Pressable onPress={()=>{Auth.signOut()}}>
                <Text style={{letterSpacing:1,marginTop:10,paddingLeft:20}}>Logout</Text>
        </Pressable>
      </DrawerContentScrollView>
    )
}

export default CustomDrawer
