import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {
  MainWrapper,
  IconButton,
  Wrapper,
  Spacer,
  ImageProfile,
  RowWrapperBasic,
  RowWrapper,
  TextInputUnderlined,
  KeyboardAvoidingScrollView,
  ComponentWrapper,
  ButtonColored,
  PickerPrimary,
  IconWithText,
  EditProfileComp,
  ButtonGradient,
  PopupPrimary,
  MediumText,
  VerificationCodeSentPopup,
  Toasts,
} from '../../../../components';
import {height, totalSize, width} from 'react-native-dimension';
import {
  colors,
  appStyles,
  sizes,
  HelpingMethods,
  appIcons,
  routes,
  Backend,
} from '../../../../services';
import auth from '@react-native-firebase/auth';
function CompleteYourProfile(props) {
  const {navigate} = props.navigation;
  const {params} = props.route;
  const {credentials, userSocialData} = params;
  console.log('credentials', credentials);
  console.log('userSocialData', userSocialData);

  const EditProfileRef = useRef(null);

  //local States
  const [phoneNumberWithCode, setPhoneNumberWithCode] = useState('');
  // const [profileData, setProfileData] = useState({})
  const [loading, setLoading] = useState(false);
  const [
    isVerificationCodeSendModalVisible,
    setVerificationCodeSendModalVisibility,
  ] = useState(false);
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState(null);

  let socicalCredentials = {};
  if (userSocialData) {
    const {
      email,
      firstName,
      lastName,
      userName,
      googleToken,
      appleToken,
      instagramToken,
      instagramUserId,
    } = userSocialData;
    const tempSocialCredentials = {
      email,
      googleToken,
      appleToken,
      instagramToken,
      instagramUserId,
    };
    socicalCredentials = tempSocialCredentials;
  }

  const toggleVerificationCodeSendModal = () =>
    setVerificationCodeSendModalVisibility(!isVerificationCodeSendModalVisible);

  const sendCodeToPhoneNumber = async phoneNumber => {
    //const _testPhoneNumber='+923450144778'
    await auth()
      .verifyPhoneNumber(phoneNumber)
      .then(confirmResult => {
        console.log('confirmResult: ', confirmResult);
        setConfirmPhoneNumber(confirmResult);
        toggleVerificationCodeSendModal();
      })
      .catch(error => {
        //alert(error.message)
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
  };
  const handleContinue = async () => {
    //toggleVerificationCodeSendModal();
    // sendCodeToPhoneNumber()
     //return null
    const profileDetails = EditProfileRef.current.getAllData();
    const validateProfileData = EditProfileRef.current.validate();
    console.log('Profile Data:   ', profileDetails);
    if (validateProfileData) {
      // setProfileData(profileDetails)
      setLoading(true);
      const {phoneNumber, countryPhoneCode} = profileDetails;
      const mobileNumber = '+' + countryPhoneCode + phoneNumber;
      setPhoneNumberWithCode(mobileNumber);
      await sendCodeToPhoneNumber(mobileNumber);
      setLoading(false);
    }
  };

  return (
    <MainWrapper>
      <KeyboardAvoidingScrollView>
        <EditProfileComp ref={EditProfileRef} data={userSocialData} />
        <Spacer height={sizes.baseMargin * 2} />
        <ButtonGradient
          text="Continue"
          shadow
          onPress={handleContinue}
          loading={loading}
        />
        <Spacer height={sizes.doubleBaseMargin} />
      </KeyboardAvoidingScrollView>
      <VerificationCodeSentPopup
        visible={isVerificationCodeSendModalVisible}
        toggle={toggleVerificationCodeSendModal}
        onPressContinue={() => {
          toggleVerificationCodeSendModal();
          navigate(routes.verifyPhone, {
            credentials: userSocialData ? socicalCredentials : credentials,
            profileDetails: EditProfileRef.current.getAllData(),
            confirmPhoneNumber,
            userSocialData,
          });
        }}
        phoneNumber={phoneNumberWithCode}
      />
    </MainWrapper>
  );
}

export default CompleteYourProfile;
