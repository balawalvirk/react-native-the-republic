import React, {Component, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {
  ButtonColored,
  ButtonGradient,
  ComponentWrapper,
  CustomIcon,
  KeyboardAvoidingScrollView,
  MainWrapper,
  PopupPrimary,
  RegularText,
  Spacer,
  TextInputUnderlined,
  TinyTitle,
  Wrapper,
  VerificationCodeSentPopup,
  Toasts,
  LoaderAbsolute,
} from '../../../../components';
import {
  appImages,
  appStyles,
  asyncConsts,
  Backend,
  colors,
  routes,
  sizes,
} from '../../../../services';
//import OTPInputView from '@twotalltotems/react-native-otp-input'
import OtpInputs from 'react-native-otp-inputs';
import styles from './styles';
import CountryPicker from 'react-native-country-picker-modal';
import auth from '@react-native-firebase/auth';

function VerifyPhone(props) {
  const {navigate} = props.navigation;
  const {params} = props.route;
  const {credentials, profileDetails, confirmPhoneNumber, userSocialData} =
    params;
  console.log('credentials', credentials, '\nProfile Details', profileDetails);
  console.log('\nuserSocialData', userSocialData);

  //local states
  const [code, setCode] = useState('');
  const [clearCode, setClearCode] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [phoneNumberWithCode, setPhoneNumberWithCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(profileDetails.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryCode, setCountryCode] = useState(profileDetails.countryCode);
  const [countryPhoneCode, setCountryPhoneCode] = useState(
    profileDetails.countryPhoneCode,
  );
  const [
    isVerificationCodeSendModalVisible,
    setVerificationCodeSendModalVisibility,
  ] = useState(false);
  const [isUpdatePhoneNumberPopupVisible, setUpdatePhoneNumberPopupVisibility] =
    useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSetData();
  }, []);

  const toggleVerificationCodeSendModal = () =>
    setVerificationCodeSendModalVisibility(!isVerificationCodeSendModalVisible);
  const toggleUpdatePhoneNumberPopup = () =>
    setUpdatePhoneNumberPopupVisibility(!isUpdatePhoneNumberPopupVisible);

  const getSetData = () => {
    const {phoneNumber, countryPhoneCode} = profileDetails;
    const mobileNumber = '+' + countryPhoneCode + phoneNumber;
    console.log('Phone number: ', mobileNumber);
    console.log('confirmPhoneNumber: ', confirmPhoneNumber);
    setPhoneNumberWithCode(mobileNumber);
    setConfirmation(confirmPhoneNumber);
  };

  const handleVerifyCode = async code => {
    setLoading(true);
    console.log(`Code is ${code}`);
    if (code.length === 6) {
      // await confirmation
      //     .confirm(code)
      //     .then(res => {
      //         console.log('Verfication Response', res)
      //         Toasts.success('Phone number has been verified')
      //         navigate(routes.verifyIdentity, { credentials, profileDetails, phoneNumber, countryPhoneCode, countryCode })
      //         // registerNewAccount()
      //     })
      //     .catch(async (error) => {
      //         console.log(error)
      //         setTimeout(() => {
      //             Toasts.error(error.message)
      //         }, 100);
      //     })
      // await Backend.verifyPhoneCode({ number: phoneNumberWithCode, code }).
      //     then(res => {
      //         if (res) {
      //             Toasts.success('Phone number has been verified')
      //             navigate(routes.verifyIdentity, { credentials, profileDetails, phoneNumber, countryPhoneCode, countryCode })
      //         }
      //     })
      await Backend.verifyPhoneUsingFirebase({confirmation, code}).then(
        async res => {
          if (res) {
            Toasts.success('Phone number has been verified');
            navigate(routes.verifyIdentity, {
              credentials,
              profileDetails,
              phoneNumber,
              countryPhoneCode,
              countryCode,
            });
          } else {
            setCode('');
            setClearCode(true);
          }
        },
      );
    }
    setLoading(false);
  };

  const sendCodeToPhoneNumber = async phoneNumber => {
    setLoading(true);
    await auth()
      .verifyPhoneNumber(phoneNumber)
      .then(confirmResult => {
        console.log('confirmResult: ', confirmResult);
        setConfirmation(confirmResult);
        toggleVerificationCodeSendModal();
      })
      .catch(error => {
        Toasts.error(error.message);
        console.log(error);
      });
    // await Backend.sendPhoneCode({ number: phoneNumber }).
    //     then(res => {
    //         if (res) {
    //             //setConfirmPhoneNumber(confirmResult)
    //             toggleVerificationCodeSendModal()
    //         }
    //     })
    setLoading(false);
  };

  const onSelect = gender => {
    setCountryCode(gender.cca2);
    setCountryPhoneCode(gender.callingCode[0]);
  };

  const handleUpdatePhoneNumber = async () => {
    const tempPhone = '+' + countryPhoneCode + phoneNumber;
    console.log('Updated Phone Number', tempPhone);
    if (phoneNumber.length) {
      toggleUpdatePhoneNumberPopup();
      setPhoneNumberWithCode(tempPhone);
      sendCodeToPhoneNumber(tempPhone);
    } else {
      setPhoneNumberError('Enter your phone number');
    }
  };

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
          <TinyTitle style={[appStyles.textCenter]}>
            {' '}
            Enter the 6 digit code sent to your phone number{' '}
            {phoneNumberWithCode}
          </TinyTitle>
        </ComponentWrapper>
        <OtpInputs
          style={{
            flexDirection: 'row',
            width: width(90),
            height: height(25),
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
          }}
          numberOfInputs={6} // code={emailCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged={code => { setEmailCode(code) }}
          placeholder="-"
          placeholderTextColor={colors.appTextColor4}
          //autoFocusOnLoad
          inputStyles={[styles.underlineStyleBase,{  textAlign:'center',}]}
          focusStyles={styles.borderStyleHighLighted}
          handleChange={handleVerifyCode}
          autoFocus
        />
        {/* <OTPInputView
          style={{width: '90%', height: height(10), alignSelf: 'center'}}
          pinCount={6}
          code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={v => {
            clearCode && setClearCode(false);
            setCode(v);
          }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.borderStyleHighLighted}
          onCodeFilled={handleVerifyCode}
          clearInputs={clearCode}
        /> */}
        <Spacer height={sizes.doubleBaseMargin} />
        {/* <ComponentWrapper>
                    <ButtonGradient
                        text="Verify"
                        loading={loading}
                        shadow
                        onPress={handleVerifyCode}
                    />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin * 1.5} /> */}
        {/* <ComponentWrapper style={[appStyles.center]}>
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
                </ComponentWrapper> */}
        <ComponentWrapper style={[appStyles.center]}>
          <TouchableOpacity
            onPress={() => {
              sendCodeToPhoneNumber(phoneNumberWithCode);
            }}
            style={[appStyles.center]}>
            <RegularText>Didn't received the code?</RegularText>
            <Spacer height={sizes.TinyMargin} />
            <RegularText
              style={[appStyles.fontBold, appStyles.textPrimaryColor]}
              // onPress={() => {
              //     sendCodeToPhoneNumber(phoneNumberWithCode)
              // }}
            >
              Resend Code
            </RegularText>
          </TouchableOpacity>
          <Spacer height={sizes.baseMargin * 1.5} />
          <TouchableOpacity
            onPress={toggleUpdatePhoneNumberPopup}
            style={[appStyles.center]}>
            <RegularText>Wrong phone number?</RegularText>
            <Spacer height={sizes.TinyMargin} />
            <RegularText
              style={[appStyles.fontBold, appStyles.textPrimaryColor]}
              // onPress={toggleUpdatePhoneNumberPopup}
            >
              Change your number
            </RegularText>
          </TouchableOpacity>
        </ComponentWrapper>
      </KeyboardAvoidingScrollView>
      <VerificationCodeSentPopup
        visible={isVerificationCodeSendModalVisible}
        toggle={toggleVerificationCodeSendModal}
        onPressContinue={() => {
          toggleVerificationCodeSendModal();
        }}
        phoneNumber={phoneNumberWithCode}
      />
      <PopupPrimary
        visible={isUpdatePhoneNumberPopupVisible}
        toggle={toggleUpdatePhoneNumberPopup}
        title="Update Phone Number"
        buttonText1="Update"
        onPressButton1={handleUpdatePhoneNumber}
        topMargin={height(30)}>
        <TextInputUnderlined
          titleStatic={'Phone Number'}
          keyboardType="number-pad"
          autoFocus
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          error={phoneNumberError}
          inputStyle={{backgroundColor: 'transparent'}}
          left={
            <Wrapper
              style={{
                marginRight: sizes.marginHorizontal / 2,
                backgroundColor: 'transparent',
              }}>
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
      <LoaderAbsolute
        isVisible={loading}
        title="Please Wait"
        // info="Please wait..."
      />
    </MainWrapper>
  );
}

export default VerifyPhone;
