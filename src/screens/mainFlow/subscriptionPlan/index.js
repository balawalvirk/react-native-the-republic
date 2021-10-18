import React, { Component, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { LargeText, MainWrapper, PlanCard, PopupPrimary, RegularText, RowWrapperBasic, SmallTitle, Spacer, Toasts, Wrapper } from '../../../components';
import { appStyles, Backend, colors, fontFamily, routes, sizes } from '../../../services';

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

    //redux states
    const user = useSelector(state => state.user)
    const { userDetail } = user
    //local states
    const [selectedPlanIndex, setPlanIndex] = useState(0)
    const [loadingCancelSubscription, setLoadingCancelSubscription] = useState(false)

    const [isCancelSubscriptionPopupVisible, setCancelSubscriptionPopupVisibility] = useState(false)
    const toggleCancelSubscriptionPopup = () => setCancelSubscriptionPopupVisibility(!isCancelSubscriptionPopupVisible)

    useEffect(() => {
        getSetUserSubscriptionPlan()
    }, [userDetail])

    const getSetUserSubscriptionPlan = () => {
        const subscription_plan = userDetail.subscription_plan 
        if (subscriptionPlans.length && subscription_plan) {
            const tempItem = subscriptionPlans.find(item => item.title === subscription_plan)
            if (tempItem) {
                const tempIndex = subscriptionPlans.indexOf(tempItem)
                if (tempIndex >= 0) {
                    setPlanIndex(tempIndex)
                }
            }
        }
    }
    const handleCancelSubscription = async () => {
        setLoadingCancelSubscription(true)
        let subscriptionId = userDetail.subscription_id
        await Backend.cancelStripeSubscribtion(subscriptionId).
            then(async (response) => {
                console.log('Cancel subscribtion response', response)
                if (response.status === 'canceled') {
                     await Backend.update_profile({
                         //customer_id: stripeCustomerObjectID,
                         //payment_id: stripePaymentObjectID,
                         //subscription_id: response.id,
                         user_type: 'basic',
                         subscription_plan: 'Basic',
                         cancel_subscription:true
                     }).
                         then(async (response) => {
                             if (response) {
                                 toggleCancelSubscriptionPopup()
                                 Toasts.success('Subscription has been cancelled')
                                 setPlanIndex(0)
                             }
                         })
                } else {
                    Toasts.error('Operation Failed')
                    toggleCancelSubscriptionPopup()
                }
            })
        setLoadingCancelSubscription(false)
    }
    return (
        <MainWrapper>
            <FlatList
                data={subscriptionPlans}
                ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
                renderItem={({ item, index }) => {
                    const isSelected = selectedPlanIndex === index
                    return (
                        <PlanCard
                            onPress={() => {
                                //setPlanIndex(index),
                                if (index === 0 && selectedPlanIndex != index && userDetail.subscription_id) {
                                    toggleCancelSubscriptionPopup()
                                }
                                if (index != 0 && selectedPlanIndex != index) {
                                    navigate(routes.upgradeSubscriptionPlan, { plan: item })
                                }
                            }}
                            title={item.title}
                            price={item.price === 0 ? 'Free' : '$' + item.price + '/month'}
                            keyPoints={item.keyPoints}
                            isSelected={selectedPlanIndex === index}
                        />
                    )
                }}
            />
            <PopupPrimary
                visible={isCancelSubscriptionPopupVisible}
                toggle={toggleCancelSubscriptionPopup}
                iconName="close"
                iconType="ionicon"
                iconContainerColor={colors.error}
                title={`Cancel ${userDetail.subscription_plan} Plan`}
                info={"Are you sure to cancel the current subscription plan?"}
                buttonText1="Yes"
                buttonText2="No"
                onPressButton1={handleCancelSubscription}
                onPressButton2={toggleCancelSubscriptionPopup}
                loadingButton1={loadingCancelSubscription}
                topMargin={height(60)}
            />
        </MainWrapper>
    );
}

export default SubscriptionPlan;
