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
import PickerPrimary from './primary'
//import PickerPrimary from './primary-old'


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


export {PickerPrimary}

