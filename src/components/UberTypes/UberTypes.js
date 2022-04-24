import React, { Component } from 'react'
import { Pressable, Text, View } from 'react-native'
import UberTypeRow from '../UberTypeRow/UberTypeRow'
import typeData from '../../data/types'
const UberTypes = () =>{
  const confirm = () =>{
    console.warn ('confirm');
  }
    return (
      <View>
        {typeData.map((type )=> (
        <UberTypeRow 
       
        type={type}
        key={type.id} 
        />
        ))}

<Pressable onPress={confirm} style={{
        backgroundColor: 'black',
        padding: 10,
        margin: 10,
        alignItems: 'center',
      }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Confirm Uber
        </Text>
      </Pressable>
    </View>
    )
 
}
export default UberTypes