import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { ButtonGradient, CheckIconPrimary, CloseIconPrimary, ComponentWrapper, KeyboardAvoidingScrollView, LineHorizontal, MainWrapper, PopupPrimary, RowWrapper, RowWrapperBasic, SmallTitle, Spacer, TextInputUnderlined, TinyTitle, TitleValue, Toasts, Wrapper } from '../../../../components';
import { appStyles, asyncConts, Backend, colors, HelpingMethods, routes, sizes, stripeKeys } from '../../../../services';

function SubscriptionPayment(props) {

    const { navigate } = props.navigation
    const { plan } = props.route.params
    const [cardNumber, setCardNumber] = useState('')
    const [name, setName] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [cardNumberError, setCardNumberError] = useState('')
    const [nameError, setNameError] = useState('')
    const [cardExpiryError, setCardExpiryError] = useState('')
    const [cvcError, setCvcError] = useState('')
    const [isOrderPlacedPopupVisible, setOrderPlacedPopupVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const toggleOrderPlacedPopup = () => setOrderPlacedPopupVisible(!isOrderPlacedPopupVisible)

    const isPremium = plan.title === 'Premium'
    const isDealerPro = plan.title === 'Dealer/Pro'

    const subTotal = Number(plan.price)
    const tax = (Number(plan.price) / 100) * 10
    const transectionCharges = 10
    const total = subTotal + tax + transectionCharges

    // Handle card number on change
    const handleOnChangeCardNumberText = (cardNumber) => {
        HelpingMethods.handleAnimation()
        !cardNumber ? setCardNumberError('') : cardNumber.length < 19 ? setCardNumberError('Please enter all 16 digits') : setCardNumberError('')
        //setState({ cardNumber })
        setCardNumber(cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())
    }

    const handleOnChangeCardExpiryText = (text) => {
        //setState({ cardNumber })
        HelpingMethods.handleAnimation()
        !text ? setCardExpiryError('') : text.length < 5 ? setCardExpiryError('Invalid expiry') : setCardExpiryError('')
        if (text.indexOf('.') >= 0 || text.length > 5) {
            return;
        }
        if (text.length === 2 && cardExpiry.length === 1) {
            text += '/'
        }
        // Update the state, which in turns updates the value in the text field
        setCardExpiry(text)
    }

    const handleOnChangeCvcText = (cvc) => {
        HelpingMethods.handleAnimation()
        !cvc ? setCvcError('') : cvc.length < 3 ? setCvcError('Invalid cvc') : setCvcError('')
        //setState({ cardNumber })
        setCvc(cvc)
    }
    const PaymentValidations = () => {
        HelpingMethods.handleAnimation()
        !cardNumber ? setCardNumberError('Enter card number.') : cardNumber.length < 19 ? setCardNumberError('Invalid card number') : setCardNumberError('')
        !name ? setNameError("Enter card holder's name") : setNameError('')
        !cardExpiry ? setCardExpiryError('Enter expiry.') : cardExpiry.length < 5 ? setCardExpiryError('Invalid expiry') : setCardExpiryError('')
        !cvc ? setCvcError('Enter cvc') : cvc.length < 3 ? setCvcError('Invalid cvc') : setCvcError('')

        if (cardNumber.length === 19 && name.length >= 2 && cardExpiry.length === 5 && cvc.length === 3) {
            return true
        } else {
            return false
        }
    }

    const handlePay = () => {
        if (PaymentValidations()) {
            handleSetupSubscription()
        }
    }
    const handleSetupSubscription = async () => {
        let strip_paymentId = ''
        let stripe_customerId = ''
        setLoading(true)
        const data = await AsyncStorage.getItem(asyncConts.user_details)
        const userData = JSON.parse(data)
        const paymentDetails = {
            card_number: cardNumber,
            expiry_date: cardExpiry,
            cvc
        }
        //console.log('Stripe data is not saved')
        let paymentObject
        let customerObject
        paymentObject = await Backend.createStripePaymentObject(paymentDetails)
        console.log("CreatePaymentObject Response==>", paymentObject)
        strip_paymentId = paymentObject.id
        if (strip_paymentId) {
            
            customerObject = await Backend.createStripeCustomer(userData)
            console.log("CreateCustomer Response==>", customerObject)
            stripe_customerId = customerObject.id
            if (stripe_customerId) {
                await Backend.attachStripePaymentMethodToCustomer(stripe_customerId, strip_paymentId).
                    then(async (response) => {
                        console.log("Attach Response==>", response)
                        if (response.id) {
                            handleSubscribe(stripe_customerId, strip_paymentId)
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
            stripePaymentObjectID).
            then(async (response) => {
                console.log("Create Subscription Stripe Respons==>", response)
                if (response.status === "active") {
                    toggleOrderPlacedPopup()
                    // await Backend.update_profile({
                    //     customer_id: stripeCustomerObjectID,
                    //     payment_id: stripePaymentObjectID,
                    //     subscription_id: response.id,
                    //     user_type: plan.title.toLowerCase(),
                    //     subscription_plan: plan.title
                    // }).
                    //     then(async (response) => {
                    //         if (response) {
                    //             toggleOrderPlacedPopup()
                    //         }
                    //     })
                } else {
                    Toasts.error('Subscription Failed, try again with other payment methode')
                }

            }).catch(async (error) => {
                console.error(error)
                Toasts.error('Subscription Failed! please try again')
            })
        setLoading(false)
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Subtotal'}
                    value={'$ ' + subTotal}
                />
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Tax (10%)'}
                    value={'$ ' + tax}
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
                <ComponentWrapper>
                    <LineHorizontal color={colors.appBgColor4} />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <TinyTitle>Add Your Credit Card</TinyTitle>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Card Number"
                    // iconName="email-outline"
                    // iconType="material-community"
                    maxLength={19}
                    value={cardNumber}
                    onChangeText={text => handleOnChangeCardNumberText(text)}
                    error={cardNumberError}
                    keyboardType="number-pad"
                    right={
                        cardNumber ?
                            cardNumber.length === 19 ?
                                <CheckIconPrimary />
                                :
                                <CloseIconPrimary />
                            :
                            null
                    }
                />
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Card Holder's Name"
                    // iconName="email-outline"
                    // iconType="material-community"
                    // maxLength={19}
                    value={name}
                    onChangeText={text => {
                        setName(text);
                        nameError && text ? setNameError('') : null
                    }}
                    error={nameError}
                    //  keyboardType="number-pad"
                    right={
                        name ?
                            name.length >= 2 ?
                                <CheckIconPrimary />
                                :
                                <CloseIconPrimary />
                            :
                            null
                    }
                />
                <Spacer height={sizes.baseMargin} />
                <RowWrapper style={{ alignItems: 'flex-start', }}>
                    <Wrapper flex={1}>
                        <TextInputUnderlined
                            title="Expiry"
                            // iconName="email-outline"
                            // iconType="material-community"
                            maxLength={5}
                            value={cardExpiry}
                            onChangeText={text => handleOnChangeCardExpiryText(text)}
                            error={cardExpiryError}
                            keyboardType="number-pad"
                            right={
                                cardExpiry ?
                                    cardExpiry.length === 5 ?
                                        <CheckIconPrimary />
                                        :
                                        <CloseIconPrimary />
                                    :
                                    null
                            }
                            containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall, }}
                        />
                    </Wrapper>
                    <Spacer width={sizes.marginHorizontal} />
                    <Wrapper flex={1}>
                        <TextInputUnderlined
                            title="CVV"
                            // iconName="email-outline"
                            // iconType="material-community"
                            maxLength={3}
                            value={cvc}
                            onChangeText={text => handleOnChangeCvcText(text)}
                            error={cvcError}
                            keyboardType="number-pad"
                            secureTextEntry
                            right={
                                cvc ?
                                    cvc.length === 3 ?
                                        <CheckIconPrimary />
                                        :
                                        <CloseIconPrimary />
                                    :
                                    null
                            }
                            containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall, }}
                        />
                    </Wrapper>
                </RowWrapper>
                <Spacer height={sizes.doubleBaseMargin} />
                <ButtonGradient
                    text={"Pay $" + total}
                    onPress={handlePay}
                    loading={loading}
                />
            </KeyboardAvoidingScrollView>
            <PopupPrimary
                visible={isOrderPlacedPopupVisible}
                toggle={toggleOrderPlacedPopup}
                iconName="check"
                iconType="feather"
                title="Subscription Plan Upgraded"
                // info={"You'll be notified when your order is accepted and on it's way to delivery." + '\n\n' + "You can track your order in your purchase history."}
                buttonText1="Continue"
                onPressButton1={async () => {
                    setLoading(true)
                    const data = await AsyncStorage.getItem(asyncConts.user_credentials)
                    if (data) {
                        const dataParsed = JSON.parse(data)
                        await Backend.auto_login(dataParsed.email, dataParsed.password)
                    }
                    toggleOrderPlacedPopup()
                    setLoading(false)
                }}
                loadingButton1={loading}
                topMargin={height(65)}
                disableSwipe
                disableBackDropPress
            />
        </MainWrapper>
    );
}

export default SubscriptionPayment;
