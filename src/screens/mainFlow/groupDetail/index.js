import React, { Component, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { ComponentWrapper, MainWrapper, ButtonColoredSmall, ProfileTop, Spacer, ShareSomethingButton, Posts } from '../../../components';
import { appStyles, colors, DummyData, sizes } from '../../../services';

function GroupDetail(props) {
    const { navigation, route } = props
    const { navigate } = navigation
    const { item } = route.params
    const isJoined = true
    const allPosts = DummyData.posts.slice(0, 2)
    //configure Header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ComponentWrapper>
                    <ButtonColoredSmall
                        text={isJoined ? "Joined" : "join"}
                        onPress={() => {
                        }}
                        buttonStyle={{ paddingHorizontal: sizes.marginHorizontal, paddingVertical: sizes.marginVertical / 2, backgroundColor: isJoined ? colors.appColor1 + '20' : colors.appColor1 }}
                        textStyle={[appStyles.textRegular, isJoined ? appStyles.textPrimaryColor : appStyles.textWhite]}
                    />
                </ComponentWrapper>
            )
        });
    }, [navigation]);

    return (
        <MainWrapper>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <ProfileTop
                imageUri={item.image}
                title={item.name}
                subTitle={'324 members'}
            />
            <Spacer height={sizes.smallMargin} />
            <ShareSomethingButton
                imageUri={DummyData.userData.image}
                onPress={() => { }}
            />
            <Spacer height={sizes.smallMargin} />
            <Posts
                data={allPosts}
            />
            </ScrollView>
        </MainWrapper>
    );
}

export default GroupDetail;
