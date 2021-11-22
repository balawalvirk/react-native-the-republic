import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { height } from 'react-native-dimension';
import { LineHorizontal, MainWrapper, MessageCardPrimary, NoDataViewPrimary, SearchTextinput, SkeletonPrimary, Spacer, UserSkeletons, Wrapper } from '../../../components';
import { Backend, DummyData, HelpingMethods, routes, sizes } from '../../../services';

function Chats(props) {
    const { navigation } = props
    const { navigate } = navigation
    const chats = [...DummyData.conversations, ...DummyData.conversations, ...DummyData.conversations]

    //local states
    const [conversations, setConversations] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')


    useFocusEffect(
        React.useCallback(() => {
            getAllConversations()
        }, [])
    )
    const getAllConversations = async () => {
        await Backend.getAllConversations().
            then(res => {
                if (res) {
                    let tempData = []
                    if (res.data.length) {
                         tempData = removeDuplications(res.data)
                    }
                    setConversations(tempData)
                }
            })
    }
    const removeDuplications = (data) => {

        let tempData = data.filter((ele, ind) => ind === data.findIndex(elem => elem.id === ele.id))

        return tempData

    }
    const getFilteredConversations = () => {
        let tempData = []
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            tempData = conversations.filter((item => {
                const fullName = (item.first_name + ' ' + item.last_name).toLowerCase()
                return (
                    fullName.includes(query)
                )
            }))
        } else {
            tempData = conversations
        }
        return tempData
    }

    const filteredConversations = getFilteredConversations()

    if (!conversations) {
        return (
            <MainWrapper>
                <Spacer height={sizes.baseMargin} />
                <SkeletonPrimary itemStyle={{ height: height(6) }} />
                <UserSkeletons NumOfItems={10} />
            </MainWrapper>
        )
    }
    return (
        <MainWrapper>
            {
                conversations.length ?
                    <Wrapper flex={1}>
                        <Wrapper style={{}}>
                            <Spacer height={sizes.baseMargin} />
                            <SearchTextinput
                                placeholder="Search messages"
                                value={searchQuery}
                                onChangeText={t => setSearchQuery(t)}
                            />
                            <Spacer height={sizes.baseMargin} />
                            <LineHorizontal />
                        </Wrapper>
                        {
                            filteredConversations.length ?
                                <FlatList
                                    data={filteredConversations}
                                    key={'key'}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        const fullname = item.first_name + ' ' + item.last_name
                                        const lastMessage = item.messages ? item.messages.length ? item.messages[0].message : '' : ''
                                        const lastMessageTime = item.messages ? item.messages.length ? item.messages[0].created_at : '' : item.created_at
                                        return (
                                            <MessageCardPrimary
                                                containerStyle={{}}
                                                name={fullname}
                                                image={item.profile_image}
                                                message={lastMessage}
                                                time={HelpingMethods.formateDateFromNow(lastMessageTime)}
                                                onPress={() => navigate(routes.chatScreen, { conversation: item })}
                                            />
                                        )
                                    }}
                                />
                                :
                                <NoDataViewPrimary
                                    title="Results"
                                />
                        }

                    </Wrapper>
                    :
                    <NoDataViewPrimary
                        showIcon
                        title="Messages"
                        iconName="md-chatbubbles-outline"
                        iconType="ionicon"
                    />
            }
        </MainWrapper>
    );
}

export default Chats;
