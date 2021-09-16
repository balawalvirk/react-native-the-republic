import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, XXLTitle, Spacer, ComponentWrapper, BackIcon, BackgroundElementTop, Wrapper, LogoMain, TextInputBordered, TextInputUnderlined, AbsoluteWrapper, CheckBoxPrimary, ButtonColored, RegularText, RowWrapper, Toasts, KeyboardAvoidingScrollView, ButtonGradient } from '../../../../components';
import { appStyles, sizes, HelpingMethods, Validations, routes } from '../../../../services';
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
      return true
    } else {
      return false
    }
  }
  const handleRegister = () => {
    const credentials = {
      email: email,
      password: password
    }
    if (validations()) {
      
      setLoading(true)
      setTimeout(() => {
        navigate(routes.completeYourProfil, { credentials})
        setLoading(false)
      }, 1000);
    }
  }



  return (
    <MainWrapper >
      <KeyboardAvoidingScrollView>
          <Spacer height={sizes.baseMargin} />
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
          <Spacer height={sizes.baseMargin} />
          <TextInputUnderlined
            title="Password"
            value={password}
            //  customIconLeft={appIcons.lock}
            iconNameRight={passwordVisible ? "eye" : "eye-off"}
            iconTypeRight="feather"
            onPressIconRight={() => setPasswordVisible(!passwordVisible)}
            //iconColorRight={colors.appTextColor3}
            //keyboardType="ascii-capable"
            // iconName="lock"
            // customIconLeft={appIcons.lock}
            secureTextEntry={!passwordVisible}
            onChangeText={handleOnChangePasswordText}
            inputStyle={{ letterSpacing: totalSize(0.5) }}
            error={passwordError}
          />
          <Spacer height={sizes.baseMargin} />
          <TextInputUnderlined
            title="Confirm Password"
            value={confirmPassword}
            //  customIconLeft={appIcons.lock}
            iconNameRight={confirmPasswordVisible ? "eye" : "eye-off"}
            iconTypeRight="feather"
            onPressIconRight={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            //iconColorRight={colors.appTextColor3}
            //keyboardType="ascii-capable"
            // iconName="lock"
            // customIconLeft={appIcons.lock}
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
