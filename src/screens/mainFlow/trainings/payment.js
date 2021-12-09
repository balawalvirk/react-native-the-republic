import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { MaterialIndicator } from 'react-native-indicators';
import { useSelector } from 'react-redux';
import { ButtonGradient, ComponentWrapper, LineHorizontal, MainWrapper, MediumText, PopupPrimary, RegularText, RowWrapperBasic, SmallTitle, Spacer, TextInputUnderlined, TimeSlotCard, TitleValue, TraningCard, Wrapper, TinyTitle, KeyboardAvoidingScrollView, SmallText, Toasts } from '../../../components';
import { appStyles, Backend, colors, HelpingMethods, routes, sizes, stripeKeys } from '../../../services';
import Stripe from 'tipsi-stripe';

function Payment(props) {
    const { navigate, goBack } = props.navigation
    const { training, timeSlot } = props.route.params

    //redux states
    const userData = useSelector(state => state.user)
    const { userDetail, creditCards } = userData
    const { default_dealer, default_dealer_id, delivery_address } = userDetail
    const { trainer } = training
    const { first_name, last_name, profile_image, avg_rating, reviews } = trainer
    const fullName = first_name + ' ' + last_name
    const image = profile_image ? profile_image : appImages.noUser
    const rating = avg_rating ? avg_rating : 0
    const reviewsCount = reviews ? reviews : 0

    //local states
    const [coupons, setCoupons] = useState(null)
    const [coupon, setCoupon] = useState(null)
    const [defaultCreditCard, setDefaultCreditCard] = useState(null)
    const [loadingSendTrainingRequest, setLoadingSendTrainingRequest] = useState(false)
    const [isOrderPlacedPopupVisible, setOrderPlacedPopupVisible] = useState(false)


    useEffect(() => {
        initializStripeOptions()
        getSetSellerCopuns()
        getSetDefaultCard()
    }, [userDetail])

    const initializStripeOptions = async () => {
        await Stripe.setOptions({
            publishableKey: stripeKeys.publishable_key,
            //  merchantId: 'MERCHANT_ID', // Optional
            androidPayMode: 'test', // Android only
        })
    }
    const getSetSellerCopuns = () => {
        Backend.getUserCoupons(trainer.id).
            then(res => {
                if (res) {
                    setCoupons(res.data)
                }
            })
    }
    const getSetDefaultCard = () => {
        const default_card_id = userDetail.default_card_id
        console.log(default_card_id)
        console.log(creditCards.length)

        if (default_card_id && creditCards.length) {
            const tempCreditCard = creditCards.find(item => item.id.toString() === default_card_id)
            console.log('tempCreditCard', tempCreditCard)
            tempCreditCard && setDefaultCreditCard(tempCreditCard)
        }
    }
    const toggleOrderPlacedPopup = () => setOrderPlacedPopupVisible(!isOrderPlacedPopupVisible)
    const handleOnChangeCouponText = (text) => {
        const couponQuery = text.toLowerCase()
        if (coupons.length) {
            const tempOBj = coupons.find(item => item.code.toLowerCase() === couponQuery)
            if (tempOBj) {
                HelpingMethods.handleAnimation()
                setCoupon(tempOBj)
            } else {
                setCoupon(null)
            }
        }
    }
    const getDiscountAmount = () => {
        let discount = 0
        if (coupon) {
            const { discount_type, discount_amount, code, minimum_order, expiry_date } = coupon
            // console.log('today --> ', moment(new Date()).format('yyyy-mm-d'))
            // console.log('is expired --> ', moment(new Date()).format('yyyy-mm-d') > expiry_date)
            const isExpired = moment(new Date()).format('yyyy-mm-d') > expiry_date
            if (!isExpired) {
                const productPricee = Number(productPrice)
                // console.log('productPricee --> ', productPricee)
                if (productPricee >= minimum_order) {
                    //let discount = 0
                    if (discount_type === 'percentage') {
                        discount = (productPricee / 100) * discount_amount
                    } else {
                        discount = discount_amount
                    }
                }
            }
        }
        return HelpingMethods.getRoundedValue(discount)
    }

    const productPrice = training.charges
    const subTotal = Number(productPrice) - (coupon ? getDiscountAmount() : 0)
    const tax = HelpingMethods.getRoundedValue((Number(subTotal) / 100) * 10)
    const transectionCharges = HelpingMethods.getRoundedValue((Number(subTotal) / 100) * 2)
    const total = (subTotal + tax + transectionCharges)


    const handleProceedWithPayment = async () => {
        setLoadingSendTrainingRequest(true)
        await Backend.payWithStripe(defaultCreditCard, total).
            then(async res => {
                if (res) {
                    const stripeCargeId = res.id
                    await Backend.sendTrainingRequest({
                        training_id: training.id,
                        timeSlot_id: timeSlot.id,
                        sub_total: subTotal.toString(),
                        tax: tax.toString(),
                        transaction_charges: transectionCharges.toString(),
                        total: total.toString(),
                        coupon_id: coupon ? coupon.id : '',
                        stripe_charge_id: stripeCargeId
                    }).
                        then(res => {
                            //setLoadingSendTrainingRequest(false)
                            toggleOrderPlacedPopup()
                            if (res) {
                                //navigate(routes.mainBottomTab)
                                //Toasts.success('Training Request has been sumitted')
                            }
                        })
                }else{
                    //setLoadingSendTrainingRequest(false)
                    //toggleOrderPlacedPopup()
                }
            })
            setLoadingSendTrainingRequest(false)
    }

    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <TraningCard
                    // onPress={() => navigate(routes.selectDateTime, { training: training })}
                    title={training.title}
                    description={training.description}
                    duration={training.duration}
                    charges={'$ ' + training.charges}
                    location={training.location}
                    userName={fullName}
                    userImage={image}
                    userRating={rating}
                    userReviewsCount={reviewsCount}
                />
                <Spacer height={sizes.smallMargin} />
                <TimeSlotCard
                    date={moment(timeSlot.date).format('dddd, D MMMM, yyyy')}
                    startTime={timeSlot.start_time}
                    endTime={timeSlot.end_time}
                />
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <LineHorizontal />
                </ComponentWrapper>
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
                {
                    coupon ?
                        <>
                            <Spacer height={sizes.baseMargin} />
                            <TitleValue
                                title={'Discount'}
                                value={'-' + (coupon.discount_type != 'percentage' ? '$ ' : '') + coupon.discount_amount + (coupon.discount_type === 'percentage' ? ' %' : '')}
                            />
                            {
                                getDiscountAmount() === 0 ?
                                    <ComponentWrapper style={{ marginRight: width(30) }}>
                                        <Spacer height={sizes.TinyMargin} />
                                        <SmallText style={[appStyles.textGray]}>Not Applicable on this order, minimum order should be
                                            {' '}
                                            <SmallText style={[appStyles.fontBold, { color: colors.error }]}>${coupon.minimum_order}</SmallText>
                                        </SmallText>
                                    </ComponentWrapper>
                                    : null
                            }
                        </>
                        :
                        null
                }
                <Spacer height={sizes.baseMargin} />
                <TextInputUnderlined
                    title="Discount Coupon"
                    value={coupon && coupon.code}
                    onChangeText={handleOnChangeCouponText}
                    containerStyle={{ marginHorizontal: sizes.marginHorizontal }}
                    iconNameRight={coupon ? "check-circle" : null}
                    iconTypeRight="feather"
                    iconColorRight={colors.success}
                    right={!coupons ?
                        <Wrapper>
                            <MaterialIndicator
                                size={totalSize(2.5)}
                                color={colors.appTextColor4}
                            />
                        </Wrapper>
                        :
                        null
                    }
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
                {/* <Wrapper style={[appStyles.grayWrapper, {}]}>
                    <RowWrapperBasic>
                        <Wrapper flex={1}>
                            <RegularText>Payment Method</RegularText>
                            <Spacer height={sizes.baseMargin} />
                            <MediumText>**** **** **** 4464</MediumText>
                        </Wrapper>
                        <TinyTitle onPress={() => navigate(routes.paymentMethods)} style={[appStyles.textPrimaryColor]}>Change</TinyTitle>
                    </RowWrapperBasic>
                </Wrapper> */}
                <Wrapper style={[appStyles.grayWrapper, {}]}>
                    <RowWrapperBasic>
                        <Wrapper flex={1}>
                            <RegularText>Payment Method</RegularText>
                            {
                                defaultCreditCard ?
                                    <>
                                        <Spacer height={sizes.smallMargin} />
                                        <MediumText>{HelpingMethods.getHiddenCardNumber(defaultCreditCard.card_number)}</MediumText>
                                    </>
                                    :
                                    null
                            }

                        </Wrapper>
                        <TinyTitle
                            onPress={() => navigate(routes.paymentMethods)}
                            style={[appStyles.textPrimaryColor]}>{defaultCreditCard ? 'Change' : 'Add'}</TinyTitle>
                    </RowWrapperBasic>
                </Wrapper>
                <Spacer height={sizes.doubleBaseMargin} />
                <ButtonGradient
                    text="Proceed with Payment"
                    onPress={handleProceedWithPayment}
                    loading={loadingSendTrainingRequest}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
            <PopupPrimary
                scrollEnabled={false}
                visible={isOrderPlacedPopupVisible}
                toggle={toggleOrderPlacedPopup}
                iconName="check"
                iconType="feather"
                title="Training Scheduled"
                // info={"You'll be notified when your order is accepted and on it's way to delivery." + '\n\n' + "You can track your order in your purchase history."}
                buttonText1="Continue"
                loadingButton1={loadingSendTrainingRequest}
                //onPressButton1={() => { toggleOrderPlacedPopup(); navigate(routes.mainBottomTab) }}
                onPressButton1={()=> navigate(routes.mainBottomTab)}
                topMargin={sizes.statusBarHeight + height(2.5)}
                disableBackDropPress
                disableSwipe
            >
                <Spacer height={sizes.baseMargin} />
                <TraningCard
                    // onPress={() => navigate(routes.selectDateTime, { training: training })}
                    title={training.title}
                    description={training.description}
                    duration={training.duration}
                    charges={'$ ' + training.charges}
                    location={training.location}
                    userName={fullName}
                    userImage={image}
                    userRating={rating}
                    userReviewsCount={reviewsCount}
                />
                <Spacer height={sizes.smallMargin} />
                <TimeSlotCard
                    date={moment(timeSlot.date).format('dddd, D MMMM, yyyy')}
                    startTime={timeSlot.start_time}
                    endTime={timeSlot.end_time}
                />
                <Spacer height={sizes.baseMargin} />
            </PopupPrimary>
        </MainWrapper>
    );
}

export default Payment;
