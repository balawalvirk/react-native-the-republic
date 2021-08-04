import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import { ButtonGradient, IconButton, ImagePickerPopup, ImageProfile, KeyboardAvoidingScrollView, MainWrapper, MediumText, PopupPrimary, RegularText, RowWrapperBasic, Spacer, TextInputUnderlined, Wrapper } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';
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

function CreateGroup(props) {
    const { navigation, route } = props
    const { navigate, replace, goBack } = navigation
    const groupData = route.params ? route.params.groupData ? route.params.groupData : null : null

    const [imageUri, setImageUri] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageFileError, setImageFileError] = useState(null)
    const [nameError, setNameError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [isImagePickerPopupVisible, setImagePickerPopupVisibility] = useState(false);
    const [isGroupCreatedPopupVisible, setGroupCreatedPopupVisible] = useState(false)

    useEffect(() => {
        getSetData()
    }, [navigation])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: groupData ? "Group Settings" : "Create Group",
        });
    }, [navigation]);

    const getSetData = () => {
        if (groupData) {
            setImageUri(groupData.image),
                setName(groupData.name),
                setDescription('Some dummy details and description about this group, lermipsum')
        }
    }

    const toggleImagePickerPopup = () => setImagePickerPopupVisibility(!isImagePickerPopupVisible)
    const toggleGroupCreatedPopup = () => setGroupCreatedPopupVisible(!isGroupCreatedPopupVisible)

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
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <Wrapper style={[appStyles.center]}>
                    {
                        imageFile || imageUri ?
                            <ImageProfile
                                source={{ uri: imageFile ? imageFile.uri : imageUri }}
                                onPressCamera={toggleImagePickerPopup}
                            //imageStyle={{ height: totalSize(10), width: totalSize(10) }}

                            />
                            :
                            <IconButton
                                iconName="camera"
                                iconType="feather"
                                buttonSize={totalSize(20)}
                                iconSize={totalSize(4)}
                                buttonColor={colors.appBgColor2}
                                buttonStyle={{ borderRadius: 100 }}
                                iconColor={colors.appTextColor1}
                                onPress={toggleImagePickerPopup}
                            />
                    }
                    <Spacer height={sizes.baseMargin} />
                    <RegularText style={[appStyles.textPrimaryColor]}>Tap here to add Group Icon/Logo</RegularText>

                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Group Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    error={nameError}
                />
                <Spacer height={sizes.baseMargin * 2} />
                <TextInputUnderlined
                    titleStatic="Group Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    error={descriptionError}
                    multiline
                    inputStyle={{
                        marginTop: sizes.smallMargin,
                        height: height(12.5),
                        textAlignVertical: 'top'
                    }}
                />
                <Spacer height={sizes.baseMargin} />
                <TouchableOpacity
                    onPress={() => navigate(routes.groupPrivacySettings)}
                    style={[appStyles.borderedWrapper, { paddingVertical: sizes.marginVertical }]}>
                    <RowWrapperBasic>
                        <Wrapper flex={1}>
                            <MediumText>Privacy Settings</MediumText>
                        </Wrapper>
                        <Icon
                            name="chevron-right"
                            type="feather"
                            size={totalSize(2)}
                            color={colors.appTextColor4}
                        />
                    </RowWrapperBasic>
                </TouchableOpacity>
                <Spacer height={sizes.doubleBaseMargin} />
                <ButtonGradient
                    text={groupData ? "Update Group Settings" : "Create Group"}
                    onPress={() => {
                        groupData ? goBack() : toggleGroupCreatedPopup()
                    }}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
            <ImagePickerPopup
                visible={isImagePickerPopupVisible}
                toggle={toggleImagePickerPopup}
                onPressTakePhoto={launchCamera}
                onPressSelectFromGalary={launchImagePicker}
            />
            <PopupPrimary
                visible={isGroupCreatedPopupVisible}
                toggle={toggleGroupCreatedPopup}
                iconName="check"
                iconType="feather"
                title="Group Created"
                info={"You can see your group in the community section and start posting in it."}
                buttonText1="Continue"
                onPressButton1={() => {
                    toggleGroupCreatedPopup();
                    replace(routes.groupDetail, { item: DummyData.groups[1], myGroup: true })
                }}
                topMargin={height(60)}
            />
        </MainWrapper>
    );
}

export default CreateGroup;
