import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView ,Platform} from 'react-native'
import React, { useState } from 'react'
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

const UserDetail = () => {

    const [detail, setDetail] = useState({ name: '', email: '', number: '', category: {}, website: '' })
    const [showDropdown, setShowDropdown] = useState(false);

    let options = [
        { amount: 200, price: 10, label: 200 },
        { amount: 200, price: 10, label: 200 },
        { amount: 200, price: 10, label: 200 },
        { amount: 200, price: 10, label: 200 },
    ]

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
                                    showDropdown={showDropdown} setShowDropdown={setShowDropdown} current={'selectedCategory'} style={{ width: 'auto' }} options={options} onSelect={(item) => {
                                        setDetail({ ...detail, category: item })
                                    }} value={detail?.category?.label || 'Select'}
                                />
                                <Button text={'Submit'} style={{ marginTop: hp(3) }} />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <BackAerrow />

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
    queText: { color: COLOR.white, fontSize: hp(1.8), letterSpacing: wp(.2), fontFamily: FONTS.NunitoMedium, marginVertical: hp(2.5) ,textAlign:'center'},
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