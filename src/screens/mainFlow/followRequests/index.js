import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Dealers, MainWrapper, Spacer, FollowRequestsList, Toasts } from '../../../components';
import { Backend, DummyData, routes, sizes } from '../../../services';

function FollowRequests(props) {
    const { navigate } = props.navigation
    const dummyFollowRequests = [...DummyData.users.slice(0, 3)]
    const [followRequests, setFollowRequests] = useState(null)
    const [loadingAccept, setLoadingAccept] = useState(null)
    const [loadingDecline, setLoadingDecline] = useState(null)


    useEffect(() => {
        getSetFollowRequests()
    }, [])

    const getSetFollowRequests = async () => {
        await Backend.getFollowRequests().
            then(res => {
                if (res) {
                    setFollowRequests(res.data)
                }
            })
    }

    const getPendingRequests = () => {
        let tempData = []
        tempData = followRequests ? followRequests.filter(item => item.status === 'pending') : []
        return tempData
    }

    const handleAcceptRequest = async (item, index) => {
        setLoadingAccept(index)
        await Backend.acceptFollowRequest({request_id:item.id,follower_id:item.user.id}).
            then(async res => {
                if (res) {
                    await getSetFollowRequests()
                    setLoadingAccept(null)
                    Toasts.success('Follow request accepted')
                }
            })
    }

    const handleDeclineRequest = async (item, index) => {
        setLoadingDecline(index)
        await Backend.declineFollowRequest({request_id:item.id}).
            then(async res => {
                if (res) {
                    await getSetFollowRequests()
                    setLoadingDecline(null)
                    Toasts.success('Follow request declined')
                }
            })
    }
    return (
        <MainWrapper>
            <FollowRequestsList
                data={getPendingRequests()}
                onPress={(item, index) => navigate(routes.userProfile, { item: item })}
                onPressAccept={handleAcceptRequest}
                onPressDecline={handleDeclineRequest}
                ListHeaderComponent={() => {
                    return <Spacer height={sizes.smallMargin} />
                }}
                ListFooterComponent={() => {
                    return <Spacer height={sizes.baseMargin} />
                }}
                loading={!followRequests}
                loadingAcceptIndex={loadingAccept}
                loadingDeclineIndex={loadingDecline}
            />
        </MainWrapper>
    );
}

export default FollowRequests;
