import React, { Component, useEffect, useState } from 'react';
import { View, Text, Animated, Image } from 'react-native';
import { MainWrapper, XXLTitle, AbsoluteWrapper, Wrapper, Spacer, LogoMain, CustomIcon, ComponentWrapper, MediumText, ButtonColored, TextInputUnderlined, CheckBoxPrimary, RegularText, RowWrapper, ButtonGradient, ButtonSocial, KeyboardAvoidingScrollView } from '../../../components';
import { appStyles, colors, sizes, appImages, routes, HelpingMethods, Validations, asyncConts, Backend } from '../../../services';
import { totalSize, width, height } from 'react-native-dimension';
import { MaterialIndicator } from 'react-native-indicators';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Signin(props) {
  const { navigate, goBack } = props.navigation
  const [logoTopMargin] = useState(new Animated.Value(height(40)))
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [resetPasswordModalVisible, SetResetPasswordModalVisible] = useState(false)

  useEffect(() => {
    // HelpingMethods.handlePushNotificationPermission()
    checkUser()
  }, [])


  const checkUser = async () => {
    const userCredentials = await AsyncStorage.getItem(asyncConts.user_credentials)
    if (userCredentials) {
      const params = JSON.parse(userCredentials)
      await Backend.auto_login(params.email, params.password)
    } else {
      setTimeout(() => {
        handleLoading(sizes.statusBarHeight)
        setLoading(false)
      }, 1000);
    }

  }

  const handleLoading = (value) => {
    Animated.timing(logoTopMargin, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

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
  const validations = () => {
    HelpingMethods.handleAnimation()

    !email ? setEmailError('Enter your email') : !Validations.validateEmail(email) ? setEmailError('Email format is invalid') : setEmailError('')
    !password ? setPasswordError('Enter your password') : password.length < 6 ? setPasswordError('Atleast 6 characters') : setPasswordError('')
    if (password.length >= 6 && Validations.validateEmail(email)) {
      return true
    } else {
      return false
    }
  }
  const onLogin = async () => {
    if (validations()) {
      setLoginLoading(true)
      await Backend.login(email, password).then(res => {
        //res && goBack()
      })
      setLoginLoading(false)
    }
  }

  return (
    <MainWrapper style={[]}>
      {
        loading ?
          <>
            <AbsoluteWrapper style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
              <ImageBackground source={appImages.bg_main} style={{ flex: 1, height: null, width: null }} />
            </AbsoluteWrapper>
          </>
          :
          null
      }
      <KeyboardAvoidingScrollView>

        <Wrapper flex={1} >
          <Wrapper style={[appStyles.center]}>
            <Animated.View style={{ height: logoTopMargin }} />
            <LogoMain
              size={totalSize(20)}
            />
          </Wrapper>
          {
            loading ?
              <Wrapper style={[appStyles.center]}>
                <Spacer height={sizes.doubleBaseMargin} />
                <MaterialIndicator
                  size={totalSize(3)}
                  color={colors.appTextColor1}
                />
                <Spacer height={sizes.doubleBaseMargin * 2} />
              </Wrapper>
              :
              <Wrapper flex={1} animation="fadeInUp" style={{}}>
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
                <RowWrapper horizontal={sizes.marginHorizontalLarge}>
                  <CheckBoxPrimary
                    text="Remember me"
                    checked={rememberMe}
                    checkIconColor={colors.success}
                    onPress={() => setRememberMe(!rememberMe)}
                  />
                  <RegularText
                    onPress={() => navigate(routes.resetPassword)}
                    style={[]}>Forgot Password</RegularText>
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
                <ButtonGradient
                  text="Login"
                  shadow
                  onPress={onLogin}
                  loading={loginLoading}
                />
                <Spacer height={sizes.baseMargin} />
                <ButtonSocial
                  text="Continue with Parlor"
                  logo={appImages.parlor_logo}
                  onPress={() => { }}
                />
                <Spacer height={sizes.smallMargin} />
                <ButtonSocial
                  text="Continue with Google"
                  logo={appImages.google_logo}
                  onPress={() => { }}
                />
                <Spacer height={sizes.smallMargin} />
                <ButtonSocial
                  text="Continue with Instagram"
                  logo={appImages.instagram_logo}
                  onPress={() => { }}
                />
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                  <RegularText style={[appStyles.textCenter]}>
                    Don't have an account?
                  </RegularText>
                </ComponentWrapper>
                <Spacer height={sizes.smallMargin} />
                <ButtonSocial
                  text="Create an account"
                  onPress={() => navigate(routes.createAccount)}
                />
                <Spacer height={sizes.baseMargin} />
              </Wrapper>
          }
        </Wrapper>
      </KeyboardAvoidingScrollView>
    </MainWrapper>
  );
}

export default Signin;
