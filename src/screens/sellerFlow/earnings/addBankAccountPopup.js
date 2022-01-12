import React, { Component, useState, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import { View, Text, FlatList } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { BorderedWrapper, ButtonBordered, ButtonGradient, CardWrapper, ColoredWrapper, ComponentWrapper, IconWithText, LargeText, LargeTitle, MainWrapper, MediumText, MediumTitle, PickerPrimary, PickerSearchable, PopupPrimary, RegularText, RowWrapper, RowWrapperBasic, SkeletonListVerticalSecondary, SkeletonPrimary, SmallTitle, Spacer, TextInputUnderlined, TinyTitle, Toasts, Wrapper, XLTitle, XXLTitle } from '../../../components';
import { appStyles, Backend, colors, HelpingMethods, sizes } from '../../../services';


export default function AddBankAccountPopup({ visible, toggle, onPressDone, isLoading, banks }) {

    const [bank, setBank] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [accountHolderName, setAccountHolderName] = useState('')
    const [routingNumber, setRoutingNumber] = useState('')
    const [bankError, setBankError] = useState('')
    const [accountHolderNameError, setAccountHolderNameError] = useState('')
    const [acNumberError, setAcNumberError] = useState('')
    const [routingNumberError, setRoutingNumberError] = useState('')

    // manage keyboard
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    let keyboardDidShowListener
    let keyboardDidHideListener
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(true) });
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(false) });
    })

    const validate = () => {
        HelpingMethods.handleAnimation()
        //!bank ? setBankError('Please select bank') : setBankError('')
        !accountHolderName ? setAccountHolderNameError('Please enter account holder name') : setAccountHolderNameError('')
        !accountNumber ? setAcNumberError('Please enter account number') : setAcNumberError('')
        !routingNumber ? setRoutingNumberError('Please enter routing number') : routingNumber.length != 9 ? setRoutingNumberError('It must be 9 digits') : setRoutingNumberError('')
        if (accountHolderName && accountNumber&& routingNumber.length === 9) { return true } else { return false }
    }
    const handleAdd = () => {
        if (validate()) {
            const obj = {
                //bank,
                accountNumber,
                accountHolderName,
                routingNumber
            }
            return obj
        } else {
            return null
        }
    }
    return (
        <PopupPrimary
            visible={visible}
            toggle={toggle}
            title="Add bank account"
            buttonText1="Done"
            onPressButton1={() => onPressDone(handleAdd())}
            topMargin={keyboardVisible ? height(20) : height(40)}
            keyboardShouldPersistTaps
            loadingButton1={isLoading}
        >

            {/* <PickerSearchable
                data={banks}
                title="Select Bank"
                value={bank.label}
                onChangeText={() => {
                    if (bank) {
                        setBank('')
                    }
                }}
                onPressItem={(item, index) => {
                    setBank(item)
                    console.log('item', item)
                }}
                error={bankError}
            /> */}
            <TextInputUnderlined
                title="Account Holder Name"
                value={accountHolderName}
                onChangeText={t => setAccountHolderName(t)}
                error={accountHolderNameError}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputUnderlined
                title="Account Number"
                value={accountNumber}
                onChangeText={t => setAccountNumber(t)}
                error={acNumberError}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputUnderlined
                title="Routing Number"
                value={routingNumber}
                onChangeText={t => setRoutingNumber(t)}
                error={routingNumberError}
            />
            <Spacer height={sizes.baseMargin} />
        </PopupPrimary>
    )
}