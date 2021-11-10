import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { MainWrapper, ButtonGroupAnimated, Spacer, Posts, Wrapper } from '../../../components'
import { DummyData, sizes, tabs } from '../../../services';
import Subscribed from './subscribed';
import Dealers from './dealers';
import Groups from './groups';
import YourGroups from './yourGroups';
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
                selectedTabIndex===0?
                <Subscribed/>
                :
                selectedTabIndex===1?
                <Dealers/>
                :
                selectedTabIndex===2?
                <Groups/>
                :
                <YourGroups/>
            }
        </MainWrapper>
    );
}

export default Community;
