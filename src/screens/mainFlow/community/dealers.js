import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ButtonGradient, CustomIcon, MainWrapper, MediumText, Posts, Spacer, TinyTitle, Wrapper } from '../../../components';
import { appIcons, appStyles, Backend, DummyData, HelpingMethods, routes, sizes } from '../../../services';
import { navigate } from '../../../services/navigation/rootNavigation';


export default function Dealers({ tab }) {
    //local states
    const [myPosts, setMyPosts] = useState([])
    const [isLoadingMyPosts, setLoadingMyPosts] = useState(true)
    const [isLoadingMoreMyPosts, setLoadingMoreMyPosts] = useState(false)
    const [isMyAllPostsLoaded, setMyAllPostsLoaded] = useState(false)
    const [myPostsCurrentPage, setMyPostsCurrentPage] = useState(1)
    const allPosts = DummyData.posts

    let posts = []

    posts = allPosts

    useEffect(() => {
        getInitialData()
    }, [])

    const getInitialData = async () => {
        await getSetMyPosts()
        setLoadingMyPosts(false)
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
        await Backend.getFollowingsPosts({ page: myPostsCurrentPage }).
            then(res => {
                if (res) {
                    setMyPosts([...myPosts, ...res.data.data])
                    !res.data.next_page_url && setMyAllPostsLoaded(true)
                }
            })
    }
    return (
        <MainWrapper flex={1} >
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
        </MainWrapper>
    );
}

