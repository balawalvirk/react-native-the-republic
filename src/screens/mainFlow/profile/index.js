import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { ComponentWrapper, MainWrapper, ButtonColoredSmall, ProfileTop, Spacer, ShareSomethingButton, Posts, Wrapper, ButtonGroupAnimated } from '../../../components';
import { appStyles, Backend, colors, DummyData, HelpingMethods, routes, sizes } from '../../../services';
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


function Profile(props) {
    const { navigation, route } = props
    const { navigate } = navigation
    //const isJoined = true

    const allPosts = DummyData.posts.slice(0, 4)


    //redux states
    const user = useSelector(state => state.user)
    const { userDetail } = user
    //const fullName=userDetail.first_name+' '+userDetail.last_name

    //local states
    const [myPosts, setMyPosts] = useState([])
    const [isLoadingMyPosts, setLoadingMyPosts] = useState(true)
    const [isLoadingMoreMyPosts, setLoadingMoreMyPosts] = useState(false)
    const [isMyAllPostsLoaded, setMyAllPostsLoaded] = useState(false)
    const [myPostsCurrentPage, setMyPostsCurrentPage] = useState(1)
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)


    useEffect(() => {
        getInitialData()
    }, [])
    // useFocusEffect(
    //     useCallback(() => {
    //         getInitialData()
    //     }, [])
    // )

    const getInitialData = async () => {
        await getSetMyPosts()
        isLoadingMyPosts && setLoadingMyPosts(false)
        myPostsCurrentPage > 1 && setMyPostsCurrentPage(1)
    }

    const handleLoadMorePosts = async (data) => {
        if (!isMyAllPostsLoaded) {
            setLoadingMoreMyPosts(true)
            await getSetMyPosts()
            setMyPostsCurrentPage(myPostsCurrentPage + 1)
            setLoadingMoreMyPosts(false)
        }
    }


    const getSetMyPosts = async () => {
        await Backend.getUserPosts({ page: myPostsCurrentPage }).
            then(res => {
                if (res) {
                    setMyPosts([...myPosts, ...res.data.data])
                    !res.data.next_page_url && setMyAllPostsLoaded(true)
                }
            })
    }

    if (!userDetail) {
        return null
    }
    return (
        <MainWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ProfileTop
                    imageUri={userDetail.profile_image}
                    title={userDetail.first_name + ' ' + userDetail.last_name}
                    subTitle={'@' + userDetail.username}
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
                                onPress={() => navigate(routes.seller.sellerDashboard)}
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
                                imageUri={userDetail.profile_image}
                                onPress={() => navigate(routes.shareApost, {
                                    updateData: (updatedPost) => setMyPosts([...myPosts, updatedPost]),
                                })}
                            />
                            <Spacer height={sizes.smallMargin} />
                            <Posts
                                data={myPosts}
                                isLoadingMore={isLoadingMoreMyPosts}
                                isLoading={isLoadingMyPosts}
                                onEndReached={handleLoadMorePosts}
                                updateData={(data) => setMyPosts(data)}
                                onPressPost={(item, index) => navigate(routes.postDetail, {
                                    post: item,
                                    postId: item.id,
                                    updateData: ({ updatedPost, deletePost }) => {
                                        updatedPost ?
                                            setMyPosts(HelpingMethods.handleReplacePost(myPosts, updatedPost))
                                            :
                                            deletePost ?
                                                setMyPosts(HelpingMethods.handleRemovePost(myPosts, deletePost))
                                                :
                                                null

                                    },
                                })}
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

export default Profile;
