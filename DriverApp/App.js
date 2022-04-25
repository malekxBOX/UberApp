import {  SafeAreaView, Text, View,StatusBar } from 'react-native';
import {Icon} from 'react-native-elements'
import HomeScreen from './src/screens/HomeScreen';
export default function App() {
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <HomeScreen />
    </SafeAreaView>
    </>
  );
}


