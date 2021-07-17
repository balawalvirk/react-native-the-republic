import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { MainWrapper, ButtonGroupAnimated, Spacer, Posts, Wrapper } from '../../../components'
import { DummyData, sizes, tabs } from '../../../services';
import dummyData from '../../../services/constants/dummyData';
import NoDataView from './noDataView';
const topTabs = [
    {
        title: 'Subscribed'
    },
    {
        title: 'Dealers'
    },
    {
        title: 'Groups'
    },
    {
        title: 'Your Groups'
    }
]
function Community() {
    //local states
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const allPosts = DummyData.posts
    let posts = []
    const getDealerPosts = () => {
        let tempPosts = []
        tempPosts = allPosts.filter(item => {
            return !item.group

        })
        return tempPosts
    }
    const getGroups = () => {
        let tempPosts = []
        tempPosts = allPosts.filter(item => {
            return item.group
        })
        return tempPosts

    }
    const getMyGroups = () => {
        let tempPosts = []
        tempPosts = allPosts.filter(item => {
            return item.user.id === dummyData.userData.id
        })
        return tempPosts

    }
    if (selectedTabIndex === 0) {
        posts = allPosts
    } else if (selectedTabIndex === 1) {
        posts = getDealerPosts()
    } else if (selectedTabIndex === 2) {
        posts = getGroups()
    } else if (selectedTabIndex === 3) {
        posts = getMyGroups()
    }
    return (
        <MainWrapper>
            <Spacer height={sizes.smallMargin} />
            <Wrapper >
                <ButtonGroupAnimated
                    initalIndex={selectedTabIndex}
                    data={topTabs}
                    text='title'
                    onPressButton={(item, index) => setSelectedTabIndex(index)}
                />
            </Wrapper>
            <Spacer height={sizes.smallMargin} />
            {
                posts.length ?
                    <Posts
                        data={posts}
                    />
                    :
                    <NoDataView
                        tab={topTabs[selectedTabIndex].title}
                    />
            }
        </MainWrapper>
    );
}

export default Community;
