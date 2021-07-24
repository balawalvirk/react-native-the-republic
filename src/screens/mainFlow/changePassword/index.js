import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ButtonColored, ComponentWrapper, KeyboardAvoidingScrollView, MainWrapper, Spacer, TextInputUnderlined, Toasts, Wrapper } from '../../../components';
import { Backend, colors, HelpingMethods, sizes } from '../../../services';

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
        !text ? setCurrentPasswordError('') : text.length < 8 ? setCurrentPasswordError('Atleast 8 characters') : setCurrentPasswordError('')
        setCurrentPassword(text)
    }
    const handleOnChangeNewPasswordText = (text) => {
        HelpingMethods.handleAnimation()
        !text ? setNewPasswordError('') : text.length < 8 ? setNewPasswordError('Atleast 8 characters') : setNewPasswordError('')
        setNewPassword(text)
    }
    const handleOnChangeConfirmNewPasswordText = (text) => {
        HelpingMethods.handleAnimation()
        !text ? setConfirmNewPasswordError('') : text.length < 8 ? setConfirmNewPasswordError('Atleast 8 characters') : text != NewPassowrd ? setConfirmNewPasswordError('Not matching with New Passowrd') : setConfirmNewPasswordError('')
        setConfirmNewPassword(text)
    }
    const validations = () => {
        HelpingMethods.handleAnimation()
        !CurrentPassowrd ? setCurrentPasswordError('Enter your Current Passowrd') : CurrentPassowrd.length < 8 ? setCurrentPasswordError('Atleast 8 characters') : setCurrentPasswordError('')
        !NewPassowrd ? setNewPasswordError('Enter your New Passowrd') : NewPassowrd.length < 8 ? setNewPasswordError('Atleast 8 characters') : setNewPasswordError('')
        !ConfirmNewPassowrd ? setConfirmNewPasswordError('Confirm your New Password') : ConfirmNewPassowrd.length < 8 ? setConfirmNewPasswordError('Atleast 8 characters') : ConfirmNewPassowrd != NewPassowrd ? setConfirmNewPasswordError('Not matching with New Password') : setConfirmNewPasswordError('')
        if (CurrentPassowrd.length >= 8 && NewPassowrd.length >= 8 && ConfirmNewPassowrd.length >= 8 && NewPassowrd === ConfirmNewPassowrd) {
            return true
        } else {
            return false
        }
    }
    const handleSaveChanges = async () => {
        if (validations()) {
            setLoading(true)

            setTimeout(() => {
                goBack()
                Toasts.success('Password changed successfuly')
                setLoading(false)
            }, 1000);
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
