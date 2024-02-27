import { StyleSheet, Text, View, ImageBackground, StatusBar, SafeAreaView, KeyboardAvoidingView, ScrollView ,Platform} from 'react-native'
import React from 'react'
import blurBg from '../../assets/bg.png'
import { hasNotch } from 'react-native-device-info';
import Header from '../../components/common/Header';
import { FONTS } from '../../utils/fontFamily';
import { COLOR } from '../../utils/color';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PaymentScreen from './PaymentScreen';

const OrderSummary = () => {
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
                    <Text style={styles.queText}>Order Summary</Text>
                    <KeyboardAvoidingView
                        style={{ flex: 1, flexGrow: 1, width: '100%' }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // adjust this value based on your UI
                    >
                        <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: hp(3) }}>

                            <View style={styles.textBox}>
                                <Text style={styles.cardRowText}>Hi Mansi,</Text>
                                <Text style={styles.cardRowText}>Your order has been confirmed.</Text>
                            </View>

                            <View style={styles.card}>
                                <View style={[styles.cardRow]}>
                                    <FontAwesome name='users' size={hp(2)} color={COLOR.white}/>
                                    <Text style={styles.cardRowText}>2000 Leads</Text>
                                    <Text style={styles.cardRowText}>$200</Text>
                                </View>
                                <View style={[styles.cardRow, { borderTopColor: COLOR.white, borderTopWidth: hp(.1), paddingTop: hp(1.3) }]}>
                                    <Text style={styles.cardRowText}>BussinessCategory</Text>
                                    <Text style={styles.cardRowText}>Solar</Text>
                                </View>
                                <View style={styles.cardRow}>
                                    <Text style={styles.cardRowText}>TransactionID</Text>
                                    <Text style={styles.cardRowText}>B120345</Text>
                                </View>
                                <View style={styles.cardRow}>
                                    <Text style={styles.cardRowText}>OrderDate</Text>
                                    <Text style={styles.cardRowText}>2/2/2024</Text>
                                </View>
                                <View style={styles.cardRow}>
                                    <Text style={styles.cardRowText}>BillingAddress</Text>
                                    <Text style={styles.cardRowText}>Phonix AZ 85024,USA</Text>
                                </View>
                                <View style={styles.cardRow}>
                                    <Text style={styles.cardRowText}>Total</Text>
                                    <Text style={styles.cardRowText}>$200</Text>
                                </View>

                            </View>


                            <MaterialCommunityIcons name='web' size={hp(4)} color={COLOR.white} style={{alignSelf:'center',marginTop:hp(4.5)}}/>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    {/* <PaymentScreen/> */}
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default OrderSummary

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: hp(3),
        backgroundColor: 'transparent',
        paddingHorizontal: wp(5), gap: hp(2)
    },
    queText: { color: COLOR.white, fontSize: hp(1.8), letterSpacing: wp(.2), fontFamily: FONTS.NunitoMedium },
    textBox: { flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' },

    card: { flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.black30, paddingVertical: hp(2), paddingHorizontal: wp(3), marginTop: hp(2), gap: hp(2) },

    cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },

    cardRowText: { color: COLOR.white, letterSpacing: wp(.2), fontSize: hp(1.5), fontFamily: FONTS.NunitoRegular },
})