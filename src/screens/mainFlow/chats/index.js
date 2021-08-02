import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { LineHorizontal, MainWrapper, MessageCardPrimary, SearchTextinput, Spacer, Wrapper } from '../../../components';
import { DummyData, routes, sizes } from '../../../services';

function Chats(props) {
    const { navigation } = props
    const { navigate } = navigation
    const chats = [...DummyData.conversations, ...DummyData.conversations, ...DummyData.conversations]
    return (
        <MainWrapper>
            <FlatList
                data={chats}
                key={'key'}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => {
                    return (
                        <Wrapper style={{}}>
                            <Spacer height={sizes.baseMargin} />
                            <SearchTextinput
                                placeholder="Search messages"
                                value={''}
                                onChangeText={t => { }}
                            />
                            <Spacer height={sizes.baseMargin} />
                            <LineHorizontal />
                        </Wrapper>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <MessageCardPrimary
                            containerStyle={{}}
                            name={item.user.name}
                            image={item.user.image}
                            message={item.message}
                            time={item.time}
                            onPress={() => navigate(routes.chatScreen, { user: item.user })}
                        />
                    )
                }}
            />
        </MainWrapper>
    );
}

export default Chats;
