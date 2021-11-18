import React, { Component, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { ButtonGradient, ComponentWrapper, IconButton, KeyboardAvoidingScrollView, LineHorizontal, MainWrapper, MediumText, PopupPrimary, ProductCardSecondary, RegularText, RowWrapper, RowWrapperBasic, SmallTitle, Spacer, SwitchPrimary, TextInputUnderlined, TinyTitle, TitleInfoPrimary, TitlePrimary, UserCardPrimary, Wrapper, TitleValue, Toasts } from '../../../components';
import { appImages, appStyles, Backend, colors, fulfillmentStatuses, fulfillmentTypes, HelpingMethods, routes, sizes } from '../../../services';
import styles from './styles'




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
    const [coupon, setCoupon] = useState('')
    const [privateSale, setPrivateSale] = useState(false)
    const [defaultCreditCard, setDefaultCreditCard] = useState(null)
    const [loadingBuy, setLoadingBuy] = useState(false)
    const [isOrderPlacedPopupVisible, setOrderPlacedPopupVisible] = useState(false)

    const toggleOrderPlacedPopup = () => setOrderPlacedPopupVisible(!isOrderPlacedPopupVisible)

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

    const productImages = images ? JSON.parse(images) : null
    const productImage = productImages ? productImages[0] : appImages.noImageAvailable

    const productPrice = discounted_price ? discounted_price : price ? price : 0
    const subTotal = Number(productPrice)
    const tax = HelpingMethods.getRoundedValue((Number(productPrice) / 100) * 10)
    const transectionCharges = 10
    const total = subTotal + tax + transectionCharges


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
                address: delivery_address ? (delivery_address.house + ', ' + delivery_address.street + ', ' + delivery_address.city + ', ' + delivery_address.zip_code + ', ' + delivery_address.state) : ''
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
                            iconSize={totalSize(2.5)}
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
                <TextInputUnderlined
                    title="Discount Coupon"
                    value={coupon}
                    onChangeText={(t) => setCoupon(t)}
                    containerStyle={{ marginHorizontal: sizes.marginHorizontal }}
                    iconNameRight={coupon ? "check-circle" : null}
                    iconTypeRight="feather"
                    iconColorRight={colors.success}
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
                                    style={[appStyles.textPrimaryColor]}>{defaultCreditCard?'Change':'Add'}</TinyTitle>
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
