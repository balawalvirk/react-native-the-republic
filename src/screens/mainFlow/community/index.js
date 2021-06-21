import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, ButtonGroupAnimated, Spacer, Posts } from '../../../components'
import { DummyPosts, sizes } from '../../../services';
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
    const posts = DummyPosts.posts
    return (
        <MainWrapper>
            <Spacer height={sizes.baseMargin} />
            <ButtonGroupAnimated
                data={topTabs}
                text='title'
                onPressButton={(item, index) => setSelectedTabIndex(index)}
            />
            <Spacer height={sizes.baseMargin} />
            <Posts
                data={posts}
            />
        </MainWrapper>
    );
}

export default Community;
