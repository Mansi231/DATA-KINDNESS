import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainStackNavigator from './src/navigation/navigation'
import Context from './src/context/Context';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISH_KEY } from "@env"

const App = () => {

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <StripeProvider publishableKey={STRIPE_PUBLISH_KEY} merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme"
    >
      <Context>
        <MainStackNavigator />
      </Context>
    </StripeProvider>
    // </SafeAreaView>
  )

}

export default App

const styles = StyleSheet.create({})