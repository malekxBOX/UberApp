import React from 'react'
import { Text, View ,Image, Pressable} from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'
const  NewOrderPopup = () =>{
  const onDecline = () =>{
      console.warn('on decline order')
  }
    return (
      <View style = {
          styles.root
          }>
        <Pressable onPress={onDecline} style={styles.declineButton}>
            <Text style={styles.declineText}>Decline</Text>
        </Pressable>
        <View style={
            styles.popupContainer
        }>
            <View style={styles.row}>
                <Text style={styles.uberType}>UberX</Text>
                <Icon 
                    type='material-community'
                    name='account'
                    color='white'
                    size={35}
                    style={styles.userBg}
                    />
                <Text style={styles.uberType}>
                    <Icon 
                    type='material-community'
                    name='star'
                    color='white'
                    size={18}
                    />
                    5
                </Text>
            </View>
            <Text style={styles.minutes}>2 min</Text>
            <Text style={styles.distance}>0.2 mi</Text>
        </View>
      </View>
    )
  
}

export default NewOrderPopup
