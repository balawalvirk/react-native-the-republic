import React, { Component, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { AbsoluteWrapper, ChatBubbule, ComponentWrapper, IconWithText, ImagePickerPopup, ImageRound, ImageSqareRound, KeyboardAvoidingScrollView, LoaderPrimary, MainWrapper, MediumText, NoDataViewPrimary, RowWrapper, RowWrapperBasic, Spacer, TextInputChat, TinyTitle, Wrapper } from '../../../components';
import { appImages, appStyles, Backend, colors, HelpingMethods, sizes } from '../../../services';
import * as ImagePicker from 'react-native-image-picker';
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
const chatMessages = [
    {
        id: 56,
        message: 'Hello',
        time: '10:50 pm',
        user: {
            id: 2,
        },
    },
    {
        id: 67,
        message: 'Hello',
        time: '10:51 pm',
        user: {
            id: 1,
        },
    },
    {
        id: 89,
        message: 'How are you?',
        time: '10:55 pm',
        user: {
            id: 2,
        },
    },
    {
        id: 15,
        message: "I'm good, how are you?",
        time: '10:57 pm',
        user: {
            id: 1,
        },
    },
    {
        id: 45,
        message: 'When you will be available?',
        time: '10:59 pm',
        user: {
            id: 1,
        },
    },
]

function ChatScreen(props) {

    const { navigation, route } = props
    const { navigate } = navigation
    const { conversation, enquire, user, userId } = route.params
    const receiver_id = userId ? userId : conversation ? conversation.id : user ? user.id : ''

    //refs
    const messagesList = useRef(null)

    //redux States
    const userData = useSelector(state => state.user)
    const { userDetail } = userData
    const myId = userDetail.id
    //local states
    const [messages, setMessages] = useState(null)
    const [userDetails, setUserDetails] = useState(null)
    const [messageText, setMessageText] = useState('')
    const [messageImage, setMessageImage] = useState(null)
    const [isImagePickerPopupVisible, setImagePickerPopupVisibility] = useState(false)
    const [loadingSendMessage, setLoadingSendMessage] = useState(false)

    const toggleImagePickerPopup = () => setImagePickerPopupVisibility(!isImagePickerPopupVisible)
    //const sortedMessages = messages ? messages.slice().reverse() : []

    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <RowWrapperBasic>
                    <ImageRound
                        source={{ uri: userDetails ? userDetails.profile_image ? userDetails.profile_image : appImages.noUser : appImages.noUser }}
                    />
                    <Spacer width={sizes.marginHorizontalSmall} />
                    <Wrapper>
                        <TinyTitle>{userDetails ? (userDetails.first_name + ' ' + userDetails.last_name) : ' '}</TinyTitle>
                        <Spacer height={sizes.TinyMargin} />
                        <IconWithText
                            iconName="circle"
                            text="Active Now"
                            tintColor={colors.success}
                            iconSize={totalSize(1.75)}
                            textStyle={[appStyles.textRegular, appStyles.textLightGray]}
                        />
                    </Wrapper>
                </RowWrapperBasic>
            )
        });
    }, [navigation, userDetails]);

    // useEffect(() => {
    //     getSetInitialData()
    // }, [])
    useEffect(() => {
        getSetInitialData()
         const interval = setInterval(() => {
             getChatMessages()
         }, 10000);
         return () => clearInterval(interval);
    }, [])

    const getSetInitialData = () => {
        if (conversation) {
            setMessages(conversation.messages.reverse())
            setUserDetails(conversation)
        }
        if (user || userId) {
            if (user) {
                setUserDetails(user)
            } else {
                getUserProfile()
            }
            getChatMessages()
        }
    }
    const getChatMessages = async () => {
        await Backend.getChatMessages(receiver_id).
            then(res => {
                if (res) {
                    let tempData = []
                    if (tempData) {
                        tempData = res.data
                    }
                    setMessages(tempData)
                }
            })
    }
    const getUserProfile = async () => {
        await Backend.getUserProfileDetail(receiver_id).
            then(res => {
                if (res) {
                    setUserDetails(res.data)
                }
            })
    }

    const sendChatMessage = async () => {
        if (messageText || messageImage) {
            setLoadingSendMessage(true)
            let newMessageObj = {
                sender_id: myId,
                receiver_id,
                message: messageText,
                created_at: new Date()
            }
            messageImage && [newMessageObj['image'] = messageImage.uri]
            const tempNewMessages = [...messages, newMessageObj]
            setMessages(tempNewMessages)
            const sendMessageObj = {
                receiver_id,
                message: messageText,
                image: messageImage
            }
            setMessageText('')
            setMessageImage(null)
            await Backend.sendChatMessage(sendMessageObj).
                then(res => {
                    if (res) {
                        let tempData = tempNewMessages
                        tempData[(tempData.length-1)] = res.data
                        setMessages(tempData)
                        setLoadingSendMessage(false)
                    }
                })

            // setTimeout(() => {
            //     const data = {
            //         sender_id: myId,
            //         receiver_id,
            //         message: messageText,
            //         image: messageImage
            //     }
            //     let tempData = tempNewMessages
            //     tempData[0] = data
            //     setMessages(tempData)
            //     setLoadingSendMessage(false)
            // }, 2000);
        }
    }
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
                setMessageImage(tempFile)
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
                setMessageImage(tempFile)
            }
        });
    }
    if (!messages) {
        return (
            <LoaderPrimary
            />
        )
    }
    return (
        <MainWrapper>
            {
                enquire ?
                    <Wrapper style={[{ backgroundColor: colors.error, flexDirection: 'row', alignItems: 'center', paddingVertical: sizes.marginVertical / 2, paddingHorizontal: sizes.marginHorizontalSmall }]}>
                        <Wrapper style={{ backgroundColor: colors.appBgColor1, borderRadius: sizes.smallRadius }}>
                            <ImageSqareRound
                                source={{ uri: enquire.image }}
                                style={{ borderRadius: sizes.smallRadius }}
                                resizeMode="contain"
                            />
                        </Wrapper>
                        <Spacer width={sizes.smallMargin} />
                        <Wrapper flex={1}>
                            <MediumText numberOfLines={2} style={[appStyles.textWhite]}>{enquire.description}</MediumText>
                        </Wrapper>
                    </Wrapper>
                    :
                    null
            }
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'ios' ? height(12) : 0}
                enabled={Platform.OS === 'ios' ? true : false}>
                <MainWrapper>
                    {
                        messages.length ?
                            <FlatList
                                ref={messagesList}
                                showsVerticalScrollIndicator={false}
                                onContentSizeChange={() => messagesList.current.scrollToEnd({ animated: true })}
                                data={messages}
                                keyExtractor={(item, index) => index.toString()}
                                ListHeaderComponent={() => <Spacer height={sizes.smallMargin} />}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ChatBubbule
                                            key={(index + 1).toString()}
                                            message={item.message}
                                            time={HelpingMethods.formateDateFromNow(item.created_at)}
                                            myMessage={item.sender_id == myId}
                                            image={item.image}
                                            loadingSendMessage={(index === (messages.length - 1)) && loadingSendMessage}
                                        />
                                    );
                                }}
                            />
                            :
                            <NoDataViewPrimary
                                title="Chat"
                            />

                    }

                    <Wrapper>
                        <TextInputChat
                            value={messageText}
                            onChangeText={text => setMessageText(text)}
                            onSend={sendChatMessage}
                            onAdd={toggleImagePickerPopup}
                            image={messageImage}

                        />
                        <Spacer height={sizes.smallMargin} />
                    </Wrapper>
                </MainWrapper>
            </KeyboardAvoidingView>

            <ImagePickerPopup
                visible={isImagePickerPopupVisible}
                toggle={toggleImagePickerPopup}
                onPressTakePhoto={launchCamera}
                onPressSelectFromGalary={launchImagePicker}
            />
        </MainWrapper>
    );
}

export default ChatScreen;
