import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ButtonColored, ComponentWrapper, KeyboardAvoidingScrollView, MainWrapper, Spacer, TextInputUnderlined, Toasts, Wrapper } from '../../../components';
import { asyncConsts, Backend, colors, HelpingMethods, sizes } from '../../../services';

function ChangePassword(props) {
    const { goBack } = props.navigation
    //local states
    const [CurrentPassowrd, setCurrentPassword] = useState('')
    const [NewPassowrd, setNewPassword] = useState('')
    const [ConfirmNewPassowrd, setConfirmNewPassword] = useState('')
    const [CurrentPassowrdError, setCurrentPasswordError] = useState('')
    const [NewPassowrdError, setNewPasswordError] = useState('')
    const [ConfirmNewPassowrdError, setConfirmNewPasswordError] = useState('')
    const [loading, setLoading] = useState(false)

    const [isCurrentPassowrdVisible, setCurrentPasswordVisibility] = useState(false)
    const [isNewPassowrdVisible, setNewPasswordVisibility] = useState(false)
    const [isConfirmNewPassowrdVisible, setConfirmNewPasswordVisibility] = useState(false)

    const handleOnChangeCurrentPasswordText = (text) => {
        HelpingMethods.handleAnimation()
        !text ? setCurrentPasswordError('') : text.length < 6 ? setCurrentPasswordError('Atleast 6 characters') : setCurrentPasswordError('')
        setCurrentPassword(text)
    }
    const handleOnChangeNewPasswordText = (text) => {
        HelpingMethods.handleAnimation()
        !text ? setNewPasswordError('') : text.length < 6 ? setNewPasswordError('Atleast 6 characters') : setNewPasswordError('')
        setNewPassword(text)
    }
    const handleOnChangeConfirmNewPasswordText = (text) => {
        HelpingMethods.handleAnimation()
        !text ? setConfirmNewPasswordError('') : text.length < 6 ? setConfirmNewPasswordError('Atleast 6 characters') : text != NewPassowrd ? setConfirmNewPasswordError('Not matching with New Passowrd') : setConfirmNewPasswordError('')
        setConfirmNewPassword(text)
    }
    const validations = () => {
        HelpingMethods.handleAnimation()
        !CurrentPassowrd ? setCurrentPasswordError('Enter your Current Passowrd') : CurrentPassowrd.length < 6 ? setCurrentPasswordError('Atleast 6 characters') : setCurrentPasswordError('')
        !NewPassowrd ? setNewPasswordError('Enter your New Passowrd') : NewPassowrd.length < 6 ? setNewPasswordError('Atleast 6 characters') : setNewPasswordError('')
        !ConfirmNewPassowrd ? setConfirmNewPasswordError('Confirm your New Password') : ConfirmNewPassowrd.length < 6 ? setConfirmNewPasswordError('Atleast 6 characters') : ConfirmNewPassowrd != NewPassowrd ? setConfirmNewPasswordError('Not matching with New Password') : setConfirmNewPasswordError('')
        if (CurrentPassowrd.length >= 6 && NewPassowrd.length >= 6 && ConfirmNewPassowrd.length >= 6 && NewPassowrd === ConfirmNewPassowrd) {
            return true
        } else {
            return false
        }
    }
    const handleSaveChanges = async () => {
        if (validations()) {
            setLoading(true)
            await Backend.changePassword({
                old_password: CurrentPassowrd,
                password: NewPassowrd,
                password_confirmation: ConfirmNewPassowrd
            }).then(async res => {
                setLoading(false)
                if (res) {
                    const userCredentials = await AsyncStorage.getItem(asyncConsts.user_credentials)
                    if (userCredentials) {
                        const userCredentialsParsed = JSON.parse(userCredentials)
                        const NewUserCredentials = {
                            ...userCredentialsParsed,
                            password: NewPassowrd
                        }
                        await AsyncStorage.setItem(asyncConsts.user_credentials, JSON.stringify(NewUserCredentials))
                        goBack()
                        Toasts.success('Password changed successfully')
                    }
                }
            })
            // setTimeout(() => {
            //     goBack()
            //     Toasts.success('Password changed successfully')
            //     setLoading(false)
            // }, 1000);
        }
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin * 2} />
                <TextInputUnderlined
                    title="Current Password"
                    value={CurrentPassowrd}
                    onChangeText={handleOnChangeCurrentPasswordText}
                    error={CurrentPassowrdError}
                    inputStyle={{ letterSpacing: totalSize(1) }}
                    secureTextEntry={!isCurrentPassowrdVisible}
                    iconNameRight={"eye-outline"}
                    iconTypeRight="ionicon"
                    iconColorRight={isCurrentPassowrdVisible ? colors.appColor1 : colors.appTextColor5}
                    onPressIconRight={() => setCurrentPasswordVisibility(!isCurrentPassowrdVisible)}
                />
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="New Password"
                    value={NewPassowrd}
                    onChangeText={handleOnChangeNewPasswordText}
                    error={NewPassowrdError}
                    inputStyle={{ letterSpacing: totalSize(1) }}
                    secureTextEntry={!isNewPassowrdVisible}
                    iconNameRight={"eye-outline"}
                    iconTypeRight="ionicon"
                    iconColorRight={isNewPassowrdVisible ? colors.appColor1 : colors.appTextColor5}
                    onPressIconRight={() => setNewPasswordVisibility(!isNewPassowrdVisible)}
                />
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Confirm New Password"
                    value={ConfirmNewPassowrd}
                    onChangeText={handleOnChangeConfirmNewPasswordText}
                    error={ConfirmNewPassowrdError}
                    inputStyle={{ letterSpacing: totalSize(1) }}
                    secureTextEntry={!isConfirmNewPassowrdVisible}
                    iconNameRight={"eye-outline"}
                    iconTypeRight="ionicon"
                    iconColorRight={isConfirmNewPassowrdVisible ? colors.appColor1 : colors.appTextColor5}
                    onPressIconRight={() => setConfirmNewPasswordVisibility(!isConfirmNewPassowrdVisible)}
                />
                <Spacer height={sizes.doubleBaseMargin} />
                <ComponentWrapper>
                    <ButtonColored
                        text="Save Changes"
                        shadow
                        onPress={handleSaveChanges}
                        isLoading={loading}
                    />
                </ComponentWrapper>
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
        </MainWrapper>
    );
}

export default ChangePassword;
