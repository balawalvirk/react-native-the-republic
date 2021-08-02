import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { LargeText, MainWrapper, PlanCard, RegularText, RowWrapperBasic, SmallTitle, Spacer, Wrapper } from '../../../components';
import { appStyles, colors, fontFamily, routes, sizes } from '../../../services';

const subscriptionPlans = [
    {
        title: 'Basic',
        price: '0',
        keyPoints: "• Free account • You'll able to post 2 pictures • Basic profile (picture, name, username etc.) • No ability to bump your ads unless paid for • You'll be able to see items posted within 30 miles radius from your location"
    },

    {
        title: 'Premium',
        price: '50',
        keyPoints: "• You will have the ability to post 5 sale post that remain active for a month • No more than 5 posts active at one time • You'll be able to add 5 photos per ad • Access to Community & Training network • Bump your ad once every 5 days • You'll have pics and video available on profile group sms not available on Basic"
    },
    {
        title: 'Dealer/Pro',
        price: '100',
        keyPoints: "• Unlimited listings • Access to post in training network • You'll also have the ability to advertise on your profile with picture & video • Can also list prices on their profile page • Ads can't be flagged • You'll be able to bump your ads every 5 days"
    },
]
function SubscriptionPlan(props) {
    const { navigate } = props.navigation

    const [selectedIndex, selectIndex] = useState(0)


    return (
        <MainWrapper>
            <FlatList
                data={subscriptionPlans}
                ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
                renderItem={({ item, index }) => {
                    const isSelected = selectedIndex === index
                    return (
                        <PlanCard
                            onPress={() => {
                                //selectIndex(index),
                                index != 0 && navigate(routes.upgradeSubscriptionPlan, { plan: item })
                            }}
                            title={item.title}
                            price={item.price === 0 ? 'Free' : '$' + item.price + '/month'}
                            keyPoints={item.keyPoints}
                            isSelected={selectedIndex === index}
                        />
                    )
                }}
            />
        </MainWrapper>
    );
}

export default SubscriptionPlan;
