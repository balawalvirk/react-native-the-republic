import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Dealers, MainWrapper, Spacer, FollowRequestsList } from '../../../components';
import { DummyData, routes, sizes } from '../../../services';

function FollowRequests(props) {
    const { navigate } = props.navigation
    const followRequests = [...DummyData.dealers.slice(0,3)]
    return (
        <MainWrapper>
            <FollowRequestsList
                data={followRequests}
                onPress={(item, index) => navigate(routes.userProfile, { item: item })}
                ListHeaderComponent={() => {
                    return <Spacer height={sizes.smallMargin} />
                }}
                ListFooterComponent={() => {
                    return <Spacer height={sizes.baseMargin} />
                }}
            />
        </MainWrapper>
    );
}

export default FollowRequests;
