import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, XXLTitle, Spacer, ComponentWrapper, BackIcon, BackgroundElementTop, Wrapper, LogoMain, TextInputBordered, TextInputUnderlined, AbsoluteWrapper, CheckBoxPrimary, ButtonColored, RegularText, RowWrapper, Toasts, KeyboardAvoidingScrollView, ButtonGradient, ErrorText } from '../../../../components';
import { appStyles, sizes, HelpingMethods, Validations, routes, Backend } from '../../../../services';
import { totalSize, height } from 'react-native-dimension';
import { TermsCondition } from '../../../docs';

function CreateAccount(props) {
  const { navigate, goBack } = props.navigation
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [accept, setaccept] = useState(false)
  const [acceptError, setacceptError] = useState('')
  const [loading, setLoading] = useState(false)
  const [termsVisible, setTermsVisible] = useState(false)

  const handleOnChangeEmailText = (email) => {
    HelpingMethods.handleAnimation()
    !email ? setEmailError('') : !Validations.validateEmail(email) ? setEmailError('Email format is invalid') : setEmailError('')
    setEmail(email)
  }
  const handleOnChangePasswordText = (password) => {
    HelpingMethods.handleAnimation()
    !password ? setPasswordError('') : password.length < 6 ? setPasswordError('Atleast 6 characters') : setPasswordError('')
    setPassword(password)
  }
  const handleOnChangeConfirmPasswordText = (confirmPassword) => {
    HelpingMethods.handleAnimation()
    !confirmPassword ? setConfirmPasswordError('') : confirmPassword.length < 6 ? setConfirmPasswordError('Atleast 6 characters') : setConfirmPasswordError('')
    setConfirmPassword(confirmPassword)
  }
  const validations = () => {
    HelpingMethods.handleAnimation()
    !email ? setEmailError('Enter your email') : !Validations.validateEmail(email) ? setEmailError('Email format is invalid') : setEmailError('')
    !password ? setPasswordError('Enter your password') : password.length < 6 ? setPasswordError('Atleast 6 characters') : setPasswordError('')
    !confirmPassword ? setConfirmPasswordError('Enter confirm password') : confirmPassword.length < 6 ? setConfirmPasswordError('Atleast 6 characters') : confirmPassword != password ? setConfirmPasswordError('Password not matched') : setConfirmPasswordError('')
    if (password.length >= 6 && confirmPassword.length === password.length && Validations.validateEmail(email)) {
      {
        if (accept) {
          return true
        } else {
          Toasts.error('Please accept our terms & conditions')
        }
      }
    } else {
      return false
    }
  }
  const handleRegister = async() => {
    const credentials = {
      email: email,
      password: password
    }
    if (validations()) {
      setLoading(true)
      await Backend.checkUser({email}).
        then(res => {
          if (res) {
            navigate(routes.completeYourProfil, { credentials })
          }
        })
      setLoading(false)
    }
  }



  return (
    <MainWrapper >
      <KeyboardAvoidingScrollView>
        <Spacer height={sizes.baseMargin} />
        <TextInputUnderlined
          title="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={handleOnChangeEmailText}
          error={emailError}
        />
        <Spacer height={sizes.baseMargin} />
        <TextInputUnderlined
          title="Password"
          value={password}
          iconNameRight={passwordVisible ? "eye" : "eye-off"}
          iconTypeRight="feather"
          onPressIconRight={() => setPasswordVisible(!passwordVisible)}
          secureTextEntry={!passwordVisible}
          onChangeText={handleOnChangePasswordText}
          inputStyle={{ letterSpacing: totalSize(0.5) }}
          error={passwordError}
        />
        <Spacer height={sizes.baseMargin} />
        <TextInputUnderlined
          title="Confirm Password"
          value={confirmPassword}
          iconNameRight={confirmPasswordVisible ? "eye" : "eye-off"}
          iconTypeRight="feather"
          onPressIconRight={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          secureTextEntry={!confirmPasswordVisible}
          onChangeText={handleOnChangeConfirmPasswordText}
          inputStyle={{ letterSpacing: totalSize(0.5) }}
          error={confirmPasswordError}
        />
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper horizontal={sizes.marginHorizontalLarge}>
          <CheckBoxPrimary
            text={
              <RegularText >
                Accept
                <RegularText onPress={() => setTermsVisible(true)} style={[appStyles.textPrimaryColor, appStyles.fontBold]}> Terms & Conditions </RegularText>,
              </RegularText>
            }
            checked={accept}
            onPress={() => setaccept(!accept)}
          />
        </ComponentWrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <ButtonGradient
          text="Register"
          shadow
          loading={loading}
          onPress={handleRegister}
        />
        <Spacer height={sizes.doubleBaseMargin} />
      </KeyboardAvoidingScrollView>
      <TermsCondition
        visible={termsVisible}
        toggle={() => setTermsVisible(!termsVisible)}
      />
    </MainWrapper>
  );
}

export default CreateAccount;
