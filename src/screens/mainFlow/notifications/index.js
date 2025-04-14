import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
import { ComponentWrapper, MainWrapper, MediumText, NoDataViewPrimary, NotificationCardPrimary, RegularText, SkeletonPrimaryList, UserSkeletons, Wrapper } from '../../../components';
import { appStyles, Backend, colors, DummyData, HelpingMethods, routes } from '../../../services';
import ApproveReviewPopup from './approveReviewPopup';
import { Swipeable } from 'react-native-gesture-handler'
import { MaterialIndicator } from 'react-native-indicators';
import { totalSize } from 'react-native-dimension';

function Notifications(props) {
    const { navigation } = props
    const { navigate } = navigation

    const [notifications, setNotifications] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isApproveReviewVisible, setApproveReviewVisibility] = useState(false)

    const toggleApproveReview = () => setApproveReviewVisibility(!isApproveReviewVisible)
    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                notifications ?
                    notifications.length ?
                        <TouchableOpacity activeOpacity={1} onPress={handleDeleteAllNotification}>
                            <ComponentWrapper>
                                {
                                    !loading ?
                                        <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>Clear All</RegularText>
                                        :
                                        <MaterialIndicator
                                            size={totalSize(2)}
                                            color={colors.appColor1}
                                        />
                                }
                            </ComponentWrapper>
                        </TouchableOpacity>
                        :
                        null
                    : null
            )
        });
    }, [navigation, notifications, loading]);


    useEffect(() => {
        getSetNotification()
    }, [])

    const getSetNotification = async () => {
        await Backend.getAllNotifications().
            then(res => {
                if (res) {
                    setNotifications(res.unReadNotifications)
                }
            })

    }
    const handleDeleteSingleNotification = async (item, index) => {
        const tempNotif = notifications.filter(NotifObj => NotifObj.id != item.id)
        setNotifications(tempNotif)
        await Backend.clearSingleNotifications(item.id)
    }
    const handleDeleteAllNotification = async () => {
        setLoading(true)
        await Backend.clearAllNotifications().
            then(res => {
                if (res) {
                    setNotifications([])
                }
            })
        setLoading(false)

        // setTimeout(() => {
        //     setLoading(false)
        //     setNotifications([])
        // }, 2000);
    }
    const handlePressNotification = (item, index) => {
        if (item.type === 'postReaction') {
            navigate(routes.postDetail, { postId: item.content.id })
        } else if (item.type === 'postComment') {
            navigate(routes.postDetail, { postId: item.content.id })
        } else if (item.type === 'followRequestAccepted') {
            navigate(routes.userProfile, { userId: item.content.id })
        } else if (item.type === 'newFollowRequest') {
            navigate(routes.followRequests)
        } else if (item.type === 'followUser') {
            // navigate(routes.followRequests)
            navigate(routes.userProfile, { userId: item.content.id })
        } else if (item.type === 'productReview') {
            toggleApproveReview()
        }
    }
    if (!notifications) {
        return (
            <MainWrapper>
                <UserSkeletons NumOfItems={10} />
            </MainWrapper>
        )
    }
    else if (!notifications.length) {
        return (
            <MainWrapper>
                <NoDataViewPrimary
                    title="Notifications"
                    showIcon
                    iconName="bell-remove"
                />
            </MainWrapper>
        )
    }
    return (
        <MainWrapper>
            <FlatList
                data={notifications}
                key={'key'}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const itemData = JSON.parse(item.data)
                    index === 0 && console.log('itemData --> ', itemData.profile_photo_path)
                    index === 0 && console.log('type --> ', itemData.type)
                    let refsArray = []
                    return (
                        <Swipeable
                            ref={ref => {
                                refsArray[index] = ref; //or this.refsArray[item.id] 
                            }}
                            renderRightActions={() =>
                                <Wrapper flex={1} style={{ backgroundColor: colors.error, alignItems: 'flex-end', justifyContent: 'center', }}>
                                    <ComponentWrapper>
                                        <RegularText style={[appStyles.textWhite, appStyles.fontBold]}>Delete</RegularText>
                                    </ComponentWrapper>
                                </Wrapper>}
                            onSwipeableRightOpen={() => {
                                refsArray[index] ? refsArray[index].close() : null
                                handleDeleteSingleNotification(item, index)
                            }}
                        >
                            <NotificationCardPrimary
                                //containerStyle={{ backgroundColor: !item.isView ? index === notifications.length - 1 ? colors.appColor2 + '20' : colors.rating + '20' : 'transparent' }}
                                containerStyle={{ backgroundColor: colors.appBgColor1 }}
                                text={itemData.data}
                                image={itemData.profile_photo_path}
                                type={itemData.type}
                                time={moment(item.created_at).fromNow()}
                                onPress={() => handlePressNotification(itemData, index)}
                            />
                        </Swipeable>
                    )
                }}
            />
            <ApproveReviewPopup
                visible={isApproveReviewVisible}
                toggle={toggleApproveReview}
            />
        </MainWrapper>
    );
}

export default Notifications;
