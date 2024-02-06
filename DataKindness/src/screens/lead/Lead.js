import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import blurBg from '../../assets/blur_bg.jpg'
import logo from '../../assets/logo_transparent.png'
import { hasNotch } from 'react-native-device-info';
import { FONTS } from '../../utils/fontFamily'
import Header from '../../components/common/Header'
import Button from '../../components/inputComp/Button'
import Dropdown from '../../components/inputComp/DropDown'
import BackAerrow from '../../components/common/BackAerrow'

const Lead = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectLead, setSelectLead] = useState(null)

  let options = [
    { amount: 200, price: 10, label: 200 },
    { amount: 200, price: 10, label: 200 },
    { amount: 200, price: 10, label: 200 },
    { amount: 200, price: 10, label: 200 },
  ]

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
          <ScrollView contentContainerStyle={{width: '100%' }}>
            <View style={styles.box}>
              <Text style={[styles?.queText]}>How many leads you want to buy ?</Text>
              <Dropdown
                showDropdown={showDropdown} setShowDropdown={setShowDropdown} current={'selectedLead'} style={{ width: 'auto' }} options={options} onSelect={(item) => {
                  setSelectLead(item)
                }} value={selectLead?.label || 'Select'}
              />
              <Button text={'Buy'} />
            </View>
          </ScrollView>
          <BackAerrow />
        </View>
      </SafeAreaView>

    </ImageBackground>
  )
}

export default Lead

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: hp(3),
    backgroundColor: 'transparent',
    gap: hp(5), 
    paddingHorizontal: wp(5),
     flexDirection: 'column'
  },
  box: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: hp(2), marginTop: hp(5) },
  logo: {
    height: hp(15), width: hp(15)
  },
  text: { fontSize: hp(2.1), color: COLOR.white, textTransform: 'uppercase', letterSpacing: wp(.2), lineHeight: hp(3), fontFamily: FONTS.NunitoBold },
  queText: { color: COLOR.white, fontFamily: FONTS.NunitoMedium, fontSize: hp(2.4), letterSpacing: wp(.2) }
})