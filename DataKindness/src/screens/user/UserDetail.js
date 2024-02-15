import Toast from 'react-native-toast-message';
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { hasNotch } from 'react-native-device-info';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import { FONTS } from '../../utils/fontFamily'
import blurBg from '../../assets/blur_bg.jpg'
import Header from '../../components/common/Header';
import TextInput from '../../components/inputComp/TextInput';
import Dropdown from '../../components/inputComp/DropDown';
import Button from '../../components/inputComp/Button';
import BackAerrow from '../../components/common/BackAerrow';
import { ValContext } from '../../context/Context';
import { client } from '../../../services/client';
import { CardField, useStripe, useConfirmPayment, initStripe } from '@stripe/stripe-react-native';

const UserDetail = ({ navigation }) => {

    const { businessCategoryList, leadData, setLeadData, } = useContext(ValContext)

    const userDetail = leadData?.userDetail;
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const [detail, setDetail] = useState(userDetail ? userDetail : { name: '', email: '', number: '', category: null, website: '' })
    const [showDropdown, setShowDropdown] = useState(false);

    const handleNavigation = () => {
        
        let { name, email, number, category, website } = detail
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

            client.post(`user/addUser`, { ...detail, leadAmount: leadData?.selectLead?.amount }).then(async (res) => {

                Toast.show({
                    type: 'success',
                    text1: `Saved Successfully !`,
                    visibilityTime: 3000,
                    swipeable: true,
                    text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                    topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                });
                console.log(res.data, ':: res :');
                const clientSecret = res.data?.client_secret;
                const { error, paymentOption } = await initPaymentSheet({
                    merchantDisplayName: 'Data Kindness',
                    paymentIntentClientSecret: clientSecret,
                })
                if (error) return console.log(error, ':: error happened  ::');

                presentPaymentSheet().then((result) => {

                    console.log(result, ':: result ::');
                }).catch((err) => { console.log(err, ':: err in sheet ::'); });

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
                    height: hasNotch() ? hp(6) : 0,
                    backgroundColor: 'transparent',
                    width: '100%',
                }}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header />
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
                                    onChangeText={(text) => setDetail({ ...detail, name: text })}
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
                                    onChangeText={(text) => setDetail({ ...detail, email: text })}
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
                                    onChangeText={(text) => setDetail({ ...detail, number: text })}
                                    value={detail?.number}
                                    onBlur={() => { }}
                                />
                                <TextInput
                                    onFocus={() => { }}
                                    style={[styles?.datePickerViewStyle]}
                                    editable={true}
                                    placeholder={'Website'}
                                    require={true}
                                    keyboardType={'default'}
                                    onChangeText={(text) => setDetail({ ...detail, website: text })}
                                    value={detail?.website}
                                    onBlur={() => { }}
                                />
                                <Dropdown
                                    showDropdown={showDropdown} setShowDropdown={setShowDropdown} current={'selectedCategory'} style={{ width: 'auto' }} options={businessCategoryList} onSelect={(item) => {
                                        setDetail({ ...detail, category: item })
                                    }} value={detail?.category?.label || 'Select Business Category'}
                                />
                                <Button text={'Submit'} style={{ marginTop: hp(3) }} onPress={handleNavigation} />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <Toast position='top' />

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