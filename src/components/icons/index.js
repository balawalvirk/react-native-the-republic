import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../services';
import * as Animatable from 'react-native-animatable';
import { SmallText,RegularText } from '../text';
import { AbsoluteWrapper, Wrapper } from '../wrappers';
import { BadgePrimary } from '../badges';
export const BackIcon = ({ style, onPress, size }) => {
    return (
        <Icon
            name="chevron-back"
            type="ionicon"
            size={size ? size : totalSize(3)}
            //raised
            //reverse
            //reverseColor={colors.appTextColor6}
            color={colors.appTextColor1}
            iconStyle={style}
            onPress={onPress}
        />
    );
}
export const BackIconAbsolute = ({ onPress, containerStyle }) => {
    return (
        <IconButton
            buttonStyle={[{ position: 'absolute', top: sizes.smallMargin + sizes.statusBarHeight, left: sizes.marginHorizontal }, containerStyle]}
            shadow
            iconName="chevron-left"
            iconType="feather"
            iconSize={totalSize(4)}
            iconColor={colors.appTextColor1}
            onPress={onPress}
        />
    )
}
export const IconButton = ({ buttonStyle, onPress, shadow, text, textStyle, shadowColored, iconSize, iconColor, iconName, iconType, buttonColor, buttonSize, customIcon, iconStyle, disabled }) => {
    const defaultButtonsize = totalSize(5)
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            disabled={!onPress || disabled}
            style={
                [styles.IconButtonContainer,
                {
                    height: buttonSize ? buttonSize : defaultButtonsize,
                    width: buttonSize ? buttonSize : defaultButtonsize,
                    backgroundColor: buttonColor ? buttonColor : colors.appBgColor1
                },
                shadow ? appStyles.shadow : null,
                shadowColored ? appStyles.shadowColored : null,
                    buttonStyle]
            }
        >
            {
                text ?
                    <RegularText style={[{ color: colors.appColor1 }, textStyle]}>{text}</RegularText>
                    :
                    customIcon ?
                        <CustomIcon icon={customIcon} size={iconSize ? iconSize : totalSize(2)} color={iconColor} containerStyle={iconStyle} />
                        :
                        iconName ?
                            <Icon
                                name={iconName ? iconName : "heart"}
                                type={iconType ? iconType : "material-community"}
                                size={iconSize ? iconSize : sizes.icons.large}
                                color={iconColor ? iconColor : colors.appColor1}
                                iconStyl={iconStyle}
                            />
                            :
                            null
            }
        </TouchableOpacity>
    );
}
export const CustomIcon = ({ icon, size, animation, duration, color, iterationCount, onPress, value, containerStyle }) => {
    const defaulSize = totalSize(5)
    return (
        <Animatable.View animation={animation} duration={duration} iterationCount={iterationCount}>
            <TouchableOpacity activeOpacity={1} disabled={!onPress} onPress={onPress} style={containerStyle}>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{ height: size ? size : defaulSize, width: size ? size : defaulSize, tintColor: color }}
                />
                {
                value ?
                    <AbsoluteWrapper style={{ right: -7.5, top: -7.5 }}>
                        <BadgePrimary
                            value={value}
                            //status="error"
                        />
                    </AbsoluteWrapper> : null

            }
            </TouchableOpacity>
            

        </Animatable.View>
    );
}
export const TouchableCustomIcon = ({ icon, size, animation, duration, color, onPress }) => {
    const defaulSize = totalSize(5)
    return (
        <TouchableOpacity onPress={onPress}>
            <CustomIcon
                icon={icon}
                size={size}
                animation={animation}
                duration={duration}
                color={color}
            />
        </TouchableOpacity>
    );
}

export const IconWithText = ({ text, disabled, containerStyle, title, customIcon, onPress, tintColor, iconName, iconType, iconSize, textStyle, titleStyle, direction, iconStyle, textContainerStyle, icon }) => {
    return (
        <TouchableOpacity disabled={disabled || !onPress} activeOpacity={1} onPress={onPress} style={[{ flexDirection: direction ? direction : 'row', alignItems: 'center', }, containerStyle]}>
            {
                icon ? icon :
                    customIcon ?
                        <CustomIcon icon={customIcon} size={iconSize ? iconSize : totalSize(2)} color={tintColor ? tintColor : colors.appColor1} />
                        :
                        <Icon name={iconName ? iconName : 'email'} type={iconType ? iconType : 'material-community'} size={iconSize ? iconSize : totalSize(2)} color={tintColor ? tintColor : colors.appTextColor1} iconStyle={iconStyle} />
            }
            <View style={[direction === 'column' ? { marginVertical: height(1.5) } : { marginHorizontal: width(2) }, textContainerStyle]}>
                {
                    title ?
                        <Text style={[appStyles.textRegular, { color: tintColor ? tintColor : colors.appTextColor1, fontFamily: FontFamily.appTextBold, marginBottom: 5 }, titleStyle]}>{title}</Text>
                        :
                        null
                }
                <SmallText style={[{ color: tintColor ? tintColor : colors.appTextColor1, }, textStyle]}>{text}</SmallText>
            </View>
        </TouchableOpacity>
    );
}

export const IconHeart = ({ value, onPress, size, containerColor, containerSize, containerStyle, shadow, shadowColored }) => {
    return (
        <IconButton
            iconName={value ? 'heart' : 'hearto'}
            iconColor={value ? colors.error : colors.appTextColor1}
            iconType="antdesign"
            iconSize={size ? size : totalSize(2.5)}
            buttonSize={containerSize ? containerSize : totalSize(4)}
            onPress={onPress}
            buttonColor={containerColor ? containerColor : 'transparent'}
            buttonStyle={containerStyle}
            shadow={shadow}
            shadowColored={shadowColored}
        />
    )
}
export const CheckIconPrimary = props => {
    return (
        <Wrapper animation="zoomIn">
            <IconButton
                iconName="check"
                buttonSize={totalSize(3)}
                iconSize={totalSize(2)}
                buttonColor={colors.success}
                iconColor={colors.appTextColor6}
            />
        </Wrapper>
    )
}
export const CloseIconPrimary = props => {
    return (
        <Wrapper animation="bounceIn">
            <IconButton
                iconName="close"
                buttonSize={totalSize(3)}
                iconSize={totalSize(2)}
                buttonColor={colors.error}
                iconColor={colors.appTextColor6}
            />
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    IconButtonContainer: {
        height: totalSize(5),
        width: totalSize(5),
        backgroundColor: colors.appColor1,
        borderRadius: 100,
        ...appStyles.center,
        //  ...appStyles.shadow
    }
})