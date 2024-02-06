import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import blurBg from '../../assets/blur_bg.jpg'
import logo from '../../assets/logo_transparent.png'
import { hasNotch } from 'react-native-device-info';
import { FONTS } from '../../utils/fontFamily'
import Header from '../../components/common/Header'

const Home = () => {
  return (
    <ImageBackground source={blurBg} style={{ flex: 1, width: '100%' }} resizeMode='cover'>
      <View
        style={{
          height: hasNotch() ? hp(6) : 0,
          backgroundColor: 'transparent',
          width: '100%',
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header text={`Precision driven ${'\n'} lead generation`} />
          <View style={styles.box}>
            <Text style={[styles.text, styles?.underLineText]}>Visit website</Text>
            <Text style={[styles.text, styles?.underLineText]}>buy leads</Text>
            <Text style={[styles.text, styles?.underLineText]}>buy membership</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: hp(3),
    backgroundColor: 'transparent',
    gap: hp(15), paddingHorizontal: wp(5)
  },
  box: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: hp(2) },
  logo: {
    height: hp(15), width: hp(15)
  },
  text: { fontSize: hp(2.1), color: COLOR.white, textTransform: 'uppercase', letterSpacing: wp(.2), lineHeight: hp(3), fontFamily: FONTS.NunitoBold },
  underLineText: { textDecorationStyle: 'solid', textDecorationColor: COLOR.white, textDecorationLine: 'underline', fontWeight: 'bold', fontSize: hp(3), lineHeight: hp(4) }
})