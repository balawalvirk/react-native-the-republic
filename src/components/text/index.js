import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { appStyles, colors, fontFamily, sizes, appIcons } from '../../services';
import { ComponentWrapper, RowWrapperBasic, Wrapper, RowWrapper } from '../wrappers';
import { Spacer } from '../spacers';
import { LineHorizontal } from '../lines';
import { width, height, totalSize } from 'react-native-dimension';
import { CustomIcon } from '../icons';

// Title Texts
export const XXLTitle = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.xxlTitleStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const XLTitle = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.xlTitleStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const LargeTitle = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.largeTitleStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const MediumTitle = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.mediumTitleStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const SmallTitle = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.smallTitleStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const TinyTitle = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.tinyTitleStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
// Normal Texts
export const LargeText = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.largeTextStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const MediumText = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.mediumTextStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const RegularText = ({ style, onPress, children, numberOfLines }) => {
    return (
        <Text
            numberOfLines={numberOfLines}
            style={[styles.regularTextStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const SmallText = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.smallTextStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const TinyText = ({ style, onPress, children }) => {
    return (
        <Text
            style={[styles.tinyTextStyle, style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
}
export const InputTitle = ({ style, children }) => {
    return (
        <Text
            style={[styles.inputTitleStyle, style]}
        >
            {children}
        </Text>
    );
}

export const ButtonTextRegular = ({ style, children }) => {
    return (
        <Text
            style={[styles.ButtonTextRegularStyle, style]}
        >
            {children}
        </Text>
    );
}
export const ButtonTextMedium = ({ style, children }) => {
    return (
        <Text
            style={[styles.ButtonTextMediumStyle, style]}
        >
            {children}
        </Text>
    );
}

export const TitleInfoPrimary = ({ title, info, grayBg, bgColor }) => {
    return (
        <ComponentWrapper style={{ paddingVertical: sizes.smallMargin, backgroundColor: bgColor ? bgColor : grayBg ? colors.appBgColor2 : 'transparent' }}>
            <RowWrapper style={{ marginHorizontal: sizes.marginHorizontalSmall }}>
                <Wrapper flex={1}>
                    <RegularText style={[appStyles.fontBold]}>{title}</RegularText>
                </Wrapper>
                <Wrapper flex={2}>
                    <RegularText>{info}</RegularText>
                </Wrapper>
            </RowWrapper>
        </ComponentWrapper>
    )
}





const styles = StyleSheet.create({
    xxlTitleStyle: {
        ...appStyles.h1
    },
    xlTitleStyle: {
        ...appStyles.h2
    },
    largeTitleStyle: {
        ...appStyles.h3
    },
    mediumTitleStyle: {
        ...appStyles.h4
    },
    smallTitleStyle: {
        ...appStyles.h5
    },
    tinyTitleStyle: {
        ...appStyles.h6,
        fontFamily: fontFamily.appTextBold
    },
    largeTextStyle: {
        ...appStyles.textLarge
    },
    mediumTextStyle: {
        ...appStyles.textMedium
    },
    regularTextStyle: {
        ...appStyles.textRegular
    },
    smallTextStyle: {
        ...appStyles.textSmall
    },
    tinyTextStyle: {
        ...appStyles.textTiny
    },
    inputTitleStyle: {
        ...appStyles.textSmalls,
        //color: colors.appColor1
    },
    ButtonTextRegularStyle: {
        ...appStyles.ButtonTextRegular,
        //color: colors.appColor1
    },
    ButtonTextMediumStyle: {
        ...appStyles.ButtonTextMedium,
        //color: colors.appColor1
    },

});

