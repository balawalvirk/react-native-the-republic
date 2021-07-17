import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors } from '../../services';

export const LineHorizontal = ({style ,height,color}) => {
    return (
        <View style={[{height:height?height:1,backgroundColor:color?color:colors.appBgColor4},style]}/>
    );
}
export const LineVertical = ({style ,width,color}) => {
    return (
        <View style={[{width:width?width:1,backgroundColor:color?color:colors.appBgColor4},style]}/>
    );
}