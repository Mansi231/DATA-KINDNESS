import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import { FONTS } from '../../utils/fontFamily'

const Button = ({text,style}) => {
  return (
    <TouchableOpacity style={[styles.btn,style]}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    btn:{paddingHorizontal:wp(10),paddingVertical:hp(1.2),backgroundColor:COLOR.white},
    btnText:{color:COLOR.black,fontSize:hp(2.1),fontFamily:FONTS.NunitoMedium,letterSpacing:wp(.1)}
})