import React, { Component, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ButtonGradient, ComponentWrapper, IconButton, KeyboardAvoidingScrollView, LineHorizontal, MainWrapper, MediumText, PopupPrimary, ProductCardSecondary, RegularText, RowWrapper, RowWrapperBasic, SmallTitle, Spacer, SwitchPrimary, TextInputUnderlined, TinyTitle, TitleInfoPrimary, TitlePrimary, UserCardPrimary, Wrapper, TitleValue } from '../../../components';
import { appImages, appStyles, colors, routes, sizes } from '../../../services';
import styles from './styles'




function BuyNow(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //navigation params
    const { product } = route.params
    const { user } = product
    //local states
    const [coupon, setCoupon] = useState('')
    const [privateSale, setPrivateSale] = useState(false)
    const [isOrderPlacedPopupVisible, setOrderPlacedPopupVisible] = useState(false)

    const toggleOrderPlacedPopup = () => setOrderPlacedPopupVisible(!isOrderPlacedPopupVisible)


    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <ProductCardSecondary
                    image={product.image}
                    description={product.description}
                    discountedPrice={product.new_price}
                    price={product.old_price}
                    rating={product.rating}
                    reviewCount={product.review_count}
                    moreInfo
                    moreInfoImage={user.image}
                    moreInfoTitle={user.name}
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
                    value={'$ 749.99'}
                />
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Tax (10%)'}
                    value={'$ 74.99'}
                />
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Transaction Charges'}
                    value={'$ 10.00'}
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
                        <SmallTitle style={[appStyles.textPrimaryColor]}>$ 834.98</SmallTitle>
                    </RowWrapperBasic>
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <Wrapper style={[appStyles.grayWrapper, {}]}>
                    <RowWrapperBasic>
                        <Wrapper flex={1}>
                            <RegularText>Payment Method</RegularText>
                            <Spacer height={sizes.baseMargin} />
                            <MediumText>**** **** **** 4464</MediumText>
                        </Wrapper>
                        <TinyTitle onPress={() => navigate(routes.paymentMethods)} style={[appStyles.textPrimaryColor]}>Change</TinyTitle>
                    </RowWrapperBasic>
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <Wrapper style={[appStyles.grayWrapper, {}]}>
                    <RowWrapperBasic>
                        <Wrapper flex={2}>
                            <RegularText>Delivery Address</RegularText>
                            <Spacer height={sizes.baseMargin} />
                            <MediumText numberOfLines={1}>14 Wall Street, New York, United states of america</MediumText>
                        </Wrapper>
                        <Wrapper flex={1} style={{ alignItems: 'flex-end', }}>
                            <TinyTitle onPress={() => navigate(routes.deliveryAddress)} style={[appStyles.textPrimaryColor]}>Change</TinyTitle>
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
                                    imageUri={appImages.user5}
                                    title={'Alex Huck'}
                                    subTitle={'3 miles away'}
                                    right={
                                        <TinyTitle onPress={() => navigate(routes.fflDealers)} style={[appStyles.textPrimaryColor]}>Change</TinyTitle>
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
                    onPress={() => {
                        toggleOrderPlacedPopup()
                    }}
                />
                <Spacer height={sizes.doubleBaseMargin} />
            </KeyboardAvoidingScrollView>
            <PopupPrimary
                visible={isOrderPlacedPopupVisible}
                toggle={toggleOrderPlacedPopup}
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
