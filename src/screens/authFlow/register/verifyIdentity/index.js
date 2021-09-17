import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { ButtonColored, ButtonGradient, ComponentWrapper, IconButton, ImagePickerPopup, ImageProfile, LoaderAbsolute, MainWrapper, PopupPrimary, Spacer, TinyTitle, Toasts, Wrapper } from '../../../../components';
import * as ImagePicker from 'react-native-image-picker';
import { appStyles, asyncConts, Backend, colors, routes, sizes } from '../../../../services';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const options = {
    title: 'Select Photo',
    quality: 1,
    maxWidth: 500,
    maxHeight: 500,
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

function VerifyIdentity(props) {
    const { navigate } = props.navigation
    const { params } = props.route
    const { credentials, profileDetails, phoneNumber, countryPhoneCode, countryCode } = params
    console.log('credentials', credentials, '\nProfile Details', profileDetails, '\nphoneNumber: ', phoneNumber, '\ncountryPhoneCode: ', countryPhoneCode, '\ncountryCode: ', countryCode)

    //local states
    const [identityFile, setIdentityFile] = useState(null)
    const [isImagePickerPopupVisible, setImagePickerPopupVisibility] = useState(false);
    const [isIdentityVerifiedPopupVisible, setIdentityVerifiedPopupVisible] = useState(false)
    const [loadingCreateAccount, setLoadingCreateAccount] = useState(false)

    const toggleImagePickerPopup = () => setImagePickerPopupVisibility(!isImagePickerPopupVisible)
    const toggleIdentityVerifiedPopup = () => setIdentityVerifiedPopupVisible(!isIdentityVerifiedPopupVisible)



    const launchImagePicker = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setIdentityFile(tempFile)
            }
        });
    }
    const launchCamera = () => {

        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setIdentityFile(tempFile)
            }
        });
    }
    const checkCameraPermission = () => {
        check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        //console.log('The permission has not been requested / is denied but requestable');
                        requestCameraPermission()
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        //console.log('The permission is granted');
                        launchCamera()
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                // …
            });
    }
    const requestCameraPermission = () => {
        request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        //console.log('The permission has not been requested / is denied but requestable');
                        //requestCameraPermission()
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        //console.log('The permission is granted');
                        launchCamera()
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            });
    }
    const registerNewAccount = async () => {
        const { email, password } = credentials
        const {
            imageFile,
            firstName,
            lastName,
            userName,
            gender,
            birthday,
            // phoneNumber,
            // countryPhoneCode,
            // countryCode
        } = profileDetails
        console.log('profileDetails-->', profileDetails)
        let fcmToken = await AsyncStorage.getItem(asyncConts.fcm_token);
        console.log('fcmToken-->', fcmToken)
        setLoadingCreateAccount(true)
        await Backend.user_register({ email, password, password_confirmation: password })
            .then(async res => {
                if (res) {
                    const tempUserId = res.user.id
                    const completeProfileParams = {
                        user_id: tempUserId,
                        first_name: firstName,
                        last_name: lastName,
                        username: userName,
                        gender: gender,
                        //birthday: birthday,
                        birthday: moment(birthday).format('YYYY-MM-DD'),
                        phone: phoneNumber,
                        country_phone_code: countryPhoneCode,
                        country_code: countryCode,
                        image: imageFile

                    }
                    await Backend.complete_profile(completeProfileParams).
                        then(async res => {
                            if (res) {
                                await Backend.submit_identity({ user_id: tempUserId, attachment: identityFile }).
                                    then(res => {
                                        if (res) {
                                            toggleIdentityVerifiedPopup()
                                            // AsyncStorage.setItem(asyncConts.user_credentials, JSON.stringify(credentials))
                                            // Toasts.success('Account Created Successfully')
                                        }
                                    })
                            }
                        })
                }
            })
        setLoadingCreateAccount(false)
    }
    return (
        <MainWrapper>

            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <TinyTitle>Please upload the front side of your ID</TinyTitle>
                </ComponentWrapper>
                <Spacer height={sizes.smallMargin} />
                {
                    identityFile ?
                        // <ImageProfile
                        //     source={{ uri: imageFile.uri }}
                        //     onPressCamera={toggleImagePickerPopup}
                        // />
                        <Wrapper>
                            <Image
                                source={{ uri: identityFile.uri }}
                                style={{ marginHorizontal: sizes.marginHorizontal, borderRadius: sizes.cardRadius, height: height(25) }}
                            />
                            <Spacer height={sizes.baseMargin} />
                            <ButtonColored
                                text="Remove"
                                buttonColor={colors.error + '40'}
                                tintColor={colors.error}
                                onPress={() => setIdentityFile(null)}
                            />
                        </Wrapper>
                        :
                        // <IconButton
                        //     iconName="camera"
                        //     iconType="feather"
                        //     buttonSize={totalSize(20)}
                        //     iconSize={totalSize(4)}
                        //     buttonColor={colors.appBgColor2}
                        //     buttonStyle={{ borderRadius: 100 }}
                        //     iconColor={colors.appTextColor1}
                        //     onPress={toggleImagePickerPopup}
                        // />
                        <TouchableOpacity
                            onPress={toggleImagePickerPopup}
                            style={[appStyles.grayWrapper, appStyles.center, { height: height(25) }]}>
                            <Icon
                                name="camera"
                                type="feather"
                                color={colors.appTextColor1}
                                size={totalSize(3)}
                            />
                        </TouchableOpacity>
                }
            </Wrapper>
            {
                identityFile ?
                    <Wrapper>
                        <Spacer height={sizes.baseMargin} />
                        <ButtonGradient
                            text="Done"
                            onPress={registerNewAccount}
                        />
                        <Spacer height={sizes.baseMargin} />

                    </Wrapper> : null
            }
            <ImagePickerPopup
                visible={isImagePickerPopupVisible}
                toggle={toggleImagePickerPopup}
                onPressTakePhoto={launchCamera}
                onPressSelectFromGalary={launchImagePicker}
            />
            <PopupPrimary
                visible={isIdentityVerifiedPopupVisible}
                toggle={toggleIdentityVerifiedPopup}
                iconName="check"
                iconType="feather"
                title="Thank you for verifying your identity"
                info={"We'll let you know once your account has been verified by The Republic"}
                buttonText1="Continue"
                onPressButton1={() => { toggleIdentityVerifiedPopup(); navigate(routes.onBoarding) }}
            />
            <LoaderAbsolute
                isVisible={loadingCreateAccount}
                title="Creating Your Account"
                info="Please wait..."
            />
        </MainWrapper>
    );
}

export default VerifyIdentity;
