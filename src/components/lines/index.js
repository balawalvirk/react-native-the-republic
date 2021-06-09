import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors } from '../../services';

export const LineHorizontal = ({style ,height}) => {
    return (
        <View style={[{height:height?height:0.5,backgroundColor:colors.appTextColor5},style]}/>
    );
}