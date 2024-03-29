import Toast from 'react-native-toast-message';
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { hasNotch } from 'react-native-device-info';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import { FONTS } from '../../utils/fontFamily'
import blurBg from '../../assets/bg.png'
import Header from '../../components/common/Header';
import TextInput from '../../components/inputComp/TextInput';
import Dropdown from '../../components/inputComp/DropDown';
import Button from '../../components/inputComp/Button';
import BackAerrow from '../../components/common/BackAerrow';
import { ValContext } from '../../context/Context';
import { client } from '../../../services/client';
import { ROUTES } from '../../../services/routes';
import { KEYS, setItemToStorage } from '../../../services/storage';

const UserDetail = ({ navigation }) => {

    const { businessCategoryList, leadData, setLeadData, setClientDetail, clientDetail } = useContext(ValContext)

    const detail = leadData?.userDetail ?leadData?.userDetail :{ name: '', email: '', number: '', category: null, website: '' };

    const [showDropdown, setShowDropdown] = useState(false);

    const handleNavigation = async () => {
        let { name, email, number, category, website, leadAmount } = detail
        if (!name || !email || !number || !category || !website) {
            Toast.show({
                type: 'error',
                text1: `Fill all the fields.`,
                visibilityTime: 3000,
                swipeable: true,
                text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            });
        }
        else {
            setLeadData({ ...leadData, userDetail: detail })

            client.post(`user/addUser`, { ...detail}).then(async (res) => {

                await setItemToStorage(KEYS.screenData,{ ...leadData, userDetail: detail })
                await setItemToStorage(KEYS.lastScreen, ROUTES.USER_DETAIL);

                Toast.show({
                    type: 'success',
                    text1: `Saved Successfully !`,
                    visibilityTime: 3000,
                    swipeable: true,
                    text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                    topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                    onHide: () => { navigation.navigate(ROUTES.CARD_DETAIL) }
                });

            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: `${err?.response?.data?.error}`,
                    visibilityTime: 3000,
                    swipeable: true,
                    text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                    topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                });
            })
        }
    }

    return (
        <ImageBackground source={blurBg} style={{ flex: 1, width: '100%' }} resizeMode='cover'>
            <StatusBar translucent barStyle={'light-content'} backgroundColor={'transparent'} />
            <View
                style={{
                    height: hasNotch() ? hp(6) : Platform?.OS == 'android'? StatusBar?.currentHeight : hp(3),
                    backgroundColor: 'transparent',
                    width: '100%',
                }}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header />
                    <Toast position='top' />

                    <KeyboardAvoidingView
                        style={{ flex: 1, flexGrow: 1, width: '100%' }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // adjust this value based on your UI
                    >
                        <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%' }}>
                            <Text style={styles.queText}>Please enter following details</Text>
                            <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: hp(1) }}>

                                <TextInput
                                    onFocus={() => { }}
                                    style={[styles?.datePickerViewStyle]}
                                    editable={true}
                                    placeholder={'Name'}
                                    require={true}
                                    keyboardType={'default'}
                                    onChangeText={(text) => setLeadData({...leadData,userDetail:{ ...detail, name: text }})}
                                    value={detail?.name}
                                    onBlur={() => { }}
                                />

                                <TextInput
                                    onFocus={() => { }}
                                    style={[styles?.datePickerViewStyle]}
                                    editable={true}
                                    placeholder={'Email'}
                                    require={true}
                                    keyboardType={'default'}
                                    onChangeText={(text) => setLeadData({...leadData,userDetail:{ ...detail, email: text }})}
                                    value={detail?.email}
                                    onBlur={() => { }}
                                />
                                <TextInput
                                    onFocus={() => { }}
                                    style={[styles?.datePickerViewStyle]}
                                    editable={true}
                                    placeholder={'Phone number'}
                                    require={true}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => setLeadData({...leadData,userDetail:{ ...detail, number: text }})}
                                    value={detail?.number}
                                    onBlur={() => { }}
                                    maxLength={10}
                                />
                                <TextInput
                                    onFocus={() => { }}
                                    style={[styles?.datePickerViewStyle]}
                                    editable={true}
                                    placeholder={'Website'}
                                    require={true}
                                    keyboardType={'default'}
                                    onChangeText={(text) => setLeadData({...leadData,userDetail:{ ...detail, website: text }})}
                                    value={detail?.website}
                                    onBlur={() => { }}
                                />
                                <Dropdown
                                    showDropdown={showDropdown} setShowDropdown={setShowDropdown} current={'selectedCategory'} style={{ width: 'auto' }} options={businessCategoryList} onSelect={(item) => {
                                        setLeadData({...leadData,userDetail:{ ...detail, category: item }})
                                    }} value={detail?.category?.label || 'Select Business Category'}
                                />
                                <Button text={'Submit'} style={{ marginTop: hp(3) }} onPress={handleNavigation} />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>

                    <BackAerrow onPress={() => navigation.goBack()} />

                </View>
            </SafeAreaView>

        </ImageBackground>
    )
}

export default UserDetail

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: hp(3),
        paddingHorizontal: wp(5), gap: hp(2), flexDirection: 'column'
    },
    queText: { color: COLOR.white, fontSize: hp(1.8), letterSpacing: wp(.2), fontFamily: FONTS.NunitoMedium, marginVertical: hp(2.5), textAlign: 'center' },
    datePickerViewStyle: {
        alignItems: 'center', flexDirection: 'row', width: '100%'
    },
    datePickerStyle: {
        fontSize: hp(1.68),
        color: COLOR.primaryBlue,
        paddingHorizontal: wp(2.6),
        paddingVertical: hp(1.1),
        letterSpacing: 1,
        fontFamily: FONTS.NunitoMedium, textAlignVertical: 'center'
    },
    dateText: {
        color: COLOR.white, fontFamily: FONTS.NunitoRegular,
        fontSize: hp(1.6), textAlignVertical: 'center'
    },
})