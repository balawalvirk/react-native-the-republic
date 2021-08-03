import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { ButtonColored, ButtonGradient, ComponentWrapper, IconButton, ImagePickerPopup, ImageProfile, MainWrapper, PopupPrimary, Spacer, TinyTitle, Wrapper } from '../../../../components';
import * as ImagePicker from 'react-native-image-picker';
import { appStyles, colors, routes, sizes } from '../../../../services';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
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
    const [imageUri, setImageUri] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [isImagePickerPopupVisible, setImagePickerPopupVisibility] = useState(false);
    const [isIdentityVerifiedPopupVisible, setIdentityVerifiedPopupVisible] = useState(false)

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
                setImageFile(tempFile)
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
                setImageFile(tempFile)
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
    return (
        <MainWrapper>

            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <TinyTitle>Please upload the front side of your ID</TinyTitle>
                </ComponentWrapper>
                <Spacer height={sizes.smallMargin} />
                {
                    imageFile ?
                        // <ImageProfile
                        //     source={{ uri: imageFile.uri }}
                        //     onPressCamera={toggleImagePickerPopup}
                        // />
                        <Wrapper>
                            <Image
                                source={{ uri: imageFile.uri }}
                                style={{ marginHorizontal: sizes.marginHorizontal, borderRadius: sizes.cardRadius, height: height(25) }}
                            />
                            <Spacer height={sizes.baseMargin} />
                            <ButtonColored
                                text="Remove"
                                buttonColor={colors.error+'40'}
                                tintColor={colors.error}
                                onPress={()=>setImageFile(null)}
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
                imageFile ?
                    <Wrapper>
                        <Spacer height={sizes.baseMargin} />
                        <ButtonGradient
                            text="Done"
                            onPress={toggleIdentityVerifiedPopup}
                        />
                        <Spacer height={sizes.baseMargin} />

                    </Wrapper> : null
            }
            <ImagePickerPopup
                visible={isImagePickerPopupVisible}
                toggle={toggleImagePickerPopup}
                onPressTakePhoto={checkCameraPermission}
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
        </MainWrapper>
    );
}

export default VerifyIdentity;
