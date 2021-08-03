import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { ButtonColored, ButtonGradient, ComponentWrapper, CustomIcon, KeyboardAvoidingScrollView, MainWrapper, PopupPrimary, RegularText, Spacer, TextInputUnderlined, TinyTitle, Wrapper, VerificationCodeSentPopup } from '../../../../components';
import { appImages, appStyles, routes, sizes } from '../../../../services';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import styles from './styles';
import CountryPicker from 'react-native-country-picker-modal'
function VerifyPhone(props) {
    const { navigate } = props.navigation
    const { params } = props.route
    const { credentials, profileDetails } = params
    const [loading, setLoading] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState(profileDetails.phoneNumber)
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [countryCode, setCountryCode] = useState(profileDetails.countryCode)
    const [countryPhoneCode, setCountryPhoneCode] = useState(profileDetails.countryPhoneCode)
    const [isVerificationCodeSendModalVisible, setVerificationCodeSendModalVisibility] = useState(false)
    const [isUpdatePhoneNumberPopupVisible, setUpdatePhoneNumberPopupVisibility] = useState(false)

    console.log('credentials', credentials, 'Profile Details', profileDetails)

    const toggleVerificationCodeSendModal = () => setVerificationCodeSendModalVisibility(!isVerificationCodeSendModalVisible)
    const toggleUpdatePhoneNumberPopup = () => setUpdatePhoneNumberPopupVisibility(!isUpdatePhoneNumberPopupVisible)

    const handleVerifyCode = (code) => {
        console.log(`Code is ${code}, you are good to go!`)
        setLoading(true)
        setTimeout(() => {
            navigate(routes.verifyIdentity)
            setLoading(false)
        }, 2000);
    }
    const onSelect = (gender) => {
        setCountryCode(gender.cca2)
        setCountryPhoneCode(gender.callingCode)
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <Wrapper style={[appStyles.center]}>
                    <CustomIcon
                        icon={appImages.verify_phone_number}
                        size={totalSize(25)}
                    />
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <TinyTitle style={[appStyles.textCenter]}> Enter the 6 digit code sent to your phone number</TinyTitle>
                </ComponentWrapper>
                <OTPInputView
                    style={{ width: '90%', height: height(10), alignSelf: 'center' }}
                    pinCount={6}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.borderStyleHighLighted}
                    onCodeFilled={handleVerifyCode}
                />
                <Spacer height={sizes.doubleBaseMargin} />
                <ComponentWrapper>
                    <ButtonGradient
                        text="Verify"
                        loading={loading}
                        shadow
                        onPress={handleVerifyCode}
                    />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin * 1.5} />
                <ComponentWrapper style={[appStyles.center]}>
                    <RegularText style={[appStyles.textGray]}>Didn't received the code?</RegularText>
                    <Spacer height={sizes.TinyMargin} />
                    <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}
                        onPress={toggleVerificationCodeSendModal}>Resend Code</RegularText>
                    <Spacer height={sizes.baseMargin * 1.5} />
                    <RegularText style={[appStyles.textGray]}>Wrong phone number?</RegularText>
                    <Spacer height={sizes.TinyMargin} />
                    <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}
                        onPress={toggleUpdatePhoneNumberPopup}
                    >Change your number</RegularText>
                </ComponentWrapper>
            </KeyboardAvoidingScrollView>
            <VerificationCodeSentPopup
                visible={isVerificationCodeSendModalVisible}
                toggle={toggleVerificationCodeSendModal}
                onPressContinue={() => {
                    toggleVerificationCodeSendModal();
                }}
                phoneNumber={'6-007867687-78'}
            />
            <PopupPrimary
                visible={isUpdatePhoneNumberPopupVisible}
                toggle={toggleUpdatePhoneNumberPopup}
                title="Update Phone Number"
                buttonText1="Update"
                onPressButton1={toggleUpdatePhoneNumberPopup}
                topMargin={height(30)}
            >
                <TextInputUnderlined
                    titleStatic={"Phone Number"}
                    keyboardType="number-pad"
                    autoFocus
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    error={phoneNumberError}
                    inputStyle={{ backgroundColor: 'transparent', }}
                    left={
                        <Wrapper style={{ marginRight: sizes.marginHorizontal / 2, backgroundColor: 'transparent', }}>
                            <CountryPicker
                                {...{
                                    countryCode,
                                    withFilter: true,
                                    withFlag: true,
                                    withCountryNameButton: false,
                                    withCallingCodeButton: true,
                                    withAlphaFilter: true,
                                    withCallingCode: true,
                                    withEmoji: true,
                                    onSelect,
                                }}
                            // visible
                            />
                        </Wrapper>
                    }
                />
            </PopupPrimary>
        </MainWrapper>
    );
}

export default VerifyPhone;
