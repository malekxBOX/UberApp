import React, { Component } from 'react'
import { Text, View,Image } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'

const UberTypeRow = (props)=> {
  const {type} = props;

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
      <View style={styles.container}>
    
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
            <Icon 
            type='material-community'
            name='cash'
            size={18}
            color={'#42d742'}
            />
            <Text style={styles.price}> est. ${type.price}</Text>
        </View>

      </View>
    )
  
}

export default UberTypeRow
