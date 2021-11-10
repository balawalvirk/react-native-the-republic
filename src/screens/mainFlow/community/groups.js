import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ButtonGradient, CustomIcon, MediumText, Posts, Spacer, TinyTitle, Wrapper } from '../../../components';
import { appIcons, appStyles, DummyData, routes, sizes } from '../../../services';
import { navigate } from '../../../services/navigation/rootNavigation';


export default function Groups({ tab }) {

    const allPosts = DummyData.posts

    let posts = []
    const getJoinedGroupsPosts = () => {
        let tempPosts = []
        tempPosts = allPosts.filter(item => {
            return item.group
        })
        return tempPosts

    }
    posts = getJoinedGroupsPosts()
    return (
        <Wrapper flex={1} >
            <Posts
                data={posts}
            />
        </Wrapper>
    );
}

