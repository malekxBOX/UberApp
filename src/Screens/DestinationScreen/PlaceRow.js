import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements';
import styles from './style';


const PlaceRow = ({data})=> {
    
  
    return (
      <View style={styles.row}>
      
        {data.description === 'Home' ? 
        <View style={{
          backgroundColor: '#218cff',
          padding: 5,
          borderRadius: 50,
          marginRight: 15,
        }}>
        < Icon
          type='material-community'
          name='home'
          size={25}
          color= {'white'}
        /></View>: 
        data.description === 'Work'?
        <View style={{
          backgroundColor: '#218cff',
          padding: 5,
          borderRadius: 50,
          marginRight: 15,
        }}>
        < Icon
          type='material-community'
          name='map-marker'
          size={25}
          color= {'white'}
        /></View>
        :
        <View style= {styles.iconContainer}>
        <Icon
        type='material-community'
        name='map-marker'
        size={25}
        color={'white'}
        />
        </View>
        }
        
        
        
        <Text style={styles.locationText}>{data.description||data.vicinity}</Text>
      </View>
    )
  
}

export default PlaceRow
