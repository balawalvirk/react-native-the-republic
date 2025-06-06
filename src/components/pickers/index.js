import React, { useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Platform, Animated } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, fontSize, fontFamily, sizes, appIcons, appStyles, HelpingMethods } from '../../services';
import RNPickerSelect from 'react-native-picker-select'
import { AbsoluteWrapper, Wrapper, ComponentWrapper, RowWrapper } from '../wrappers';
import { SmallText, InputTitle, MediumText, RegularText } from '../text';
import { CustomIcon, IconWithText } from '../icons';
import { Spacer } from '../spacers';
import { TextInputUnderlined } from '../textInput';
import { MaterialIndicator } from 'react-native-indicators';

export const PickerPrimary = ({
    onDonePress, containerStyle, data, title, onChange,
    placeholder, error, value, itemKey,
    left, customIconLeft, iconSizeLeft, iconColorLeft,
    iconStyleLeft, iconNameLeft, mainContainerStyle
}) => {
    const placeholderObject = {
        label: placeholder, value: 'placeholder', color: '#909090',
    }
    const [titleMarginBottom] = useState(new Animated.Value(value ? height(6) : 0))
    //const [titleSize] = useState(new Animated.Value(fontSize.regular))
    //const FocusedTitleMarginBottom = Platform.OS === 'ios' ? height(5) : height(5)
    //const [titleMarginBottom, setTitleMarginBottom] = useState(0)
    //const [titleSize, setTitleSize] = useState(fontSize.input)
    const moveTitleUp = () => {
        Animated.timing(titleMarginBottom, {
            toValue: height(6),
            duration: 250,
            speed: 50,
            useNativeDriver: false
        }).start();
    };
    const moveTitleDown = () => {
        Animated.timing(titleMarginBottom, {
            toValue: 0,
            duration: 250,
            speed: 50,
            useNativeDriver: false
        }).start();
    };
    const onChangeValue = (value) => {
        value === 'placeholder' ? moveTitleDown() : moveTitleUp()
    }
    return (
        <Wrapper
            style={[{ marginHorizontal: sizes.marginHorizontalLarge }, mainContainerStyle]}
        >
            {/* <ComponentWrapper>
                <InputTitle>{title}</InputTitle>
            </ComponentWrapper>
            <Spacer height={sizes.TinyMargin} /> */}
            <View style={[appStyles.inputContainerUnderLined, {
                //borderRadius: sizes.b,
                borderBottomWidth: 1,
                borderBottomColor: colors.appBgColor4,
                marginHorizontal: 0
            }, containerStyle]}>
                {
                    left ?
                        left
                        :
                        customIconLeft ?
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <CustomIcon icon={customIconLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor3} containerStyle={iconStyleLeft} />
                            </View>
                            :
                            iconNameLeft ?
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Icon name={iconNameLeft} type={iconTypeLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor1} iconStyle={iconStyleLeft} />
                                </View>
                                :
                                null
                }
                <Wrapper flex={8}>
                    <AbsoluteWrapper style={{ top: 0, bottom: 0, ...appStyles.center, backgroundColor: 'transparet', }}>
                        <Wrapper style={{ marginBottom: titleMarginBottom }}>
                            <InputTitle >{title}</InputTitle>
                        </Wrapper>
                    </AbsoluteWrapper>
                    <RNPickerSelect
                        onDonePress={onDonePress}
                        onValueChange={(value, index) => {
                            onChangeValue(value, index)
                            onChange ? onChange(value, index) : null;
                        }}
                        value={value}
                        itemKey={itemKey}
                        items={data}
                        placeholder={placeholderObject}
                        useNativeAndroidPickerStyle={false}
                        pickerProps={{ mode: 'dropdown' }}
                        //  pickerProps={{ mode: 'dropdown',overflow: 'hidden', style: { overflow: 'hidden' } }}
                        // pickerProps={{ style: { height: 214, overflow: 'hidden' } }}
                        style={{
                            width: width(100),
                            ...PickerPrimaryStyles,
                            iconContainer: {
                                top: height(3.5),
                                right: 0,
                            },
                        }}
                        Icon={() =>
                            <Icon name="caret-down-sharp" type="ionicon" size={totalSize(1.5)} color={colors.appTextColor3} />
                            // <CustomIcon
                            //     icon={appIcons.dropdown_normal}
                            //     size={totalSize(2)}
                            // />
                        }
                    />
                </Wrapper>
            </View>
            {
                error ?
                    // <AbsoluteWrapper animation="shake" style={{ bottom: 0, right: sizes.marginHorizontal, left: 0, }}>
                    //     <SmallText style={[{ color: colors.error, textAlign: 'right' }]}>{error}</SmallText>
                    // </AbsoluteWrapper>
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
    );
}

const PickerPrimaryStyles = StyleSheet.create({
    inputIOS: {
        fontSize: fontSize.medium,
        fontFamily: fontFamily.appTextRegular,
        //paddingVertical: height(2),
        height: height(8),
        paddingHorizontal: 0,
        marginHorizontal: 0,
        //borderWidth: 1,
        //borderColor: colors.appTextColor5,
        //  borderRadius: 5,
        color: 'black',
        //paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: fontSize.medium,
        fontFamily: fontFamily.appTextRegular,
        //paddingVertical: height(2),
        height: height(8),
        paddingHorizontal: 0,
        marginHorizontal: 0,
        // borderWidth: 1,
        // borderColor: colors.appTextColor5,
        //borderRadius: 5,
        color: 'black',
        //paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export function PickerSearchable({ placeholder, error, data, value, inputStyle, onPressItem, onPressAdd, title, onChangeText, right, left, tintColor, onFocus, onBlur }) {
    const searchInputRef = useRef(null)
    const [isFocused, setFocused] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const handleOnFocus = () => {
        HelpingMethods.handleAnimation()
        setFocused(true)
    }
    const handleOnBlur = () => {
        HelpingMethods.handleAnimation()
        setFocused(false)
        setSearchQuery('')
    }
    const handleOnPressItem = () => {
        HelpingMethods.handleAnimation()
        handleOnBlur()
        searchInputRef.current.blur()
        setSearchQuery('')
    }
    const getData = () => {
        let tempData = []
        if (searchQuery) {
            let query = searchQuery.toLowerCase()
            tempData = data.filter(item => {
                return (
                    item.label.toLowerCase().includes(query)
                )
            })
        } else {
            tempData = data
        }
        return tempData
        //console.log('Searched options===>',tempData)
    }

    return (
        <Wrapper>
            <TextInputUnderlined
                title={title}
                inputRef={searchInputRef}
                placeholder={isFocused ? "Type Here" : placeholder}
                placeholderTextColor={tintColor}
                value={searchQuery ? searchQuery : value}
                onFocus={() => {
                    handleOnFocus();
                    onFocus && onFocus()
                }}
                onBlur={() => {
                    handleOnBlur();
                    onBlur && onBlur()
                }}
                onChangeText={text => {
                    setSearchQuery(text);
                    onChangeText ? onChangeText(text) : null
                }}
                inputStyle={inputStyle}
                error={error}
                right={
                    right ? right :
                        <Icon name="caret-down-sharp" type="ionicon" size={totalSize(1.5)} color={colors.appTextColor3} />
                }
                left={left}
            />
            {
                isFocused &&
                <ComponentWrapper style={{ height: height(20), backgroundColor: colors.appBgColor2, marginBottom: sizes.smallMargin }}>
                    {
                        getData().length ?
                            <FlatList
                                data={
                                    getData()
                                }
                                keyboardShouldPersistTaps
                                nestedScrollEnabled
                                ListHeaderComponent={() => {
                                    return (
                                        <Spacer height={sizes.TinyMargin} />
                                    )
                                }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ComponentWrapper style={{}}>
                                            <TouchableOpacity onPress={() => onPressItem(item, index, handleOnPressItem())} activeOpacity={1} style={{ paddingVertical: sizes.TinyMargin }}>
                                                <MediumText style={[appStyles.textMedium]}>{item.label}</MediumText>
                                            </TouchableOpacity>
                                        </ComponentWrapper>
                                    )
                                }}
                            />
                            :
                            <Wrapper style={{ flex: 1, ...appStyles.center }}>
                                <RegularText style={[appStyles.textGray]}>No Data Available</RegularText>
                            </Wrapper>
                    }

                </ComponentWrapper>
            }
        </Wrapper >
    )
}


