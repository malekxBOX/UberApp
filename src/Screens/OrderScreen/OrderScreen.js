import React, { useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import OrderMap from '../../components/OrderMap/OrderMap'
import { useRoute } from '@react-navigation/native'
import { API, graphqlOperation } from 'aws-amplify';
import { getOrder, getCar } from '../../graphql/queries';
import {onCarUpdated, onOrderUpdated} from './subscriptions'
 const OrderScreen = (props)=>  {
  const [car, setCar] = useState(null) ;
  const [order, setOrder] = useState(null);

  const route = useRoute();
  console.log(route.params.id);
// fetch order on  initial render 
  useEffect (()=>{
      const fetchOrder = async() =>{
          try {
              const orderData = await API.graphql(
                  graphqlOperation(
                      getOrder, {id: route.params.id}
                  )
              )
              setOrder(orderData.data.getOrder);
          } catch (e) {
              console.error(e);
          }
      }
      fetchOrder();
  },[])
// Subscribe to order updates
useEffect(()=>{
    const subscription = API.graphql(
        graphqlOperation(
            onOrderUpdated,{id: route.params.id}
        )
    ).subscribe({
        next: ({ value }) => setOrder(value.data.onOrderUpdated),
        error: error => console.warn(error)
})
 return () => subscription.unsubscribe;
},[])

// fetch car data when order is updated 

  useEffect (()=>{
      if(!order?.carId || order.carId =='1' ){
          return;
      }
    const fetchCar = async() =>{
        try {
            const carData = await API.graphql(
                graphqlOperation(
                    getCar, {id: order.carId}
                )
            )
            console.log(carData);
            setCar(carData.data.getCar);
        } catch (e) {
            console.error(e);
        }
    }
    fetchCar();
},[order])
// subscribe to car update 
useEffect(()=>{
    if(!order?.carId || order.carId =='1' ){
        return;
    }
    const subscription = API.graphql(
        graphqlOperation(
            onCarUpdated,{id: order.carId}
        )
    ).subscribe({
        next: ({ value }) => setOrder(value.data.onCarUpdated),
        error: error => console.warn(error)
})
 return () => subscription.unsubscribe;
},[order])

    return (
      <View>
        <View style={{height:Dimensions.get('window').height}}>
            <OrderMap car = {car}/>
        </View>
        
      </View>
    )
  
}

export default OrderScreen
