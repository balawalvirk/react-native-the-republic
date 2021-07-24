import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, IconButton, Wrapper, Spacer, ImageProfile, RowWrapperBasic, RowWrapper, TextInputUnderlined, KeyboardAvoidingScrollView, ComponentWrapper, ButtonColored, PickerPrimary, IconWithText, EditProfileComp, ButtonGradient, PopupPrimary, MediumText, VerificationCodeSentPopup } from '../../../components';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes, HelpingMethods, appIcons, routes, appImages } from '../../../services';

const profileData = {
    profileImage: appImages.user3,
    firstName: 'Jackobe',
    lastName: 'Black',
    userName: 'jackobe443',
    gender: 'male',
    birthday: '24/07/1991',
    countryCode: 'US',
    countryPhoneCode: '+1',
    phoneNumber: '689789879'
}
function EditProfile(props) {
    const { navigate } = props.navigation
    const { params } = props.route
    // const { credentials } = params
    const EditProfileRef = useRef(null)
    // const [isVerificationCodeSendModalVisible, setVerificationCodeSendModalVisibility] = useState(false)

    //console.log('credentials', credentials)

    // const toggleVerificationCodeSendModal = () => setVerificationCodeSendModalVisibility(!isVerificationCodeSendModalVisible)


    const handleSaveChanges = () => {
        const profileDetails = EditProfileRef.current.getAllData()
        console.log('Profile Data:   ', profileDetails)
        if (
            profileDetails.imageFile &&
            profileDetails.firstName &&
            profileDetails.lastName &&
            profileDetails.userName &&
            profileDetails.gender &&
            profileDetails.birthday &&
            profileDetails.phoneNumber
        ) {
            //toggleVerificationCodeSendModal()
        }
    }

    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <EditProfileComp
                    ref={EditProfileRef}
                    data={profileData}
                />
                <Spacer height={sizes.baseMargin * 2} />
                <ButtonGradient
                    text="Save Changes"
                    shadow
                    onPress={handleSaveChanges}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
            {/* <VerificationCodeSentPopup
                visible={isVerificationCodeSendModalVisible}
                toggle={toggleVerificationCodeSendModal}
                onPressContinue={() => {
                    toggleVerificationCodeSendModal();
                    navigate(routes.verifyPhone,{credentials,profileDetails:EditProfileRef.current.getAllData()})
                }}
                phoneNumber={'6-007867687-78'}
            /> */}

        </MainWrapper>
    );
}

export default EditProfile;
