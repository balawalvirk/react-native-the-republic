import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Badge, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ComponentWrapper, MainWrapper, ButtonColoredSmall, ProfileTop, Spacer, ShareSomethingButton, Posts, RowWrapper, Wrapper, AbsoluteWrapper, SkeletonProductDetails } from '../../../components';
import { appStyles, Backend, colors, DummyData, routes, sizes } from '../../../services';

function GroupDetail(props) {
    //redux states
    const user = useSelector(state => state.user)
    const { userDetail } = user

    const { navigation, route } = props
    const { navigate, replace, setParams } = navigation
    const { group, groupId } = route.params
    const group_id = groupId ? groupId : group ? group.id : ''
    const isMyGroup = group.user_id === userDetail.id
    const isJoined = true
    const allPosts = DummyData.posts.slice(0, 2)

    //local states
    const [loading, setLoading] = useState(true)
    const [joinRequests, setJoinRequests] = useState([])


    //configure Header
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isMyGroup ? "Your Group" : "Group",
            headerRight: () => (
                <>
                    {
                        isMyGroup ?
                            <RowWrapper>
                                <TouchableOpacity
                                    onPress={() => navigate(routes.groupMemberRequests, { group_id })}
                                >
                                    <Icon
                                        name="users"
                                        type="feather"
                                        size={totalSize(2.5)}
                                        color={colors.appTextColor1}
                                    />
                                    {
                                        getPendingRequests().length ?
                                            <AbsoluteWrapper style={{ right: -7.5, top: -7.5 }}>
                                                <Badge
                                                    value={getPendingRequests().length}
                                                    status="error"
                                                />
                                            </AbsoluteWrapper>
                                            :
                                            null
                                    }

                                </TouchableOpacity>
                                <Spacer width={sizes.marginHorizontalLarge} />
                                <Icon
                                    name="settings"
                                    type="feather"
                                    size={totalSize(2.5)}
                                    color={colors.appTextColor1}
                                    onPress={() => navigate(routes.createGroup, { groupData: group })}
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
    }, [props, group]);

    useFocusEffect(
        React.useCallback(() => {
            getSetData()
        }, [])
    )


    const getSetData = async () => {
        await Backend.getGroupDetail(group_id).
            then(res => {
                if (res) {
                    setParams({ group: res.data })
                }
            })
        loading && setLoading(false)
    }

    const getPendingRequests = () => {
        let tempData = []
        if (group.group_requests) {
            if (group.group_requests.length) {
                tempData = group.group_requests.filter(item => item.status === 'pending')
            }
        }
        return tempData
    }

    if (loading) {
        return (
            <SkeletonProductDetails itemStyle={{ height: height(25) }} />
        )
    }
    return (
        <MainWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ProfileTop
                    imageUri={group.icon}
                    title={group.name}
                    //subTitle={group.users.length + ' members'}
                    subTitle={group.users.length + ' ' + 'member' + (group.users.length <= 1 ? '' : 's')}
                />
                <Spacer height={sizes.smallMargin} />
                <ShareSomethingButton
                    imageUri={userDetail.profile_image}
                    onPress={() => navigate(routes.shareApost,{group})}
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
