import React, { Component, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Rating } from 'react-native-elements';
import { ComponentWrapper, MainWrapper, NotificationCardPrimary, RegularText } from '../../../components';
import { appStyles, colors, DummyData } from '../../../services';
import ApproveReviewPopup from './approveReviewPopup';




function Notifications(props) {
    const { navigation } = props

    const [notifications, setNotifications] = useState(DummyData.notificaitons)
    const [isApproveReviewVisible, setApproveReviewVisibility] = useState(false)

    toggleAppriveReview = () => setApproveReviewVisibility(!isApproveReviewVisible)
    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ComponentWrapper>
                    <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>Clear All</RegularText>
                </ComponentWrapper>
            )
        });
    }, [navigation]);

    return (
        <MainWrapper>
            <FlatList
                data={notifications}
                key={'key'}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <NotificationCardPrimary
                            containerStyle={{ backgroundColor: !item.isView ? index === notifications.length - 1 ? colors.appColor2 + '20' : colors.rating + '20' : 'transparent' }}
                            text={item.text}
                            image={item.image}
                            type={item.type}
                            time={item.time}
                            onPress={() => { item.type === 'review' ? toggleAppriveReview() : null }}
                        />
                    )
                }}
            />
            <ApproveReviewPopup
                visible={isApproveReviewVisible}
                toggle={toggleAppriveReview}
            />
        </MainWrapper>
    );
}

export default Notifications;
