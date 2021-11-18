import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Badge, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ComponentWrapper, MainWrapper, ButtonColoredSmall, ProfileTop, Spacer, ShareSomethingButton, Posts, RowWrapper, Wrapper, AbsoluteWrapper, SkeletonProductDetails } from '../../../components';
import { appStyles, Backend, colors, DummyData, HelpingMethods, routes, sizes } from '../../../services';
import { setMyGroups } from '../../../services/store/actions';

function GroupDetail(props) {
    //redux states
    const user = useSelector(state => state.user)
    const { userDetail } = user

    const { navigation, route } = props
    const { navigate, replace, setParams } = navigation
    const { group, groupId } = route.params
    const group_id = groupId ? groupId : group ? group.id : ''
    const isMyGroup = group ? group.user.id === userDetail.id : false
    const isJoined = HelpingMethods.checkIfGroupJoined(group_id)
    const isJoinRequest = HelpingMethods.checkIfGroupJoinRequested(group_id)

    //local states

    const [joinRequests, setJoinRequests] = useState([])
    const [loading, setLoading] = useState(true)
    //manage group posts
    const [groupPosts, setGroupPosts] = useState([])
    const [isLoadingGroupPosts, setLoadingGroupPosts] = useState(true)
    const [isLoadingMoreGroupPosts, setLoadingMoreGroupPosts] = useState(false)
    const [isGroupAllPostsLoaded, setGroupAllPostsLoaded] = useState(false)
    const [groupPostsCurrentPage, setGroupPostsCurrentPage] = useState(1)


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
                                    text={HelpingMethods.checkIfGroupJoined(group_id) ? "Joined" : HelpingMethods.checkIfGroupJoinRequested(group_id) ? 'Join Request Send' : "join"}
                                    onPress={() => {
                                    }}
                                    buttonStyle={{ paddingHorizontal: sizes.marginHorizontal, paddingVertical: sizes.marginVertical / 2, backgroundColor: HelpingMethods.checkIfGroupJoined(group_id) ? colors.appColor1 + '20' : HelpingMethods.checkIfGroupJoinRequested(group_id) ? colors.appBgColor3 : colors.appColor1 }}
                                    textStyle={[appStyles.textRegular, HelpingMethods.checkIfGroupJoined(group_id) ? appStyles.textPrimaryColor : HelpingMethods.checkIfGroupJoinRequested(group_id) ? appStyles.textGray : appStyles.textWhite]}
                                />
                            </ComponentWrapper>
                    }
                </>
            )
        });
    }, [props, group, userDetail, group_id]);

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
        getInitialData()
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

    const getInitialData = async () => {
        await getSetGroupPosts()
        setLoadingGroupPosts(false)
    }

    const handleLoadMorePosts = async (data) => {
        if (!isGroupAllPostsLoaded) {
            setLoadingMoreGroupPosts(true)
            await getSetGroupPosts()
            setGroupPostsCurrentPage(groupPostsCurrentPage + 1)
            setLoadingMoreGroupPosts(false)
        }
    }

    const getSetGroupPosts = async () => {
        await Backend.getGroupPosts({ group_id, page: groupPostsCurrentPage }).
            then(res => {
                if (res) {
                    setGroupPosts([...groupPosts, ...res.data.data])
                    !res.data.next_page_url && setGroupAllPostsLoaded(true)
                }
            })
    }

    if (loading) {
        return (
            <SkeletonProductDetails itemStyle={{ height: height(25) }} />
        )
    }
    return (
        <MainWrapper>
            <ScrollView>
                <ProfileTop
                    imageUri={group.icon}
                    title={group.name}
                    //subTitle={group.users.length + ' members'}
                    subTitle={group.users.length + ' ' + 'member' + (group.users.length <= 1 ? '' : 's')}
                />
                {
                    isJoined || isMyGroup ?
                        <>
                            <Spacer height={sizes.smallMargin} />
                            <ShareSomethingButton
                                imageUri={userDetail.profile_image}
                                onPress={() => navigate(routes.shareApost, {
                                    group,
                                    updateData: (updatedPost) => setMyGroups([...groupPosts, updatedPost]),
                                })}
                            />
                        </>
                        :
                        null
                }
                <Spacer height={sizes.smallMargin} />

                <Posts
                    data={groupPosts}
                    scrollEnabled={false}
                    isLoading={isLoadingGroupPosts}
                    isLoadingMore={isLoadingMoreGroupPosts}
                    onEndReached={handleLoadMorePosts}
                    updateData={data=>setGroupPosts(data)}
                    onPressPost={(item, index) => navigate(routes.postDetail, {
                        post: item,
                        postId: item.id,
                        updateData: ({ updatedPost, deletePost }) => {
                            updatedPost ?
                                setGroupPosts(HelpingMethods.handleReplacePost(groupPosts, updatedPost))
                                :
                                deletePost ?
                                setGroupPosts(HelpingMethods.handleRemovePost(groupPosts, deletePost))
                                    :
                                    null

                        },

                    })}
                />
            </ScrollView>
        </MainWrapper>
    );
}

export default GroupDetail;
