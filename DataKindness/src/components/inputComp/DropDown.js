import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from
    '../../../pixel';
import Collapsible from 'react-native-collapsible';
import { COLOR } from '../../utils/color';
import { FONTS } from '../../utils/fontFamily';
import Feather from 'react-native-vector-icons/Feather'

const Dropdown = ({ options, onSelect, value, style, current, showDropdown, setShowDropdown }) => {

    const handleSelect = (option) => {
        setShowDropdown(false);
        onSelect(option);
    };

    return (

        <View style={[styles.container, style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={styles.optionTextBox}>
                    <Text style={{ color: COLOR.white, letterSpacing: wp(.3), fontSize: hp(1.7), fontFamily: FONTS.NunitoMedium }}>{value}</Text>
                </View>
                <TouchableOpacity onPress={() => { showDropdown === current ? setShowDropdown(false) : setShowDropdown(current) }} style={styles.downArrowBtn}>
                    <Feather name='chevron-down' size={hp(2.8)} color={COLOR.black} />
                </TouchableOpacity>
            </View>

            <Collapsible collapsed={!(showDropdown === current)}>
                <View style={styles.optionBox}>
                    <ScrollView
                        style={styles.dropdownScrollView}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps='handled'
                    >
                        {
                            options.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => handleSelect(item)} style={[styles.option,]}>
                                    <Text style={styles.optionText}>{item.label} {current == 'selectedCategory' ? null : 'Leads'}</Text>
                                    {current == 'selectedLead' && <Text style={styles.optionText}>{item?.label} $</Text>}
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative', width: '40%'
    },
    header: {
        padding: hp(1.7),
        borderRadius: hp(.2),
        borderWidth: hp(.17),
        borderColor: COLOR.borderGrey,
        height: hp(6.4)
    },
    optionTextBox: { backgroundColor: COLOR.black30, paddingHorizontal: wp(3), height: hp(6.2), flexGrow: 1, justifyContent: 'center' },
    downArrowBtn: { backgroundColor: COLOR.white, width:wp(13), height: hp(6.2), justifyContent: 'center' ,alignItems:'center'},
    dropdownContainer: {
        maxHeight: hp(20), // Set the maximum height for the dropdown container
        borderColor: COLOR.borderGrey,
        borderRadius: hp(.2),
        borderWidth: hp(.17),
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: COLOR.white,

    },
    optionBox: {
        height: hp(20), borderTopWidth: 0,
        // borderWidth: wp(.1),
        //  borderColor: COLOR.white ,
        // backgroundColor: COLOR.black30,
    },
    option: {
        padding: hp(1.5),
        // borderColor: COLOR.white,
        // borderWidth: hp(.1),
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(.2),
        backgroundColor: COLOR.black30,
    },
    headerText: {
        fontSize: hp(1.68),
        color: COLOR.primaryBlue,
        letterSpacing: 1,
        fontFamily: FONTS.NunitoMedium, textAlignVertical: 'center'
    },
    optionText: {
        color: COLOR.white,
        fontSize: hp(1.9),
        letterSpacing: wp(.2),
        fontFamily: FONTS.NunitoRegular
    },
});


export default Dropdown;