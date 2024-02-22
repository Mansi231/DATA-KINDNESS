import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import { FONTS } from '../../utils/fontFamily'
import { PaperProvider, configureFonts } from 'react-native-paper';
import { Button as PressableButton, DefaultTheme } from 'react-native-paper';

const Button = ({ text, style, onPress }) => {

  const fontConfig = {
   fontFamily:FONTS.NunitoMedium
  };

  return (
    <PaperProvider theme={{ ...DefaultTheme, roundness: wp(.1), fonts: configureFonts({ config: fontConfig }) }} >
      <PressableButton style={
        [style]
      }
        mode="contained"
        onPress={onPress}
        buttonColor={COLOR.white}
        textColor={COLOR.black}
        labelStyle={{  fontSize: hp(1.9) ,paddingVertical:hp(1.5),paddingBottom:hp(.5),paddingHorizontal:wp(8)}}
        contentStyle={{ height: '100%' }}
      >
        {text}
      </PressableButton>
    </PaperProvider>
  )
}

export default Button
