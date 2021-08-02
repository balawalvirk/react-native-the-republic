import React, { Component, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { ButtonColoredSmall, ComponentWrapper, IconButton, IconWithText, ImageRound, ImagesPrimary, KeyboardAvoidingScrollView, LineHorizontal, MainWrapper, RegularText, RowWrapper, Spacer, Wrapper } from '../../../components';
import { appImages, appStyles, colors, fontFamily, fontSize, routes, sizes } from '../../../services';
import ImageCropPicker from 'react-native-image-crop-picker';
import ShareOnPopup from './shareOnPopup';

function ShareAPost(props) {
    const { navigation } = props
    const { navigate } = navigation
    const [shareOn, setShareOn] = useState('On my profile')
    const [postText, setPostText] = useState('')
    const [images, setImages] = useState([])
    const [shareOnPopupVisible, setShareOnPopupVisibility] = useState(false)

    const toggleShareOnPopup = () => setShareOnPopupVisibility(!shareOnPopupVisible)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ComponentWrapper>
                    <ButtonColoredSmall
                        text="Post"
                        buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall }}
                    />
                </ComponentWrapper>
            )
        });
    }, [navigation]);

    const takePics = () => {
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
                const tempObj = {
                    ...item,
                    uri: item.path
                }
                photos.push(tempObj);
            }
            setImages([...images, ...photos])
        });
    }
    const getSetTaggedFriends = (data) => {
        console.log('data-->', data)
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <RowWrapper style={{ alignItems: 'flex-start', }}>
                    <ImageRound
                        source={{ uri: appImages.user3 }}
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
                        onPress={() => navigate(routes.tagFriends, { getSetTaggedFriends: (data) => getSetTaggedFriends(data) })}
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
                    <Spacer height={sizes.smallMargin} />
                    <LineHorizontal />
                </ComponentWrapper>
                <Spacer height={sizes.smallMargin} />
                <ImagesPrimary
                    images={images}
                    onPressAdd={takePics}
                    onPressCross={(item, index) => {
                        console.log('image index', index)
                        let newImages = []
                        newImages = images.filter(ite => ite != item)
                        //newImages.splice(index, 1)
                        setImages(newImages)
                    }}
                />
            </KeyboardAvoidingScrollView>
            <ShareOnPopup
                visible={shareOnPopupVisible}
                toggle={toggleShareOnPopup}
                onPressItem={(item) => {
                    console.log('item-->', item)
                    setShareOn(item.title)

                }}
            />
        </MainWrapper>
    );
}

export default ShareAPost;
