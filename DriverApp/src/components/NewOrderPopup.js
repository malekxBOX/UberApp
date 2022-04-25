import React from 'react'
import { Text, View ,Image, Pressable} from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'
const  NewOrderPopup = ({newOrder, onAccept, onDecline, duration, distance}) =>{

    return (
      <View style = {
          styles.root
          }>
        <Pressable onPress={onDecline} style={styles.declineButton}>
            <Text style={styles.declineText}>Decline</Text>
        </Pressable>
        <Pressable onPress={onAccept} style={
            styles.popupContainer
        }>
            <View style={styles.row}>
                <Text style={styles.uberType}>{newOrder.type}</Text>
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
                    {newOrder.user.rating}
                </Text>
            </View>
            <Text style={styles.minutes}>{duration} min</Text>
            <Text style={styles.distance}>{distance}mi</Text>
        </Pressable>
      </View>
    )
  
}

export default NewOrderPopup
