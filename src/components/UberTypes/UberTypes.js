import React, { Component } from 'react'
import { Pressable, Text, View } from 'react-native'
import UberTypeRow from '../UberTypeRow/UberTypeRow'
import typeData from '../../data/types'
const UberTypes = ({typeState, onSubmit}) =>{
  const [selectedType , setSelectedType] = typeState;


    return (
      <View>
        {typeData.map((type )=> (
        <UberTypeRow 
        type={type}
        key={type.id} 
        isSelected={type.type === selectedType}
        onPress = {()=>setSelectedType(type.type)}
        />
        ))}

<Pressable onPress={onSubmit} style={{
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