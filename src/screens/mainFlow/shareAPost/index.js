import React, { Component, useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { ButtonColoredSmall, ComponentWrapper, ErrorText, IconButton, IconWithText, ImagePickerPopup, ImageRound, ImagesPrimary, KeyboardAvoidingScrollView, LineHorizontal, LoaderAbsolute, MainWrapper, RegularText, RenderTags, RowWrapper, Spacer, Toasts, Wrapper } from '../../../components';
import { appImages, appStyles, Backend, colors, fontFamily, fontSize, HelpingMethods, routes, sizes } from '../../../services';
import ImageCropPicker from 'react-native-image-crop-picker';
import ShareOnPopup from './shareOnPopup';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import { setMyGroups, setMyJoinedGroups } from '../../../services/store/actions';
import TagFriends from './tagFriends'

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
function ShareAPost({ navigation, route }) {
    //navigation props
    const { navigate, goBack } = navigation
    const group = route.params ? route.params.group ? route.params.group : null : null

    const product = route.params ? route.params.product ? route.params.product : null : null

    const updateData = route.params ? route.params.updateData ? route.params.updateData : null : null

    //redux states
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const { userDetail } = user

    //local states
    const [shareOn, setShareOn] = useState('On my profile')
    const [postText, setPostText] = useState('')
    const [postTextError, setPostTextError] = useState('')
    const [images, setImages] = useState([])
    const [friends, setFriends] = useState(null)
    const [tags, setTags] = useState([])
    const [groupId, setGroupId] = useState(null)
    const [productId, setProductId] = useState(null)
    const [loadingPost, setLoadingPost] = useState(false)
    const [shareOnPopupVisible, setShareOnPopupVisibility] = useState(false)
    const [isTagFriendsVisible, setTagFriendsVisibility] = useState(false)
    const [isImagePickerPopupVisible, setImagePickerPopupVisibility] = useState(false)

    const toggleShareOnPopup = () => setShareOnPopupVisibility(!shareOnPopupVisible)
    const toggleImagePickerPopup = () => setImagePickerPopupVisibility(!isImagePickerPopupVisible)
    const toggleTagFriends = () => setTagFriendsVisibility(!isTagFriendsVisible)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ComponentWrapper>
                    <ButtonColoredSmall
                        text="Post"
                        buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall }}
                        isLoading={loadingPost}
                        onPress={handleAddPost}
                    />
                </ComponentWrapper>
            )
        });
    }, [navigation, postText, postTextError, images, tags, friends, groupId, productId, loadingPost]);

    useEffect(() => {
        getSetInitialData()
        getSetFriends()
    }, [])
    const getSetFriends = () => {
        Backend.getFollowings().
            then(res => res && setFriends(res.data))
    }
    const onClickFriend = (item, index) => {
        let tempData = friends.slice()
        tempData[index] = {
            ...item,
            selected: item.selected ? false : true
        }
        //console.log('tempData[index]-->', tempData)
        setFriends(tempData)
    }
    const handleUntagFriend = (item, index) => {
        console.log('taggedFriend  --> ', item)

        let tempData = friends.slice()
        const tempObj = friends.find(friend => friend.id === item.id)
        console.log('tempObj  --> ', tempObj)
        if (tempObj) {
            const tempIndex = friends.indexOf(tempObj)
            console.log('tempIndex  --> ', tempIndex)
            if (tempIndex >= 0) {
                tempData[index] = {
                    ...item,
                    selected: false
                }
                HelpingMethods.handleAnimation()
                setFriends(tempData)
            }
        }
    }
    const getTaggedFriends = () => {
        let tempData = []
        if (friends) {
            if (friends.length) {
                tempData = friends.filter(item => item.selected)
            }
        }
        return tempData
    }
    const getSetInitialData = () => {
        group && [setGroupId(group.id), setShareOn(group.name)]
        product && [setProductId(product.id)]
    }
    const launchImagePicker = () => {
        ImageCropPicker.openPicker({
            quality: 9,
            compressImageMaxHeight: 700,
            compressImageMaxWidth: 800,
            cropping: false,
            multiple: true,
        }).then(response => {
            let tempArray = [];
            //this.setState({ ImageSource: response });
            let photos = []
            for (const item of response) {
                let pathParts = item.path.split('/');
                const tempObj = {
                    // ...item,
                    // uri: item.path
                    uri: item.path,
                    type: item.mime,
                    name: pathParts[pathParts.length - 1]
                }
                photos.push(tempObj);
            }
            setImages([...images, ...photos])
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
                setImages([...images, tempFile])
            }
        });
    }
    // const getSetTaggedFriends = (data) => {
    //     console.log('getSetTaggedFriends data-->', data)
    //     setTags(data)
    // }

    const getTaggedFriendsNameList = (data) => {
        const tempData = []
        if (getTaggedFriends()) {
            for (const item of getTaggedFriends()) {
                const name = item.first_name + ' ' + item.last_name
                const obj = {
                    ...item,
                    name
                }
                tempData.push(obj)
            }
        }
        return tempData
    }
    const getTaggedFriendsIds = (data) => {
        const tempData = []
        if (getTaggedFriends()) {
            for (const item of getTaggedFriends()) {
                tempData.push(item.id)
            }
        }
        return tempData
    }
    const validations = () => {
        HelpingMethods.handleAnimation()
        !postText ? setPostTextError('Please write something to post') : setPostTextError('')
        if (postText) {
            return true
        }
    }
    const handleAddPost = async () => {
        if (validations()) {
            setLoadingPost(true)
            await Backend.addPost({
                title: postText,
                images,
                tags: getTaggedFriendsIds(),
                group_id: groupId,
                product_id: productId
            }).then(res => {
                setLoadingPost(false)
                if (res) {
                    updateData&&updateData(res.post)
                    goBack()
                    Toasts.success('Your post has been shared')
                }
            })
        }
    }

    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <RowWrapper style={{ alignItems: 'flex-start', }}>
                    <ImageRound
                        source={{ uri: userDetail.profile_image ? userDetail.profile_image : appImages.noUser }}
                    />
                    <Wrapper flex={1} style={{ alignItems: 'flex-end', }}>
                        <ButtonColoredSmall
                            text={"Share: " + shareOn}
                            buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, backgroundColor: colors.appBgColor3 }}
                            textStyle={[appStyles.textRegular, appStyles.textPrimaryColor]}
                            iconColor={colors.appColor1}
                            iconName="caret-down"
                            iconType="ionicon"
                            direction="row-reverse"
                            iconSize={totalSize(1.5)}
                            onPress={toggleShareOnPopup}
                        />
                    </Wrapper>
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <ErrorText
                        text={postTextError}
                    />
                    <TextInput
                        value={postText}
                        onChangeText={text => setPostText(text)}
                        placeholder="Write something.."
                        placeholderTextColor={colors.appTextColor5}
                        multiline
                        style={[appStyles.h5, { fontFamily: fontFamily.appTextRegular, height: height(20) }]}
                    />

                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <IconWithText
                        // onPress={() => navigate(routes.tagFriends, { getSetTaggedFriends: (data) => getSetTaggedFriends(data) })}
                        onPress={toggleTagFriends}
                        icon={
                            <IconButton
                                disabled
                                iconName="users"
                                iconType="feather"
                                buttonColor={colors.appColor1 + '20'}
                                iconSize={totalSize(1.75)}
                                buttonSize={totalSize(3.25)}
                            />
                        }
                        text="Tag Friends"
                        textStyle={[appStyles.textMedium, appStyles.fontBold]}
                    />
                    {
                        getTaggedFriends().length ?
                            <>
                                <Spacer height={sizes.smallMargin} />
                                <RenderTags
                                    ContainerStyle={{ flexWrap: 'wrap', }}
                                    tags={getTaggedFriendsNameList()}
                                    value='name'
                                    tagStyle={{ backgroundColor: colors.appColor2 + '20', marginBottom: sizes.TinyMargin }}
                                    TextStyle={[appStyles.textRegular, { color: colors.appColor1 }]}
                                    onPressCross={handleUntagFriend}
                                />
                            </>
                            :
                            null
                    }
                    <Spacer height={sizes.smallMargin} />
                    <LineHorizontal />
                </ComponentWrapper>
                <Spacer height={sizes.smallMargin} />
                <ImagesPrimary
                    images={images}
                    onPressAdd={toggleImagePickerPopup}
                    onPressCross={(item, index) => {
                        console.log('image index', index)
                        let newImages = []
                        newImages = images.filter(ite => ite != item)
                        setImages(newImages)
                    }}
                />
            </KeyboardAvoidingScrollView>
            <ShareOnPopup
                visible={shareOnPopupVisible}
                toggle={toggleShareOnPopup}
                onPressItem={(item, index) => {
                    console.log('item-->', item)
                    setShareOn(item.title)
                    setGroupId(item.id)
                }}
                selectedGroupId={groupId}
            />
            <ImagePickerPopup
                visible={isImagePickerPopupVisible}
                toggle={toggleImagePickerPopup}
                onPressTakePhoto={launchCamera}
                onPressSelectFromGalary={launchImagePicker}
            />
            <TagFriends
                visible={isTagFriendsVisible}
                toggle={toggleTagFriends}
                //getSetTaggedFriends={(data) => getSetTaggedFriends(data)}
                friends={friends}
                onPressFriend={onClickFriend}
            />
            <LoaderAbsolute
                isVisible={loadingPost}
                title={'Sharing Your Post'}
                info="Please wait..."
            />
        </MainWrapper>
    );
}

export default ShareAPost;
