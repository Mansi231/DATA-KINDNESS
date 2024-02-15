import 'react-native-gesture-handler';
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { hasNotch } from 'react-native-device-info';
import { COLOR } from './src/utils/color'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './pixel/index';
import MainStackNavigator from './src/navigation/navigation'
import Context from './src/context/Context';
import { StripeProvider } from '@stripe/stripe-react-native';
import {STRIPE_PUBLISH_KEY} from "@env"

const App = () => {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <StripeProvider publishableKey={STRIPE_PUBLISH_KEY} urlScheme='stripesdk://payment_return_url/com.datakindness'>
      <Context>
        <MainStackNavigator />
      </Context> 
    </StripeProvider>
    // </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})