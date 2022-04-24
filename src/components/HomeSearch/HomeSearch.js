import { useNavigation } from '@react-navigation/native'
import React, { PureComponent } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'
const  HomeSearch =()=>  {
  const navigation = useNavigation()

  const goToSearch = ()=>{
    navigation.navigate('DestinationScreen')
  }
  
    return (
      <View>
        {/* Input Box  */}
        <Pressable style={
          styles.inputBox
        } onPress={goToSearch}>
          <Text style={
            styles.inputText
          }>Where To ?</Text>

          <View style={
            styles.timeContainer
          }>
            <Icon 
              type='material-community'
              name='clock'
              size={16}
            />
            <Text>Now</Text>
            <Icon 
            type="material-community"
            name='chevron-down'
            size={16}
            />
          </View>

        </Pressable>
        {/* Previous destinations */}
        <View style={
          styles.row
        }>
          <View style={
            styles.iconContainer
          }>
            <Icon 
              type='material-community'
              name='clock-time-nine-outline'
              size={20}
              color={"#fff"}
            />
            </View>
            <Text style={
              styles.destinationText
              }>Spin Nightclub
              </Text>
        </View>

        <View style={
          styles.row
        }>
          <View style={
            [styles.iconContainer,
            {backgroundColor:'#218cff'}]
          }>
            <Icon 
              type='material-community'
              name='home'
              size={20}
              color={"#fff"}
            />
            </View>
            <Text style={
              styles.destinationText
              }>Spin Nightclub
              </Text>
        </View>
        
        {/* Home destination */}
      </View>
    )
  
}
export default HomeSearch
