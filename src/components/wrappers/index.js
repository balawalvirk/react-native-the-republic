import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../services';
import * as Animatable from 'react-native-animatable'

export const MainWrapper = ({ children, style, animation }) => {
    return (
        <Animatable.View animation={animation} style={[appStyles.mainContainer, style]}>
            {children}
        </Animatable.View>
    );
}
export const MainWrapperPrimary = ({ children, style, animation }) => {
    return (
        <Animatable.View animation={animation} style={[styles.mainWrapperPrimary, style]}>
            {children}
        </Animatable.View>
    );
}
export const ImageBackgroundWrapper = ({ children, style, source }) => {
    return (
        <ImageBackground source={source} style={[appStyles.bgContainer, style]}>
            {children}
        </ImageBackground>
    );
}
export const MaterialBackgroundWrapper = ({ children, style, source }) => {
    return (
        <ImageBackgroundWrapper source={source} >
            <MainWrapper style={[{ backgroundColor: colors.appColor1Transparent }, style]}>
                {children}
            </MainWrapper>
        </ImageBackgroundWrapper>
    );
}


export const MainWrapperMatrial = ({ children, style, animation, primaryColor, secondryColor, flex }) => {
    const defaultWrapperRadius = sizes.wrapperRadius
    return (
        <Animatable.View animation={animation} style={[appStyles.mainContainer, { flex: flex ? flex : 1, backgroundColor: primaryColor ? primaryColor : colors.appColor1 }, style]}>
            <View style={[appStyles.mainContainer, { backgroundColor: secondryColor ? secondryColor : colors.appBgColor1, borderBottomLeftRadius: defaultWrapperRadius, borderBottomRightRadius: defaultWrapperRadius },]}>
                {children}
            </View>
        </Animatable.View>
    );
}
export const Wrapper = ({ children, style, animation, flex, duration, iterationCount, direction }) => {
    return (
        <Animatable.View
            iterationCount={iterationCount}
            direction={direction}
            animation={animation}
            duration={duration} style={[{ flex: flex }, style]}>
            {children}
        </Animatable.View>
    );
}
export const ComponentWrapper = ({ children, style, animation,horizontal }) => {
    return (
        <Animatable.View animation={animation} style={[appStyles.compContainer, styles.removerMarginVertical,{marginHorizontal:horizontal?horizontal:sizes.marginHorizontal}, style]}>
            {children}
        </Animatable.View>
    );
}

export const RowWrapper = ({ children, style, animation,horizontal }) => {
    return (
        <Animatable.View animation={animation} style={[appStyles.rowCompContainer, styles.removerMarginVertical, {marginHorizontal:horizontal?horizontal:sizes.marginHorizontal},style]}>
            {children}
        </Animatable.View>
    );
}
export const RowWrapperBasic = ({ children, style, animation }) => {
    return (
        <Animatable.View animation={animation} style={[appStyles.rowView, style]}>
            {children}
        </Animatable.View>
    );
}
export const CardWrapper = ({ children, style, animation }) => {
    return (
        <Animatable.View animation={animation} style={[appStyles.cardView, { borderRadius: sizes.cardRadius }, style]}>
            {children}
        </Animatable.View>
    );
}
export const AbsoluteWrapper = ({ children, style, animation,duration }) => {
    return (
        <Animatable.View animation={animation} duration={duration} style={[{ position: 'absolute', }, style]}>
            {children}
        </Animatable.View>
    );
}
export const FooterWrapperPrimary = ({ children, style, animation }) => {
    return (
        <Animatable.View animation={animation ? animation : 'fadeInUpBig'} style={[styles.footerWrapperPrimary, style]}>
            {children}
        </Animatable.View>
    );
}
export const HeaderWrapperPrimary = ({ children, style, animation }) => {
    return (
        <Animatable.View animation={animation ? animation : 'fadeInDown'} style={[styles.headerWrapperPrimary, style]}>
            {children}
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    mainWrapperPrimary: {
        ...appStyles.mainContainer,
        backgroundColor: colors.appBgColor4
    },
    removerMarginVertical: {
        marginVertical: null
    },
    footerWrapperPrimary: {
        ...appStyles.mainContainer,
        borderTopLeftRadius: sizes.wrapperRadius,
        borderTopRightRadius: sizes.wrapperRadius
    },
    headerWrapperPrimary: {
        // ...appStyles.mainContainer,
        // borderTopLeftRadius:sizes.wrapperRadius,
        // borderTopRightRadius:sizes.wrapperRadius
    }
})