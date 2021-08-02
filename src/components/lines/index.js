import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors } from '../../services';

export const LineHorizontal = ({ style, height, color ,width}) => {
    return (
        <View style={[{ height: height ? height : 1, backgroundColor: color ? color : colors.appBgColor3,width:width }, style]} />
    );
}
export const LineVertical = ({ style, width, color }) => {
    return (
        <View style={[{ width: width ? width : 1, backgroundColor: color ? color : colors.appBgColor3 }, style]} />
    );
}