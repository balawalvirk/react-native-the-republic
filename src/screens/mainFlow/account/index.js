import React, { Component, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { ComponentWrapper, MainWrapper, ButtonColoredSmall, ProfileTop, Spacer, ShareSomethingButton, Posts, Wrapper, ButtonGroupAnimated } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';
import More from './more';

const tabs = [
    {
        title: 'Posts',

    },
    {
        title: 'More'
    }
]


function Account(props) {
    const { navigation, route } = props
    const { navigate } = navigation
    const { userData } = dummyData
    const isJoined = true

    const allPosts = DummyData.posts.slice(0, 4)
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

    //local states
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    return (
        <MainWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ProfileTop
                    imageUri={userData.image}
                    title={userData.name}
                    subTitle={'@jackob443'}
                    content={
                        <Wrapper style={{ alignItems: 'flex-start', }}>
                            <Spacer height={sizes.smallMargin} />
                            <ButtonColoredSmall
                                text="Seller Dashboard"
                                iconName="chevron-right"
                                direction="row-reverse"
                                buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall }}
                                textStyle={[appStyles.textMedium, appStyles.textWhite]}
                                iconSize={totalSize(2.5)}
                            />
                        </Wrapper>
                    }
                />
                <ButtonGroupAnimated
                    data={tabs}
                    initalIndex={selectedTabIndex}
                    text='title'
                    onPressButton={(item, index) => setSelectedTabIndex(index)}
                    containerStyle={[{ backgroundColor: 'transparent', marginHorizontal: sizes.marginHorizontal }]}
                    inActiveButtonStyle={{ width: width(40), paddingVertical: height(1.75), backgroundColor: 'transparent', }}
                    activeButtonForceStyle={{ position: 'absolute', height: 4, bottom: 0, backgroundColor: colors.appColor1, borderRadius: 5, width: width(30), left: width(5) }}
                    // activeButtonContent={<Wrapper></Wrapper>}
                    activeTextStyle={[appStyles.textMedium, appStyles.textPrimaryColor]}
                    inActiveTextStyle={[appStyles.textMedium, appStyles.textLightGray]}
                />
                <Spacer height={sizes.smallMargin} />
                {
                    selectedTabIndex === 0 ?
                        <Wrapper flex={1}>
                            <ShareSomethingButton
                                imageUri={DummyData.userData.image}
                                onPress={() => navigate(routes.shareApost)}
                            />
                            <Spacer height={sizes.smallMargin} />
                            <Posts
                                data={allPosts}
                            />
                        </Wrapper>
                        :
                        <More
                            navigation={navigation}
                        />
                }
                <Spacer height={sizes.baseMargin} />
            </ScrollView>
        </MainWrapper>
    );
}

export default Account;
