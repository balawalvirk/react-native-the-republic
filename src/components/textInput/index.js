import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, fontFamily, sizes, fontSize } from '../../services';
import { AbsoluteWrapper, ComponentWrapper, Wrapper } from '../wrappers';
import { InputTitle, MediumText, RegularText, SmallText } from '../text';
import { CustomIcon, IconButton, IconWithText } from '../icons';
import { Spacer } from '../spacers';
import { Platform } from 'react-native';
import { Animated } from 'react-native';
import { ImageRound } from '../images';
const TextInputColored = ({
    iconNameRight, inputRef, iconTypeRight, returnKeyLabel,
    returnKeyType, onSubmitEditing, onPress,
    maxLength, autoFocus, title, isButton,
    duration, titleStyle, placeholder, editable,
    animation, multiline, onFocus, onBlur,
    onChangeText, secureTextEntry, value,
    iconColorRight, iconSizeRight, containerStyle,
    inputContainerStyle, onPressIconRight, inputStyle,
    right, keyboardType, iconStyleRight, error,
    left, customIconLeft, iconNameLeft, iconTypeLeft, iconSizeLeft,
    iconColorLeft, iconStyleLeft, onPressIconLeft
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            disabled={!onPress}
            style={[{ marginHorizontal: sizes.marginHorizontal }, containerStyle]}>
            {
                title ?
                    <ComponentWrapper style={{ marginHorizontal: 0 }}>
                        <InputTitle style={[{}, titleStyle]}>{title}</InputTitle>
                        <Spacer height={sizes.TinyMargin} />
                    </ComponentWrapper>
                    :
                    null
            }
            <Wrapper style={[appStyles.inputContainerColored, {
                borderRadius: sizes.inputRadius,
                backgroundColor: colors.appBgColor3,
                marginHorizontal: 0
            }, inputContainerStyle]}>
                {
                    left ?
                        left
                        :
                        customIconLeft ?
                            <View style={{ alignItems: 'center', marginLeft: sizes.marginHorizontal }}>
                                <CustomIcon icon={customIconLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor1} containerStyle={iconStyleLeft} />
                            </View>
                            :
                            iconNameLeft ?
                                <View style={{ alignItems: 'center', marginLeft: sizes.marginHorizontal }}>
                                    <Icon name={iconNameLeft} type={iconTypeLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor4} iconStyle={iconStyleLeft} onPress={onPressIconLeft} />
                                </View>
                                :
                                null
                }
                <View style={{ flex: 1 }}>
                    {
                        onPress ?
                            <ComponentWrapper style={{ height: height(7), justifyContent: 'center', }}>
                                <RegularText style={value ? null : appStyles.textGray}>{value ? value : placeholder}</RegularText>
                            </ComponentWrapper>
                            :
                            <TextInput
                                ref={inputRef}
                                onChangeText={onChangeText}
                                value={value}
                                placeholder={placeholder}
                                editable={editable}
                                autoFocus={autoFocus}
                                returnKeyLabel={returnKeyLabel}
                                returnKeyType={returnKeyType}
                                onSubmitEditing={onSubmitEditing}
                                multiline={multiline}
                                placeholderTextColor={'#21212180'}
                                keyboardType={keyboardType}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                secureTextEntry={secureTextEntry}
                                maxLength={maxLength}
                                style={[appStyles.inputField, { width: null, height: height(7), paddingHorizontal: sizes.marginHorizontal }, inputStyle]}
                            />
                    }
                </View>
                <View style={{}}>
                    {
                        right ?
                            right
                            :
                            iconNameRight ?
                                <View style={{ alignItems: 'center', marginRight: sizes.marginHorizontal }}>
                                    <Icon name={iconNameRight} type={iconTypeRight} size={iconSizeRight ? iconSizeRight : sizes.icons.medium} color={iconColorRight ? iconColorRight : colors.appTextColor5} iconStyle={iconStyleRight} onPress={onPressIconRight} />
                                </View>
                                :
                                null
                    }
                </View>
            </Wrapper>
            {
                error ?
                    <Wrapper animation="shake">
                        <Spacer height={sizes.TinyMargin} />
                        <SmallText style={[{ color: colors.error, textAlign: 'right' }]}>{error}</SmallText>
                    </Wrapper>
                    :
                    null
            }
        </TouchableOpacity>
    );
}
const TextInputBordered = ({ iconName, iconType, placeholder, placeholderTextColor, onFocus, onChangeText, secureTextEntry, value, containerStyle, inputStyle }) => {
    return (
        <View style={[appStyles.inputContainerBorderd, {
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.appColor1
        }, containerStyle]}>
            <View style={{ flex: 2, alignItems: 'center' }}>
                <Icon name={iconName} type={iconType} size={totalSize(2.5)} color={colors.appColor1} iconStyle={{}} />
            </View>
            <View style={{ flex: 8 }}>
                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    style={[appStyles.inputField, { width: null, height: height(6) }, inputStyle]}
                />
            </View>
        </View>
    );
}
const TextInputUnderlined = ({
    onPress, inputRef, autoFocus, left, keyboardType, right, error,
    editable, titleStyle, title, maxLength, customIconLeft,
    iconNameLeft, multiline, iconNameRight, placeholderTextColor,
    iconTypeLeft, iconTypeRight, iconSizeLeft, iconSizeRight,
    iconColorLeft, iconColorRight, iconStyleLeft, iconStyleRight,
    onPressIconLeft, onPressIconRight, placeholder, onFocus, onBlur,
    onChangeText, secureTextEntry, value, containerStyle, inputContainerStyle,
    inputStyle, titleStatic, autoCapitalize }) => {
    const [titleMarginBottom] = useState(new Animated.Value(0))
    //const [titleSize] = useState(new Animated.Value(fontSize.regular))
    const FocusedTitleMarginBottom = Platform.OS === 'ios' ? height(5) : height(5)
    //const [titleMarginBottom, setTitleMarginBottom] = useState(0)
    //const [titleSize, setTitleSize] = useState(fontSize.input)
    const moveTitleUp = () => {
        Animated.timing(titleMarginBottom, {
            toValue: height(5),
            duration: 250,
            speed: 50,
            useNativeDriver: false
        }).start();
        // Animated.spring(titleSize, {
        //     toValue: fontSize.small,
        //     duration: 250,
        //    // useNativeDriver: true
        // }).start();
    };
    const moveTitleDown = () => {
        Animated.timing(titleMarginBottom, {
            toValue: 0,
            duration: 250,
            speed: 50,
            useNativeDriver: false
        }).start();
        // Animated.spring(titleSize, {
        //     toValue: fontSize.regular,
        //     duration: 250,
        //   //  useNativeDriver: true
        // }).start();
    };
    const onFocusInput = () => {
        moveTitleUp()
    }
    const onBlurInput = () => {
        moveTitleDown()
    }
    return (
        <TouchableOpacity disabled={!onPress} activeOpacity={1} onPress={onPress}>
            <Wrapper style={[{ marginHorizontal: sizes.marginHorizontalLarge }, containerStyle]}>
                {
                    titleStatic ?
                        <>
                            {/* <ComponentWrapper style={{marginHorizontal:sizes.marginHorizontalLarge}}>
                                <InputTitle>{titleStatic}</InputTitle>
                            </ComponentWrapper> */}
                            <InputTitle>{titleStatic}</InputTitle>
                        </>

                        :
                        null
                }
                <View style={[appStyles.inputContainerUnderLined, {
                    //borderRadius: sizes.b,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.appBgColor4,
                    marginHorizontal: 0
                }]}>
                    {
                        left ?
                            left
                            :
                            customIconLeft ?
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <CustomIcon icon={customIconLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor1} containerStyle={iconStyleLeft} />
                                </View>
                                :
                                iconNameLeft ?
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Icon name={iconNameLeft} type={iconTypeLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor1} iconStyle={iconStyleLeft} onPress={onPressIconLeft} />
                                    </View>
                                    :
                                    null
                    }
                    <View style={[{ flex: 7, justifyContent: 'center' }, inputContainerStyle]}>
                        <AbsoluteWrapper style={{ top: 0, bottom: 0, ...appStyles.center, backgroundColor: 'transparent', }}>
                            <Wrapper style={{ marginBottom: value ? FocusedTitleMarginBottom : titleMarginBottom }}>
                                <InputTitle style={titleStyle}>{title}</InputTitle>
                            </Wrapper>
                        </AbsoluteWrapper>
                        {
                            onPress ?
                                <Wrapper style={{ height: height(8), justifyContent: 'center' }}>
                                    {
                                        value ?
                                            <Wrapper>
                                                <Spacer height={title ? Platform.OS === 'ios' ? height(1.5) : height(2.5) : 0} />
                                                <MediumText numberOfLines={1}>{value}</MediumText>
                                            </Wrapper>
                                            :
                                            null
                                    }
                                </Wrapper>
                                :
                                <TextInput
                                    ref={inputRef}
                                    onChangeText={onChangeText}
                                    value={value}
                                    keyboardType={keyboardType}
                                    placeholder={placeholder}
                                    autoFocus={autoFocus}
                                    autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
                                    onFocus={() => {
                                        onFocusInput();
                                        onFocus ? onFocus() : null
                                    }}
                                    onBlur={() => {
                                        onBlurInput(),
                                            onBlur ? onBlur() : null
                                    }}
                                    editable={editable}
                                    underlineColorAndroid="transparent"
                                    maxLength={maxLength}
                                    multiline={multiline}
                                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : colors.appTextColor4}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputField, { width: null, height: height(8), paddingTop: title ? Platform.OS === 'ios' ? height(1.5) : height(2.5) : null, fontFamily: fontFamily.appTextRegular, paddingHorizontal: 0 }, inputStyle]}
                                />
                        }
                    </View>

                    {
                        right ?
                            right
                            :
                            iconNameRight ?
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Icon name={iconNameRight} type={iconTypeRight} size={iconSizeRight ? iconSizeRight : sizes.icons.medium} color={iconColorRight ? iconColorRight : colors.appBgColor3} iconStyle={iconStyleRight} onPress={onPressIconRight} />
                                </View>
                                :
                                null
                    }
                </View>
                {
                    error ?
                        <Wrapper style={{}} animation="shake">
                            <Spacer height={sizes.TinyMargin} />
                            <IconWithText
                                iconName="alert-circle-outline"
                                //title="New"
                                text={error}

                                tintColor={colors.error}
                                iconSize={sizes.icons.tiny}
                                textStyle={[{ fontSize: fontSize.small }]}
                            />
                        </Wrapper>
                        :
                        null
                }
            </Wrapper>
        </TouchableOpacity>
    );
}

export const SearchTextinput = ({ value, placeholder, inputContainerStyle, onChangeText, right, onPressCross }) => {
    return (
        <TextInputColored
            value={value}
            onChangeText={onChangeText}
            iconNameLeft="search"
            iconTypeLeft="feather"
            placeholder={placeholder ? placeholder : "Search"}
            inputContainerStyle={inputContainerStyle}
            iconNameRight={value && onPressCross && 'close-circle'}
            iconTypeRight="ionicon"
            onPressIconRight={onPressCross}
            right={right}
            inputStyle={{ height: height(6) }}
        />
    )
}
export const TextInputChat = props => {
    const { onChangeText, onSend, value, onAdd, image } = props;
    return (
        <TextInputColored
            placeholder="Write a message"
            multiline
            left={
                <Wrapper style={{}}>
                    {
                        image ?
                            <AbsoluteWrapper style={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <ImageRound
                                    source={{ uri: image.uri }}
                                    size={totalSize(4)}
                                />
                            </AbsoluteWrapper>
                            :
                            null
                    }
                    <IconButton
                        iconName="add"
                        iconType="ionicon"
                        iconColor={!image ? colors.appTextColor4 : colors.appBgColor1}
                        buttonColor={!image ? colors.appBgColor3 : (colors.appBgColor6 + '40')}
                        buttonSize={totalSize(4)}
                        iconSize={totalSize(3)}
                        onPress={onAdd}
                    />

                </Wrapper>
            }
            iconNameRight="send-sharp"
            iconTypeRight="ionicon"
            iconColorRight={(value || image) ? colors.appColor1 : colors.appTextColor5}
            inputStyle={{
                height: null,
                backgroundColor: 'transparent',
                paddingVertical: Platform.OS === 'ios' ? height(1) : null,
            }}
            inputContainerStyle={[
                { marginLeft: sizes.marginHorizontal, alignItems: 'flex-end', marginVertical: height(2), backgroundColor: 'transparent' },
            ]}
            iconStyleRight={{ marginVertical: height(1), marginLeft: sizes.marginHorizontalSmall, transform: [{ rotate: '-45deg' }] }}
            containerStyle={{ borderTopWidth: 1, borderColor: colors.appBgColor3, backgroundColor: 'transparent', marginHorizontal: 0, backgroundColor: colors.appBgColor1 }}
            value={value}
            onChangeText={onChangeText}
            onPressIconRight={onSend}
        />
    );
};
export { TextInputColored, TextInputBordered, TextInputUnderlined }