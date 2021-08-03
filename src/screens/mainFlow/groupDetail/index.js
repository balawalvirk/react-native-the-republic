import React, { Component, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Badge, Icon } from 'react-native-elements';
import { ComponentWrapper, MainWrapper, ButtonColoredSmall, ProfileTop, Spacer, ShareSomethingButton, Posts, RowWrapper, Wrapper, AbsoluteWrapper } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';

function GroupDetail(props) {
    const { navigation, route } = props
    const { navigate,replace } = navigation
    const { item, myGroup } = route.params
    const isJoined = true
    const allPosts = DummyData.posts.slice(0, 2)
    //configure Header
    useLayoutEffect(() => {
        navigation.setOptions({
            title: myGroup ? "Your Group" : "Group",
            headerRight: () => (
                <>
                    {
                        myGroup ?
                            <RowWrapper>
                                <TouchableOpacity
                                onPress={()=>navigate(routes.groupMemberRequests)}
                                >
                                    <Icon
                                        name="users"
                                        type="feather"
                                        size={totalSize(2.5)}
                                        color={colors.appTextColor1}
                                    />
                                    <AbsoluteWrapper style={{ right: -7.5, top: -7.5 }}>
                                        <Badge
                                            value={'21'}
                                            status="error"
                                        />
                                    </AbsoluteWrapper>
                                </TouchableOpacity>
                                <Spacer width={sizes.marginHorizontalLarge} />
                                <Icon
                                    name="settings"
                                    type="feather"
                                    size={totalSize(2.5)}
                                    color={colors.appTextColor1}
                                    onPress={()=>navigate(routes.createGroup,{groupData:item})}
                                />
                            </RowWrapper>
                            :
                            <ComponentWrapper>
                                <ButtonColoredSmall
                                    text={isJoined ? "Joined" : "join"}
                                    onPress={() => {
                                    }}
                                    buttonStyle={{ paddingHorizontal: sizes.marginHorizontal, paddingVertical: sizes.marginVertical / 2, backgroundColor: isJoined ? colors.appColor1 + '20' : colors.appColor1 }}
                                    textStyle={[appStyles.textRegular, isJoined ? appStyles.textPrimaryColor : appStyles.textWhite]}
                                />
                            </ComponentWrapper>
                    }
                </>
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
