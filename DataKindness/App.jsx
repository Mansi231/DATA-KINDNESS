import 'react-native-gesture-handler';
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { hasNotch } from 'react-native-device-info';
import { COLOR } from './src/utils/color'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './pixel/index';
import MainStackNavigator from './src/navigation/navigation'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    
      <MainStackNavigator />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})