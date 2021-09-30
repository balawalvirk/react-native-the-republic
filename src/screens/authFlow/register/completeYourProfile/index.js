import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, IconButton, Wrapper, Spacer, ImageProfile, RowWrapperBasic, RowWrapper, TextInputUnderlined, KeyboardAvoidingScrollView, ComponentWrapper, ButtonColored, PickerPrimary, IconWithText, EditProfileComp, ButtonGradient, PopupPrimary, MediumText, VerificationCodeSentPopup, Toasts } from '../../../../components';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes, HelpingMethods, appIcons, routes } from '../../../../services';
import auth from '@react-native-firebase/auth';
function CompleteYourProfile(props) {
    const { navigate } = props.navigation
    const { params } = props.route
    const { credentials } = params
    console.log('credentials', credentials)

    const EditProfileRef = useRef(null)

    //local States
    const [phoneNumberWithCode, setPhoneNumberWithCode] = useState('')
    // const [profileData, setProfileData] = useState({})
    const [loading, setLoading] = useState(false)
    const [isVerificationCodeSendModalVisible, setVerificationCodeSendModalVisibility] = useState(false)
    const [confirmPhoneNumber, setConfirmPhoneNumber] = useState(null)



    const toggleVerificationCodeSendModal = () => setVerificationCodeSendModalVisibility(!isVerificationCodeSendModalVisible)

    const sendCodeToPhoneNumber = async (phoneNumber) => {
        await auth()
            .signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                console.log('confirmResult: ', confirmResult)
                setConfirmPhoneNumber(confirmResult)
                toggleVerificationCodeSendModal()
            })
            .catch(error => {
                //alert(error.message)
                Toasts.error(error.message)
                console.log(error)
            })

    }
    const handleContinue = async () => {
        const profileDetails = EditProfileRef.current.getAllData()
        const validateProfileData = EditProfileRef.current.validate()
        console.log('Profile Data:   ', profileDetails)
        if (
            validateProfileData
        ) {
            // setProfileData(profileDetails)
             setLoading(true)
             const { phoneNumber, countryPhoneCode } = profileDetails
             const mobileNumber = '+' + countryPhoneCode + phoneNumber
             setPhoneNumberWithCode(mobileNumber)
             await sendCodeToPhoneNumber(mobileNumber)
             setLoading(false)
        }
    }

    return (
        <MainWrapper> 
            <KeyboardAvoidingScrollView>
                <EditProfileComp
                    ref={EditProfileRef}
                />
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
                    navigate(routes.verifyPhone, { credentials, profileDetails: EditProfileRef.current.getAllData(),confirmPhoneNumber })
                }}
                phoneNumber={phoneNumberWithCode}
            />

        </MainWrapper>
    );
}

export default CompleteYourProfile;
