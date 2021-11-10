import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import { ButtonGradient, ErrorText, IconButton, ImagePickerPopup, ImageProfile, KeyboardAvoidingScrollView, MainWrapper, MediumText, PopupPrimary, RegularText, RowWrapperBasic, Spacer, TextInputUnderlined, Wrapper } from '../../../components';
import { appStyles, Backend, colors, DummyData, groupJoinPrivacies, HelpingMethods, routes, sizes } from '../../../services';
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

    //local states
    const [imageUri, setImageUri] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [imageFileError, setImageFileError] = useState('')
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [groupJoinPrivacy, setGroupJoinPrivacy] = useState(groupJoinPrivacies.everyone)
    const [groupPostPrivacy, setGroupPostPrivacy] = useState(groupJoinPrivacies.everyone)
    const [newlyCreateGroup, setNewlyCreateGroup] = useState(null)
    const [loading, setLoading] = useState(false)

    const [isImagePickerPopupVisible, setImagePickerPopupVisibility] = useState(false);
    const [isGroupCreatedPopupVisible, setGroupCreatedPopupVisible] = useState(false)
    const [isGroupUpdatedPopupVisible, setGroupUpdatedPopupVisible] = useState(false)

    useEffect(() => {
        getSetGroupData()
    }, [navigation])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: groupData ? "Group Settings" : "Create Group",
        });
    }, [navigation]);



    const toggleImagePickerPopup = () => setImagePickerPopupVisibility(!isImagePickerPopupVisible)
    const toggleGroupCreatedPopup = () => setGroupCreatedPopupVisible(!isGroupCreatedPopupVisible)
    const toggleGroupUpdatedPopup = () => setGroupUpdatedPopupVisible(!isGroupUpdatedPopupVisible)

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
                imageFileError && [HelpingMethods.handleAnimation(), setImageFileError('')]
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
                imageFileError && [HelpingMethods.handleAnimation(), setImageFileError('')]

            }
        });
    }
    const getSetGroupData = () => {
        if (groupData) {
            const { icon, name, description, join_privacy, post_privacy } = groupData
            setImageUri(icon)
            setName(name)
            setDescription(description)
            setGroupJoinPrivacy(join_privacy)
            setGroupPostPrivacy(post_privacy)
        }
    }

    const validations = () => {
        HelpingMethods.handleAnimation()
        !imageFile && !imageUri ? setImageFileError('Please add icon/logo.') : setImageFileError('')
        !name ? setNameError('Please add name.') : setNameError('')
        !description ? setDescriptionError('Please add description.') : setDescriptionError('')
        if ((imageFile || imageUri) && name && description) {
            return true
        }
    }
    const handleCreateGroup = async () => {
        if (validations()) {
            setLoading(true)
            const groupDetails = {
                name,
                description,
                join_privacy: groupJoinPrivacy,
                post_privacy: groupPostPrivacy,
                image: imageFile,
            }
            console.log('groupDetails-->', groupDetails)
            await Backend.createGroup(groupDetails).
                then(res => {
                    if (res) {
                        toggleGroupCreatedPopup()
                    }
                })
            setLoading(false)
        }
    }

    const handleUpdateGroup = async () => {
        if (validations()) {
            setLoading(true)
            const groupDetails = {
                group_id: groupData.id,
                name,
                description,
                join_privacy: groupJoinPrivacy,
                post_privacy: groupPostPrivacy,
                image: imageFile,
            }
            console.log('groupDetails-->', groupDetails)
            await Backend.editGroup(groupDetails).
                then(res => {
                    if (res) {
                        toggleGroupUpdatedPopup()
                    }
                })
            setLoading(false)
        }
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
                    <ErrorText
                        text={imageFileError}
                    />
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Group Name"
                    value={name}
                    onChangeText={(text) => {
                        nameError && [HelpingMethods.handleAnimation(), setNameError('')]
                        setName(text)
                    }}
                    error={nameError}
                />
                <Spacer height={sizes.baseMargin * 2} />
                <TextInputUnderlined
                    titleStatic="Group Description"
                    value={description}
                    onChangeText={(text) => {
                        descriptionError && [HelpingMethods.handleAnimation(), setDescriptionError('')]
                        setDescription(text)
                    }}
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
                    onPress={() => navigate(routes.groupPrivacySettings, {
                        groupJoinPrivacy,
                        groupPostPrivacy,
                        handleSetGroupJoinPrivacy: (value) => setGroupJoinPrivacy(value),
                        handleSetGroupPostPrivacy: (value) => setGroupPostPrivacy(value),
                    })}
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
                        groupData ? handleUpdateGroup() : handleCreateGroup()
                    }}
                    loading={loading}
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
                disableSwipe
                disableBackDropPress
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
            <PopupPrimary
                visible={isGroupUpdatedPopupVisible}
                toggle={toggleGroupUpdatedPopup}
                disableSwipe
                disableBackDropPress
                iconName="check-circle"
                iconType="feather"
                title="Group Updated"
                info={"You can see your group in the community section and start posting in it."}
                buttonText1="Continue"
                onPressButton1={() => {
                    toggleGroupUpdatedPopup();
                    goBack()
                }}
                topMargin={height(60)}
            />
        </MainWrapper>
    );
}

export default CreateGroup;
