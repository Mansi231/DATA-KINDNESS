import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import { FONTS } from '../../utils/fontFamily'
import { PaperProvider } from 'react-native-paper';
import { Button as PressableButton, DefaultTheme } from 'react-native-paper';

const Button = ({ text, style , onPress }) => {
  return (
    <PaperProvider theme={{ ...DefaultTheme, roundness: 0, }} >
      <PressableButton  style={[style]} mode="contained" onPress={onPress} buttonColor={COLOR.white} textColor={COLOR.black}>
        {text}
      </PressableButton>
    </PaperProvider>
  )
}

export default Button
