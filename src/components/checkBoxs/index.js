import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles } from '../../services';
import { IconWithText } from '../icons';

export const CheckBoxPrimary = ({ textStyle, containerStyle, text, checked, onPress, checkedIconName, uncheckedIconName, iconType, iconSize, checkIconColor, uncheckIconColor }) => {
    const defaultCheckedIconName = checkedIconName ? checkedIconName : 'check-circle'
    const defaultUncheckedIconName = uncheckedIconName ? uncheckedIconName : 'check-circle'
    const checkboxIconType = iconType ? iconType : 'material-community'
    const checkboxappIconsize = iconSize ? iconSize : sizes.icons.medium
    const defaultCheckIconColor = checkIconColor ? checkIconColor : colors.appColor1
    const defaultUncheckIconColor = uncheckIconColor ? uncheckIconColor : colors.appBgColor4
    return (
        <IconWithText
            text={text}
            iconName={checked ? defaultCheckedIconName : defaultUncheckedIconName}
            iconType={checkboxIconType}
            iconSize={checkboxappIconsize}
            tintColor={checked ? defaultCheckIconColor : defaultUncheckIconColor}
            onPress={onPress}
            textStyle={[styles.checkboxText, textStyle]}
            containerStyle={containerStyle}
        />
    );
}

const styles = StyleSheet.create({
    checkboxText: {
        ...appStyles.textRegular,
        // ...appStyles.textGray
    }
})
