import Toast from 'react-native-toast-message';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, ScrollView, StatusBar, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import blurBg from '../../assets/bg.png'
import logo from '../../assets/logo_transparent.png'
import { hasNotch } from 'react-native-device-info';
import { FONTS } from '../../utils/fontFamily'
import Header from '../../components/common/Header'
import Button from '../../components/inputComp/Button'
import Dropdown from '../../components/inputComp/DropDown'
import BackAerrow from '../../components/common/BackAerrow'
import { ValContext } from '../../context/Context'
import { ROUTES } from '../../../services/routes';
import { KEYS, setItemToStorage } from '../../../services/storage';

const Lead = ({ navigation }) => {


  const { leadList, setLeadList, leadData, setLeadData, userDetail, setUserDetail } = useContext(ValContext)

  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavigation = () => {
    if (leadData?.selectLead) {
      navigation.navigate(ROUTES.USER_DETAIL)
    }
    else {
      Toast.show({
        type: 'error',
        text1: `Select lead amount.`,
        visibilityTime: 3000,
        swipeable: true,
        text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
        topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      });
    }
  }

  const handleSelectLead = async (item) => {
    setLeadData({ ...leadData, selectLead: item })
    await setItemToStorage(KEYS.screenData, { ...leadData, selectLead: item })
    await setItemToStorage(KEYS.lastScreen, ROUTES.LEAD);
  }

  return (
    <ImageBackground source={blurBg} style={{ flex: 1, width: '100%' }} resizeMode='cover'>
      <View
        style={{
          height: hasNotch() ? hp(6) : Platform?.OS == 'android' ? StatusBar?.currentHeight : hp(3),
          backgroundColor: 'transparent',
          width: '100%',
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header text={`Precision driven ${'\n'} lead generation`} />
          <ScrollView contentContainerStyle={{ width: '100%' }}>
            <View style={styles.box}>
              <Text style={[styles?.queText]}>How many leads you want to buy ?</Text>
              <Dropdown
                showDropdown={showDropdown} setShowDropdown={setShowDropdown} current={'selectedLead'} style={{ width: 'auto' }} options={leadList} onSelect={(item) => {
                  handleSelectLead(item)
                }} value={leadData?.selectLead?.label || 'Select'}
              />
              <Button text={'Buy'} onPress={handleNavigation} />
            </View>
          </ScrollView>
          <Toast position='top' />
          <BackAerrow onPress={() => navigation.navigate(ROUTES.HOME)} />
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