import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { KeyboardAvoidingScrollView, MainWrapper, PostCard, Posts, PostSkeletons, SkeletonPrimaryList, Spacer } from '../../../components';
import { Backend, routes, sizes } from '../../../services';

export default function PostDetail({ navigation, route }) {
    //navigation params
    const { navigate, goBack } = navigation
    const { params } = route
    const { post, postId, updateData } = params
    const post_id = postId ? postId : post ? post.id : ''
    console.log('params post', post)
    console.log('params postId', postId)

    //local states
    const [postDetail, setPostDetail] = useState(null)
    const [isLoading, setLoading] = useState(true)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: postDetail ? postDetail.user.first_name + "'s Post" : "Post"
        });
    }, [navigation, postDetail]);


    useEffect(() => {
        getSetData()
    }, [])


    const getSetData = async () => {
        if (postId) {
            await Backend.getPostDetail(postId).
                then(res => {
                    if (res) {
                        setPostDetail(res.post)
                    }
                })
        } else if (post) {
            setPostDetail(post)
        }
        setLoading(false)
    }

    // const handleUpdateData = (post) => {
    //     let tempData = data.slice()
    //     const tempDataObj = tempData.find(item => item.id === post.id)
    //     if (tempDataObj) {
    //         const tempDataObjIndex = tempData.indexOf(tempDataObj)
    //         if (tempDataObjIndex >= 0) {
    //             tempData[tempDataObjIndex] = post
    //             updateData(tempData)
    //         }
    //     }
    // }

    if (isLoading) {
        return (
            <MainWrapper>
                <PostSkeletons NumOfItems={1} />
                <SkeletonPrimaryList itemHeight={height(8)} itemStyle={{ marginHorizontal: sizes.marginHorizontalSmall }} />
            </MainWrapper>
        )
    }
    return (
        <MainWrapper>

            <KeyboardAvoidingScrollView>
                <Posts
                    data={[postDetail]}
                    showAllComments
                    scrollEnabled={false}
                    //isLoadingMore={isLoadingMoreMyPosts}
                    //isLoading={isLoading}
                    //onEndReached={handleLoadMorePosts}
                    updateData={(updatedPosts) => {
                        if(updatedPosts.length){
                            setPostDetail(updatedPosts[0])
                            updateData && updateData({updatedPost:updatedPosts[0]})
                        }else{
                            updateData && updateData({deletePost:postDetail})
                            goBack()
                        }
                       
                    }}
                    enableComment
                    onPressPost={(item, index) => { }}
                />
                <Spacer height={sizes.baseMargin} />
            </KeyboardAvoidingScrollView>
        </MainWrapper>
    );
}

