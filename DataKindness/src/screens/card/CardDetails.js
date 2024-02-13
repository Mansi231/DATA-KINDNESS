import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { hasNotch } from 'react-native-device-info';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { COLOR } from '../../utils/color'
import { FONTS } from '../../utils/fontFamily'
import blurBg from '../../assets/blur_bg.jpg'
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
import PaymentScreen from '../order/PaymentScreen';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';

const CardDetails = () => {

    const [detail, setDetail] = useState({ holder_name: '', card_number: '', cvv: '', expiry_date: moment(), zipcode: '', billing_address: '' })
    const [open, setOpen] = useState(false)

    // const { confirmPayment } = useStripe();
    const { loading, confirmPayment } = useConfirmPayment()

    const handleSubmit = async () => {
        const billingDetails = {
            name: 'mansi',
        };

        const { paymentIntent, error } = await confirmPayment('pi_3OjE5nSDRTuxnZ6y0ByX6Vhh_secret_HpRnRaJFBgDIyun4wMWf8jLwo', {
            paymentMethodType:"Card",
            billingDetails,
        });
        if (error) {
            console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
            console.log('Success from promise', paymentIntent);
        }
    }

    return (
        <ImageBackground source={blurBg} style={{ flex: 1, width: '100%' }} resizeMode='cover'>
            <StatusBar translucent barStyle={'light-content'} backgroundColor={'transparent'} />
            <View
                style={{
                    height: hasNotch() ? hp(5) : hp(3),
                    backgroundColor: 'transparent',
                    width: '100%',
                }}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header />
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
                                    keyboardType={'default'}
                                    onChangeText={(text) => setDetail({ ...detail, card_number: text })}
                                    value={detail?.card_number}
                                    onBlur={() => { }}
                                />

                                <View style={styles.row}>
                                    <View style={[styles.dateBox]}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => {
                                                setOpen(!open);
                                            }}>
                                            <Text
                                                style={[styles.datePickerStyle,]}>
                                                {detail?.expiry_date?.format('DD-MM-YYYY')}
                                            </Text>
                                        </TouchableOpacity>
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
                                            maximumDate={moment().toDate()}
                                            // minimumDate={moment()?.toDate()}
                                            onCancel={() => {
                                                setOpen(false);
                                            }}
                                        />
                                        <EvilIcons name='calendar' color={COLOR.white} size={hp(2.5)} />
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
                    <BackAerrow />
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