import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { AbsoluteWrapper, ChatBubbule, ComponentWrapper, IconWithText, ImageRound, ImageSqareRound, KeyboardAvoidingScrollView, MainWrapper, MediumText, RowWrapper, RowWrapperBasic, Spacer, TextInputChat, TinyTitle, Wrapper } from '../../../components';
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
    const { user, enquire } = route.params

    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <RowWrapperBasic>
                    <ImageRound
                        source={{ uri: user.image }}
                    />
                    <Spacer width={sizes.marginHorizontalSmall} />
                    <Wrapper>
                        <TinyTitle>{user.name}</TinyTitle>
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
                    <FlatList
                    showsVerticalScrollIndicator={false}
                          data={[...chatMessages,...chatMessages,...chatMessages]}
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
                        <Spacer height={sizes.smallMargin} />
                    </Wrapper>
                </MainWrapper>
            </KeyboardAvoidingView> 
            {/* <MainWrapper>
                <FlatList
                    data={[...chatMessages,...chatMessages,...chatMessages]}
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
                    ListFooterComponent={() => <Spacer height={sizes.doubleBaseMargin*2} />}

                />

                <KeyboardAvoidingView
                    style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
                    behavior="position"
                    keyboardVerticalOffset={Platform.OS == 'ios' ? height(12) : 0}
                >
                    <Wrapper>
                        <TextInputChat
                            onChangeText={text => { }}
                            onSend={() => { }}
                            onAdd={() => { }}
                        />
                        <Spacer height={sizes.smallMargin} />
                    </Wrapper>
                </KeyboardAvoidingView>
            </MainWrapper> */}
        </MainWrapper>
    );
}

export default ChatScreen;
