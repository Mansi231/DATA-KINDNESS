import Toast from 'react-native-toast-message';
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { hasNotch } from 'react-native-device-info';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import { FONTS } from '../../utils/fontFamily'
import blurBg from '../../assets/bg.png'
import Header from '../../components/common/Header';
import TextInput from '../../components/inputComp/TextInput';
import Button from '../../components/inputComp/Button';
import moment from 'moment'
import DatePicker from 'react-native-date-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import BackAerrow from '../../components/common/BackAerrow';
import VisaCard from '../../assets/visa-card.png'
import MasterCard from '../../assets/master-card.png'
import DiscoverCard from '../../assets/discover-card.png'
import { ValContext } from '../../context/Context';
import { ROUTES } from '../../../services/routes';
import { client } from '../../../services/client';
import { clearStorage } from '../../../services/storage';

const CardDetails = ({ navigation }) => {

    const [detail, setDetail] = useState({ holder_name: '', card_number: '', cvv: '', expiry_date: moment(), zipcode: '', billing_address: '' })
    const [open, setOpen] = useState(false)
    const { leadData } = useContext(ValContext)

    const handleSubmit = async () => {

        let { holder_name, card_number, cvv, expiry_date, zipcode, billing_address } = detail

        console.log(expiry_date.format('DD-MM-YYYY'), ':: date ::');

        if (holder_name.trim() == '' || card_number.trim() == '' || cvv.trim() == '' || zipcode.trim() == '' || billing_address.trim() == '') {
            Toast.show({
                type: 'error',
                text1: `Fill all the fields.`,
                visibilityTime: 3000,
                swipeable: true,
                text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            });
            return;
        }

        if (!/^\d{16}$/.test(detail.card_number.trim())) {
            Toast.show({
                type: 'error',
                text1: `Please enter a valid 16-digit card number.`,
                visibilityTime: 3000,
                swipeable: true,
                text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            });
            return;
        }

        if (!/^\d{3}$/.test(detail.cvv.trim())) {
            Toast.show({
                type: 'error',
                text1: `Please enter a valid 3-digit CVV.`,
                visibilityTime: 3000,
                swipeable: true,
                text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            });
            return;
        }

        if (!/^\d{6}$/.test(detail.zipcode.trim())) {
            Toast.show({
                type: 'error',
                text1: `Please enter a valid 6-digit zipcode.`,
                visibilityTime: 3000,
                swipeable: true,
                text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            });
            return;
        }

        client.post(`pay/confirm-payment`, { ...detail, category: leadData?.userDetail?.category?._id, lead: leadData?.selectLead?._id, email: leadData?.userDetail?.email }).then(async(res) => {
            setDetail({ holder_name: '', card_number: '', cvv: '', expiry_date: moment(), zipcode: '', billing_address: '' })
            await clearStorage();
            Toast.show({
                type: 'success',
                text1: `Payment Successfull !`,
                visibilityTime: 3000,
                swipeable: true,
                text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                onHide: () => { 
                    navigation.reset({index:0,routes:[{name:ROUTES.HOME}]})
                 }
            });
        }).catch((err) => {
            Toast.show({
                type: 'error',
                text1: `${err?.response?.data?.error}`,
                visibilityTime: 3000,
                swipeable: true,
                text1Style: { fontFamily: FONTS.NunitoMedium, fontSize: hp(1.3), color: COLOR.black, letterSpacing: wp(.1) },
                topOffset: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            })
        });

    };


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
                    <Text style={styles.queText}>Please enter following details</Text>
                    <KeyboardAvoidingView
                        style={{ flex: 1, flexGrow: 1, width: '100%' }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // adjust this value based on your UI
                    >
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: hp(1) }}>

                                <View style={styles.cardBox}>
                                    <Image source={VisaCard} style={{ height: hp(6), width: wp(20), backgroundColor: COLOR.white }} resizeMode='contain' />
                                    <Image source={MasterCard} style={{ height: hp(6), width: wp(20), }} resizeMode='stretch' />
                                    <Image source={DiscoverCard} style={{ height: hp(6), width: wp(20), backgroundColor: COLOR.white }} resizeMode='contain' />
                                </View>

                                <TextInput
                                    onFocus={() => { }}
                                    style={[styles?.datePickerViewStyle]}
                                    editable={true}
                                    placeholder={'Card Holder Name'}
                                    require={true}
                                    keyboardType={'default'}
                                    onChangeText={(text) => setDetail({ ...detail, holder_name: text })}
                                    value={detail?.holder_name}
                                    onBlur={() => { }}
                                />
                                <TextInput
                                    onFocus={() => { }}
                                    style={[styles?.datePickerViewStyle]}
                                    editable={true}
                                    placeholder={'Card Number'}
                                    require={true}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => setDetail({ ...detail, card_number: text })}
                                    value={detail?.card_number}
                                    onBlur={() => { }}
                                    maxLength={16}
                                />

                                <View style={styles.row}>
                                    <View style={[styles.dateBox, { paddingRight: wp(2) }]}>
                                        <TouchableOpacity
                                            style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }]}
                                            activeOpacity={1}
                                            onPress={() => {
                                                setOpen(!open);
                                            }}>
                                            <Text
                                                style={[styles.datePickerStyle]}>
                                                {detail?.expiry_date?.format('DD-MM-YYYY')}
                                            </Text>

                                            <DatePicker
                                                theme='dark'
                                                modal
                                                open={open}
                                                date={detail?.expiry_date?.toDate()}
                                                mode={'date'}
                                                onConfirm={val => {
                                                    setOpen(false);
                                                    setDetail({ ...detail, expiry_date: moment(val) })
                                                }}
                                                // maximumDate={moment().toDate()}
                                                minimumDate={moment()?.toDate()}
                                                onCancel={() => {
                                                    setOpen(false);
                                                }}
                                            />
                                            <EvilIcons name='calendar' color={COLOR.white} size={hp(2.5)} />
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        onFocus={() => { }}
                                        style={[styles?.datePickerViewStyle, { width: '10%' }]}
                                        editable={true}
                                        placeholder={'CVV'}
                                        require={true}
                                        keyboardType={'numeric'}
                                        onChangeText={(text) => setDetail({ ...detail, cvv: text })}
                                        value={detail?.cvv}
                                        onBlur={() => { }}
                                        maxLength={3}
                                    />
                                </View>

                                <TextInput
                                    onFocus={() => { }}
                                    style={[styles?.datePickerViewStyle]}
                                    editable={true}
                                    placeholder={'Enter Zipcode'}
                                    require={true}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => setDetail({ ...detail, zipcode: text })}
                                    value={detail?.zipcode}
                                    onBlur={() => { }}
                                    maxLength={6}
                                />
                                <TextInput
                                    onFocus={() => { }}
                                    style={[styles?.datePickerViewStyle, { height: hp(12) }]}
                                    editable={true}
                                    placeholder={'Billing Address'}
                                    require={true}
                                    keyboardType={'default'}
                                    onChangeText={(text) => setDetail({ ...detail, billing_address: text })}
                                    value={detail?.billing_address}
                                    onBlur={() => { }}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                <Button text={'Submit'} style={{ marginTop: hp(3) }} onPress={handleSubmit} />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <BackAerrow onPress={() => navigation.navigate(ROUTES.USER_DETAIL)} />
                </View>
            </SafeAreaView>

        </ImageBackground>
    )
}

export default CardDetails

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: hp(3),
        paddingHorizontal: wp(5), gap: hp(2),
    },
    queText: { color: COLOR.white, fontSize: hp(1.8), letterSpacing: wp(.2), fontFamily: FONTS.NunitoMedium },

    cardBox: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: wp(3), marginBottom: hp(1.3) },

    datePickerViewStyle: {
        alignItems: 'center', flexDirection: 'row', width: '100%',
        height: hp(6.2),
        borderRadius: hp(.2),
        flexGrow: 1,
        textAlign: 'left',
        backgroundColor: COLOR.black30
    },
    row: { alignItems: 'center', flexDirection: 'row', gap: wp(2), width: '100%', },
    dateBox: {
        flexDirection: 'row', gap: wp(2), justifyContent: 'space-between', paddingRight: wp(3),
        alignItems: 'center', flexDirection: 'row',
        height: hp(6.2),
        borderRadius: hp(.2),
        flexGrow: 1,
        textAlign: 'left',
        backgroundColor: COLOR.black30,
    },
    datePickerStyle: {
        fontSize: hp(1.7),
        color: COLOR.white,
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