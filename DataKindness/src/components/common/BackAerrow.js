import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { COLOR } from '../../utils/color'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'

const BackAerrow = () => {
    return (
        <Feather name='arrow-left' size={hp(4)} color={COLOR.white} style={{ alignSelf: "flex-start" }} />
    )
}

export default BackAerrow

const styles = StyleSheet.create({})