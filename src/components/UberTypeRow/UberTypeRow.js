import React, { Component } from 'react'
import { Text, View,Image, Pressable } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'

const UberTypeRow = (props)=> {
  const {type, onPress, isSelected} = props;

  const getImage  = ()=>{
if (type.type === 'UberX') {
    return require('../../../assets/UberX.jpeg')
}
if (type.type === 'Comfort') {
    return require('../../../assets/Comfort.jpeg')
}
if (type.type === 'UberXL') {
    return require('../../../assets/UberXL.jpeg')
}
  }
    return (
      <Pressable onPress={onPress} 
      
      style={[styles.container,{
          backgroundColor:isSelected?'#efefef':'white',
         }]}>
    
        <Image 
            style={styles.image}
            source = {getImage()}
        />
        <View style={styles.middleContainer}>
            <Text style={styles.type}>
                {type.type}{' '}
                <Icon 
                type='material-community'
                name='account-outline'
                size={12}
            /> 3
            </Text>
            <Text style={styles.time}>
                8:03PM drop off
            </Text>
        </View>

        <View style={styles.rightContainer}>
            
            <Text style={styles.price}> {type.price} TDN </Text>
            <Icon 
            type='material-community'
            name='cash'
            size={18}
            color={'#42d742'}
            />
        </View>

      </Pressable>
    )
  
}

export default UberTypeRow
