import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { MaterialIndicator } from 'react-native-indicators';
import { useSelector } from 'react-redux';
import { ButtonGradient, ComponentWrapper, IconButton, KeyboardAvoidingScrollView, LineHorizontal, MainWrapper, MediumText, PopupPrimary, ProductCardSecondary, RegularText, RowWrapper, RowWrapperBasic, SmallTitle, Spacer, SwitchPrimary, TextInputUnderlined, TinyTitle, TitleInfoPrimary, TitlePrimary, UserCardPrimary, Wrapper, TitleValue, Toasts, SmallText } from '../../../components';
import { appImages, appStyles, Backend, colors, fulfillmentStatuses, fulfillmentTypes, HelpingMethods, routes, sizes, stripeKeys } from '../../../services';
// import Stripe from 'tipsi-stripe';



function BuyNow(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //navigation params
    const { product } = route.params
    const { user, images, discounted_price, price } = product
    //redux states
    const userData = useSelector(state => state.user)
    const { userDetail, creditCards } = userData
    const { default_dealer, default_dealer_id, delivery_address } = userDetail
    let deliveryAddress = ''
    if (delivery_address) {
        const { address, house, street, city, state, zip_code } = delivery_address
        deliveryAddress = house + ', ' + street + ', ' + city + ', ' + zip_code + ', ' + state
    }
    //local states
    const [coupons, setCoupons] = useState(null)
    const [coupon, setCoupon] = useState(null)
    const [validCoupon, setValidCoupon] = useState(null)
    const [privateSale, setPrivateSale] = useState(false)
    const [defaultCreditCard, setDefaultCreditCard] = useState(null)
    const [loadingBuy, setLoadingBuy] = useState(false)
    const [isOrderPlacedPopupVisible, setOrderPlacedPopupVisible] = useState(false)

    const toggleOrderPlacedPopup = () => setOrderPlacedPopupVisible(!isOrderPlacedPopupVisible)

    useEffect(() => {
        // initializStripeOptions()
        getSetSellerCopuns()
        const default_card_id = userDetail.default_card_id
        console.log(default_card_id)
        console.log(creditCards.length)

        if (default_card_id && creditCards.length) {
            const tempCreditCard = creditCards.find(item => item.id.toString() === default_card_id)
            console.log('tempCreditCard', tempCreditCard)
            tempCreditCard && setDefaultCreditCard(tempCreditCard)
        }
    }, [userDetail])

    // const initializStripeOptions = async () => {
    //     await Stripe.setOptions({
    //         publishableKey: stripeKeys.publishable_key,
    //         //  merchantId: 'MERCHANT_ID', // Optional
    //         androidPayMode: 'test', // Android only
    //     })
    // }

    const getSetSellerCopuns = () => {
        Backend.getUserCoupons(user.id).
            then(res => {
                if (res) {
                    setCoupons(res.data)
                }
            })
    }

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
                //const productPricee = Number(total)
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
    //const discountAmount = getDiscountAmount()
    //console.log('discountAmount --> ', discountAmount)
    const productPrice = discounted_price ? discounted_price : price ? price : 0
    const subTotal = Number(productPrice) - (coupon ? getDiscountAmount() : 0)
    const tax = HelpingMethods.getRoundedValue((subTotal / 100) * 10)
    //const transectionCharges = 10
    const transectionCharges = HelpingMethods.getRoundedValue((subTotal / 100) * 2)
    const total = HelpingMethods.getRoundedValue(subTotal + tax + transectionCharges)
    // const grandTotal = total - (coupon ? getDiscountAmount() : 0)

    const productImages = images ? JSON.parse(images) : null
    const productImage = productImages ? productImages[0] : appImages.noImageAvailable


    const validations = () => {
        if (defaultCreditCard) {
            if (delivery_address) {
                if (privateSale) {
                    return true
                } else {
                    if (default_dealer_id) {
                        return true
                    } else {
                        Toasts.error('Please Select a Dealer')
                    }
                }
            } else {
                Toasts.error('Please Add Delivery Address')
            }
        } else {
            Toasts.error('Please Add/Select Payment Method')
        }
    }
    const handleBuyNow = async () => {
        if (validations()) {
            setLoadingBuy(true)
            await Backend.payWithStripe(defaultCreditCard, total).
                then(async res => {
                    if (res) {
                        const stripeCargeId = res.id
                        await Backend.createOrder({
                            product_id: product.id,
                            sub_total: subTotal.toString(),
                            tax: tax.toString(),
                            transaction_charges: transectionCharges.toString(),
                            total: total.toString(),
                            private_sale: privateSale,
                            house: delivery_address ? delivery_address.house : 'h#1',
                            street: delivery_address ? delivery_address.street : 's#1',
                            city: delivery_address ? delivery_address.city : 'Daska',
                            state: delivery_address ? delivery_address.state : 'Punjab',
                            zip_code: delivery_address ? delivery_address.zip_code : '51010',
                            seller_id: user.id,
                            buyer_dealer_id: !privateSale ? default_dealer_id ? default_dealer_id : '' : '',
                            address: delivery_address ? (delivery_address.house + ', ' + delivery_address.street + ', ' + delivery_address.city + ', ' + delivery_address.zip_code + ', ' + delivery_address.state) : '',
                            coupon_id: coupon ? coupon.id : '',
                            stripe_charge_id: stripeCargeId
                        }).then(async res => {
                            if (res) {
                                if (!privateSale && default_dealer_id) {
                                    const fulfillmentData = {
                                        dealer_id: default_dealer_id,
                                        seller_id: user.id,
                                        buyer_id: userDetail.id,
                                        // buyer_dealer_id: item.buyer_dealer_id,
                                        // seller_dealer_id: '18',
                                        product_id: product.id,
                                        order_id: res.data.id,
                                        status: fulfillmentStatuses.inProgess,
                                        type: fulfillmentTypes.buyerDealer
                                    }
                                    await Backend.addFulfillment(fulfillmentData)
                                }
                                toggleOrderPlacedPopup()
                            }
                        })
                    }
                })
            setLoadingBuy(false)
        }
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <ProductCardSecondary
                    image={productImage}
                    description={product.title}
                    price={product.price}
                    discountedPrice={product.discounted_price}
                    rating={product.avg_rating}
                    reviewCount={product.reviews_count}
                    moreInfo
                    moreInfoImage={user ? user.profile_image ? user.profile_image : appImages.noUser : appImages.noUser}
                    moreInfoTitle={user ? user.first_name + ' ' + user.last_name : 'Anonymouse'}
                    moreInfoSubTitle={'Seller'}
                    moreInfoRight={
                        <IconButton
                            iconName="trash-2"
                            iconType="feather"
                            iconColor={colors.error}
                            iconSize={totalSize(2)}
                            buttonSize={totalSize(4)}
                        />
                    }
                />
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <LineHorizontal />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Subtotal'}
                    // value={'$ ' + subTotal + (coupon ? ('-' + getDiscountAmount()) : '')}
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
                                            <SmallText style={[appStyles.fontBold]}>${coupon.minimum_order}</SmallText>
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

                <Spacer height={sizes.baseMargin} />
                <Wrapper style={[appStyles.grayWrapper, {}]}>
                    <RowWrapperBasic>
                        <Wrapper flex={2}>
                            <RegularText>Delivery Address</RegularText>
                            {
                                delivery_address ?
                                    <>
                                        <Spacer height={sizes.baseMargin} />
                                        <MediumText numberOfLines={1}>{deliveryAddress}</MediumText>
                                    </>
                                    :
                                    null
                            }
                        </Wrapper>
                        <Wrapper flex={1} style={{ alignItems: 'flex-end', }}>
                            <TinyTitle onPress={() => navigate(routes.deliveryAddress)} style={[appStyles.textPrimaryColor]}>{delivery_address ? 'Change' : 'Add'}</TinyTitle>
                        </Wrapper>
                    </RowWrapperBasic>
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <Wrapper style={[appStyles.borderedWrapper, {}]}>
                    <RowWrapperBasic>
                        <Wrapper flex={1}>
                            <TinyTitle>Private Sale?</TinyTitle>
                        </Wrapper>
                        <SwitchPrimary
                            value={privateSale}
                            onPress={() => setPrivateSale(!privateSale)}
                        />
                    </RowWrapperBasic>
                    <Spacer height={sizes.baseMargin} />
                    <RegularText>
                        If you and the seller are in the same area and don't want to involve a FFL Dealer, then you might enable this
                    </RegularText>
                    {
                        !privateSale ?
                            <Wrapper>
                                <Spacer height={sizes.baseMargin} />
                                <UserCardPrimary
                                    containerStyle={{ marginHorizontal: 0 }}
                                    imageSize={totalSize(4.5)}
                                    imageUri={default_dealer ? default_dealer.profile_image : appImages.noUser}
                                    title={default_dealer ? (default_dealer.first_name + ' ' + default_dealer.last_name) : 'Dealer'}
                                    subTitle={default_dealer_id ? '3 miles away' : ''}
                                    right={
                                        <TinyTitle onPress={() => navigate(routes.fflDealers)} style={[appStyles.textPrimaryColor]}>{default_dealer ? 'Change' : 'Select'}</TinyTitle>
                                    }
                                />
                            </Wrapper>
                            :
                            null
                    }
                </Wrapper>
                <Spacer height={sizes.doubleBaseMargin} />
                <ButtonGradient
                    text="Continue"
                    onPress={handleBuyNow}
                    loading={loadingBuy}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
            <PopupPrimary
                visible={isOrderPlacedPopupVisible}
                toggle={toggleOrderPlacedPopup}
                disableBackDropPress
                disableSwipe
                iconName="check"
                iconType="feather"
                title="Order Placed"
                info={"You'll be notified when your order is accepted and on it's way to delivery." + '\n\n' + "You can track your order in your purchase history."}
                buttonText1="Continue"
                onPressButton1={() => { toggleOrderPlacedPopup(); navigate(routes.mainBottomTab) }}
            />
        </MainWrapper>
    );
}

export default BuyNow;
