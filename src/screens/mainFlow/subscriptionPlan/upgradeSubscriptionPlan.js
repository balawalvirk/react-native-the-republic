import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { ButtonGradient, ComponentWrapper, LineHorizontal, MainWrapper, MediumText, PlanCard, PopupPrimary, RegularText, RowWrapperBasic, SmallTitle, Spacer, TinyTitle, TitleValue, Toasts, Wrapper } from '../../../components';
import { appStyles, Backend, colors, HelpingMethods, routes, sizes, stripeKeys } from '../../../services';
import dummyData from '../../../services/constants/dummyData';

function UpgradeSubscriptionPlan(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { plan } = route.params

    //redux states
    const user = useSelector(state => state.user)
    const { userDetail, creditCards } = user
    //const userCreditCards = dummyData.creditCards
    const testSubscriptionId = ''

    //local states
    const [defaultCreditCard, setDefaultCreditCard] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingCancelSubscription, setLoadingCancelSubscription] = useState(false)


    const isPremium = plan.title === 'Premium'
    const isDealerPro = plan.title === 'Dealer/Pro'

    const subTotal = Number(plan.price)
    const tax = (Number(plan.price) / 100) * 10
    const transectionCharges = 10
    const total = subTotal + tax + transectionCharges

    const [isSubscriptionUpgradedPopupVisible, setSubscriptionUpgradedPopupVisible] = useState(false)
    const [isCancelCurrentSubscriptionPopupVisible, setCancelCurrentSubscriptionPopupVisible] = useState(false)
    const toggleSubscriptionUpgradedPopup = () => setSubscriptionUpgradedPopupVisible(!isSubscriptionUpgradedPopupVisible)
    const toggleCancelCurrentSubscriptionPopup = () => setCancelCurrentSubscriptionPopupVisible(!isCancelCurrentSubscriptionPopupVisible)

    useEffect(() => {
        const default_card_id = userDetail.default_card_id
        console.log(default_card_id)
        console.log(creditCards.length)

        if (default_card_id && creditCards.length) {
            const tempCreditCard = creditCards.find(item => item.id.toString() === default_card_id)
            console.log('tempCreditCard', tempCreditCard)
            tempCreditCard && setDefaultCreditCard(tempCreditCard)
        }
    }, [userDetail])

    const handleUpgradeSubscriptionPlan = () => {
        let subscriptionId = userDetail.subscription_id
        if (subscriptionId) {
            toggleCancelCurrentSubscriptionPopup()
        } else {
            handleSetupSubscription()
        }
    }

    const handleSetupSubscription = async () => {
        let strip_paymentId = ''
        let stripe_customerId = ''
        if (userDetail.customer_id && userDetail.payment_id) {
            console.log('Stripe data is saved')
            strip_paymentId = userDetail.payment_id
            stripe_customerId = userDetail.customer_id
        }
        setLoading(true)
        //console.log('Stripe data is not saved')
        let paymentObject
        let customerObject
        paymentObject = await Backend.createStripePaymentObject(defaultCreditCard)
        console.log("CreatePaymentObject Response==>", paymentObject)
        if (paymentObject.id) {
            if (!stripe_customerId.length) {
                customerObject = await Backend.createStripeCustomer()
                console.log("CreateCustomer Response==>", customerObject)
                stripe_customerId = customerObject.id
            }
            if (stripe_customerId) {
                await Backend.attachStripePaymentMethodToCustomer(stripe_customerId, paymentObject.id).
                    then(async (response) => {
                        console.log("Attach Response==>", response)
                        if (response.id) {
                            handleSubscribe(stripe_customerId, paymentObject.id)
                        } else {
                            Toasts.error('Subscription Failed! unable to link payment method with customer.')
                            setLoading(false)
                        }
                    }) // don't need to do this step everytime
            } else {
                Toasts.error('Subscription Failed! Unable to create customer.')
                setLoading(false)
            }

        } else {
            Toasts.error('Subscription Failed! invalid payment method.')
            setLoading(false)
        }
    }

    const handleSubscribe = async (stripeCustomerObjectID, stripePaymentObjectID) => {
        console.log('stripe Data', stripeCustomerObjectID, stripePaymentObjectID)
        await Backend.createStripeSubscription(
            isPremium ? stripeKeys.subscription_premium_price : isDealerPro ? stripeKeys.subscription_dealerPro_price : '',
            stripeCustomerObjectID,
            stripePaymentObjectID).then(async (response) => {
                console.log("Create Subscription Stripe Respons==>", response)
                if (response.status === "active") {
                    await Backend.update_profile({
                        customer_id: stripeCustomerObjectID,
                        payment_id: stripePaymentObjectID,
                        subscription_id: response.id,
                        user_type: plan.title.toLowerCase(),
                        subscription_plan: plan.title
                    }).
                        then(async (response) => {
                            if (response) {
                                toggleSubscriptionUpgradedPopup()

                            }
                        })
                } else {
                    Toasts.error('Subscription Failed, try again with other payment methode')
                }

            }).catch(async (error) => {
                console.error(error)
                Toasts.error('Subscription Failed! please try again')
            })
        setLoading(false)
    }

    const handleCancelCurrentSubscription = async () => {
        setLoadingCancelSubscription(true)
        // let subscriptionId = userDetail.subscription_id
        const { subscription_id, payment_id, customer_id } = userDetail
        await Backend.cancelStripeSubscribtion(subscription_id).
            then(async (response) => {
                console.log('Cancel subscribtion response', response)
                if (response.status === 'canceled') {
                    await Backend.update_profile({
                        user_type: 'basic',
                        subscription_plan: 'Basic',
                        cancel_subscription:true
                    }).
                        then(async (response) => {
                            if (response) {
                                toggleCancelCurrentSubscriptionPopup()
                                if (payment_id && customer_id) {
                                    setLoading(true)
                                    handleSubscribe(customer_id, payment_id)
                                } else {
                                    handleSetupSubscription()
                                }
                            }
                        })
                } else {
                    Toasts.error('Operation Failed')
                    toggleCancelCurrentSubscriptionPopup()
                }
            })
        setLoadingCancelSubscription(false)
    }

    return (
        <MainWrapper>
            <Spacer height={sizes.baseMargin} />
            <PlanCard
                onPress={() => {
                    //selectIndex(index),
                    //index != 0 && navigate(routes.upgradeSubscriptionPlan, { plan: plan })
                }}
                title={plan.title}
                price={'$' + plan.price + '/month'}
                keyPoints={plan.keyPoints}
            //isSelected={selectedIndex === index}
            />
            <ComponentWrapper>
                <LineHorizontal color={colors.appBgColor4} />
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />
            <TitleValue
                title={'Subtotal'}
                value={'$ ' + subTotal}
            />
            <Spacer height={sizes.baseMargin} />
            <TitleValue
                title={'Tax (10%)'}
                value={'$ ' + (tax)}
            />
            <Spacer height={sizes.baseMargin} />
            <TitleValue
                title={'Transaction Charges'}
                value={'$ ' + transectionCharges}
            />
            <Spacer height={sizes.baseMargin} />
            <Wrapper style={[appStyles.grayWrapper, { paddingVertical: sizes.baseMargin * 1.5 }]}>
                <RowWrapperBasic>
                    <Wrapper flex={1}>
                        <SmallTitle>Total</SmallTitle>
                    </Wrapper>
                    <SmallTitle style={[appStyles.textPrimaryColor]}>$ {total}</SmallTitle>
                </RowWrapperBasic>
            </Wrapper>
            <Spacer height={sizes.baseMargin} />
            {
                defaultCreditCard ?
                    <Wrapper style={[appStyles.grayWrapper, {}]}>
                        <RowWrapperBasic>
                            <Wrapper flex={1}>
                                <RegularText>Payment Method</RegularText>
                                <Spacer height={sizes.smallMargin} />
                                <MediumText>{HelpingMethods.getHiddenCardNumber(defaultCreditCard.card_number)}</MediumText>
                            </Wrapper>
                            <TinyTitle
                                onPress={() => navigate(routes.paymentMethods)}
                                style={[appStyles.textPrimaryColor]}>Change</TinyTitle>
                        </RowWrapperBasic>
                    </Wrapper>
                    :
                    <ButtonGradient
                        text="Add Payment Method"
                        onPress={() => navigate(routes.paymentMethods)}
                    />
            }
            <Spacer height={sizes.doubleBaseMargin} />
            {
                defaultCreditCard ?
                    <ButtonGradient
                        text="Upgrade Subscription Plan"
                        onPress={handleUpgradeSubscriptionPlan}
                        loading={loading}
                    />
                    :
                    null
            }
            <PopupPrimary
                visible={isSubscriptionUpgradedPopupVisible}
                toggle={toggleSubscriptionUpgradedPopup}
                iconName="check"
                iconType="feather"
                title="Subscription Plan Upgraded"
                // info={"You'll be notified when your order is accepted and on it's way to delivery." + '\n\n' + "You can track your order in your purchase history."}
                buttonText1="Continue"
                onPressButton1={() => { toggleSubscriptionUpgradedPopup(); goBack() }}
                topMargin={height(65)}
                disableBackDropPress
                disableSwipe
            />
            <PopupPrimary
                visible={isCancelCurrentSubscriptionPopupVisible}
                toggle={toggleCancelCurrentSubscriptionPopup}
                iconName="upgrade"
                iconType="material"
                iconContainerColor={colors.success}
                title={`Upgrade Plan`}
                info={`You are currently subscribed on ${userDetail.subscription_plan} plan, are you sure to cancel the current subscription plan and subscribe to ${plan.title} plan?`}
                buttonText1="Yes"
                buttonText2="No"
                onPressButton1={handleCancelCurrentSubscription}
                onPressButton2={toggleCancelCurrentSubscriptionPopup}
                loadingButton1={loadingCancelSubscription}
                topMargin={height(60)}
            />
        </MainWrapper>
    );
}

export default UpgradeSubscriptionPlan;
