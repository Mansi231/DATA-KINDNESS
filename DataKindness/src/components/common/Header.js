import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from '../../../pixel'
import { FONTS } from '../../utils/fontFamily'
import { COLOR } from '../../utils/color'
import logo from '../../assets/logo_transparent.png'

const Header = ({text}) => {
    return (
        <View style={styles.box}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    box: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: hp(2) },
    logo: {
        height: hp(15), width: hp(15)
    },
    text: { fontSize: hp(2.1), color: COLOR.white, textTransform: 'uppercase', letterSpacing: wp(.2), lineHeight: hp(3), fontFamily: FONTS.NunitoBold },
})