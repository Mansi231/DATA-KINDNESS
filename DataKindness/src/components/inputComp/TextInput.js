import { StyleSheet, View, TextInput, Image, Animated, Text, Platform } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../pixel/index';
import { useEffect, useRef, useState } from 'react';
import { COLOR } from '../../utils/color';
import { FONTS } from '../../utils/fontFamily';

const TextInputCommon = ({
    value,
    onChangeText,
    placeholder,
    onFocus,
    onBlur,
    placeholderTextColor,
    keyboardType,
    borderColor,
    icon,
    source,
    style,
    autoCapitalize, textContentType,
    editable, require, multiline, numberOfLines, placeholderContainerStyle,maxLength
}) => {

    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => { startFloating(); setIsFocused(true) };

    const handleBlur = () => {

        setIsFocused(false)
    };


    return (

        <TextInput style={[styles?.phoneNumber, styles?.numberText, { textAlign: "left" }, style]}
            editable={true}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus ? onFocus : () => { }}
            onBlur={() => { }}
            keyboardType={keyboardType}
            // keyboardType={'number-pad'}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical='center'
            placeholder={placeholder}
            maxLength={maxLength}
            placeholderTextColor={COLOR.white}
        />
    );
};

export default TextInputCommon;

const styles = StyleSheet.create({
    phoneNumber: {
        height: hp(6.2),
        borderRadius: hp(.2),
        flexGrow: 1,
        textAlign: 'left',
        backgroundColor: COLOR.black30
    },
    numberText: {
        fontSize: hp(1.7),
        color: COLOR.white,
        paddingHorizontal: wp(2.6),
        paddingVertical: hp(1.1),
        letterSpacing: 1,
        fontFamily: FONTS.NunitoMedium, textAlignVertical: 'center'
    },

    container: {
        position: 'relative',
    },
});


