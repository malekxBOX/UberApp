import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import CovidMessage from '../components/CovidMessage/CovidMessage'
import HomeMap from '../components/HomeMap/HomeMap'
import HomeSearch from '../components/HomeSearch/HomeSearch'

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <View style={{height:Dimensions.get('window').height - 400}}>
          <HomeMap/>
          
        </View>
        
        <CovidMessage/>
        <HomeSearch/>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({})
