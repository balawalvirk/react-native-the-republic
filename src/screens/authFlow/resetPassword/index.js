import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { ButtonGradient, ComponentWrapper, CustomIcon, KeyboardAvoidingScrollView, LargeTitle, MainWrapper, PopupPrimary, Spacer, TextInputUnderlined, Wrapper } from '../../../components';
import { appImages, appStyles, HelpingMethods, routes, sizes, Validations } from '../../../services';

function ResetPassword(props) {
    const {navigate}=props.navigation
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isLinkSentPopupVisible, setLinkSentPopupVisibility] = useState(false)

    const toggleLinkSentPopup = () => setLinkSentPopupVisibility(!isLinkSentPopupVisible)
    const handleOnChangeEmailText = (email) => {
        HelpingMethods.handleAnimation()
        !email ? setEmailError('') : !Validations.validateEmail(email) ? setEmailError('Email format is invalid') : setEmailError('')
        setEmail(email)
    }
    const validations = () => {
        HelpingMethods.handleAnimation()

        !email ? setEmailError('Enter your email') : !Validations.validateEmail(email) ? setEmailError('Email format is invalid') : setEmailError('')
        if (Validations.validateEmail(email)) {
            return true
        } else {
            return false
        }
    }
    const onSendLink = async () => {
        if (validations()) {
            setLoading(true)
            setTimeout(() => {
                toggleLinkSentPopup()
                setLoading(false)
            }, 2000);
        }
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Wrapper animation={'fadeInDown'} style={[appStyles.center]}>
                    <Spacer height={sizes.baseMargin} />
                    <CustomIcon
                        icon={appImages.resetpassword_icon}
                        size={width(80)}
                    />
                </Wrapper>
                <TextInputUnderlined
                    title="Email"
                    //placeholder=""
                    value={email}
                    keyboardType="email-address"
                    // iconName="email"
                    //customIconLeft={appIcons.user}
                    onChangeText={handleOnChangeEmailText}
                    error={emailError}
                />
                <Spacer height={sizes.doubleBaseMargin} />
                <ButtonGradient
                    text="Send Password Reset Link"
                    loading={loading}
                    onPress={onSendLink}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
            <PopupPrimary
                visible={isLinkSentPopupVisible}
                toggle={toggleLinkSentPopup}
                topMargin={height(55)}
                title={`Password Reset Link Sent`}
                info="Please check the email and use the link to reset the password"
                buttonText1="Continue to Login"
                iconName="check"
                iconType="octicon"
                // buttonText2="Cancel"
                onPressButton1={() => {
                    toggleLinkSentPopup();
                      navigate(routes.signin, {})
                }}
            // onPressButton2={toggleLinkSentPopup}
            >
                <Spacer height={sizes.baseMargin}/>
            </PopupPrimary>
        </MainWrapper>
    );
}

export default ResetPassword;
