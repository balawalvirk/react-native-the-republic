import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, IconButton, Wrapper, Spacer, ImageProfile, RowWrapperBasic, RowWrapper, TextInputUnderlined, KeyboardAvoidingScrollView, ComponentWrapper, ButtonColored, PickerPrimary, IconWithText, EditProfileComp, ButtonGradient, PopupPrimary, MediumText, VerificationCodeSentPopup, Toasts } from '../../../components';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes, HelpingMethods, appIcons, routes, appImages, Backend } from '../../../services';
import { useSelector } from 'react-redux';
import moment from 'moment';


function EditProfile(props) {
    const { navigate, goBack } = props.navigation
    const { params } = props.route
    // const { credentials } = params
    const EditProfileRef = useRef(null)

    //redux states
    const user = useSelector(state => state.user)
    const { userDetail } = user
    const fullName = userDetail.first_name + ' ' + userDetail.last_name

    const profileData = {
        profileImage: userDetail.profile_image,
        firstName: userDetail.first_name,
        lastName: userDetail.last_name,
        userName: userDetail.username,
        gender: userDetail.gender,
        birthday: userDetail.birthday,
        countryCode: userDetail.country_code,
        countryPhoneCode: userDetail.country_phone_code,
        phoneNumber: userDetail.phone
    }


    //local states
    const [isLoading, setLoading] = useState(false)


    const handleSaveChanges = async() => {
        const profileDetails = EditProfileRef.current.getAllData()
        const isProfileDetailsValid = EditProfileRef.current.validate()
        const {
            imageFile,
            firstName,
            lastName,
            userName,
            gender,
            birthday,
            phoneNumber,
            countryPhoneCode,
            countryCode
        } = profileDetails
        console.log('Profile Data:   ', profileDetails)
        if (isProfileDetailsValid) {
            setLoading(true)
           await Backend.update_profile({
                image: imageFile,
                first_name: firstName,
                last_name: lastName,
                username: userName,
                gender: gender,
                birthday: birthday,
                //birthday: moment(birthday).format('YYYY-MM-DD'),
                phone: phoneNumber,
                country_phone_code: countryPhoneCode,
                country_code: countryCode,
            }).then(res => {
                if (res) {
                    Toasts.success('Profile updated successfuly')
                    goBack()
                }
            })
            setLoading(false)
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
                    loading={isLoading}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
        </MainWrapper>
    );
}

export default EditProfile;
