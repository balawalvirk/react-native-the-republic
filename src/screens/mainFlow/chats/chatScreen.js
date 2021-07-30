import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { ChatBubbule, ComponentWrapper, IconWithText, ImageRound, KeyboardAvoidingScrollView, MainWrapper, RowWrapper, RowWrapperBasic, Spacer, TextInputChat, TinyTitle, Wrapper } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';
const myId = 1
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
    const { item } = route.params

    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <RowWrapperBasic>
                    <ImageRound
                        source={{ uri: item.user.image }}
                    />
                    <Spacer width={sizes.marginHorizontalSmall} />
                    <Wrapper>
                        <TinyTitle>{item.user.name}</TinyTitle>
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
    }, [navigation]);
    return (
        <MainWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'ios' ? height(15) : 0}
                enabled={Platform.OS === 'ios' ? true : false}>
                <MainWrapper>
                    <FlatList
                        data={chatMessages}
                        ListHeaderComponent={() => <Spacer height={sizes.smallMargin} />}
                        renderItem={({ item, index }) => {
                            return (
                                <ChatBubbule
                                    message={item.message}
                                    time={item.time}
                                    myMessage={item.user.id === myId}
                                />
                            );
                        }}
                    />
                    <Wrapper>
                        <TextInputChat
                            onChangeText={text => { }}
                            onSend={() => { }}
                            onAdd={() => { }}
                        />
                        <Spacer height={sizes.baseMargin} />
                    </Wrapper>
                </MainWrapper>
            </KeyboardAvoidingView>
        </MainWrapper>
    );
}

export default ChatScreen;
