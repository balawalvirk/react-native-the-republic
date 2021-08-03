import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { ButtonGradient, ComponentWrapper, LineHorizontal, MainWrapper, MediumText, PopupPrimary, RegularText, RowWrapperBasic, SmallTitle, Spacer, TextInputUnderlined, TimeSlotCard, TitleValue, TraningCard, Wrapper, TinyTitle, KeyboardAvoidingScrollView } from '../../../components';
import { appStyles, colors, routes, sizes } from '../../../services';

function Payment(props) {
    const { navigate } = props.navigation
    const { training, timeSlot } = props.route.params

    //local states
    const [coupon, setCoupon] = useState('')
    const [isOrderPlacedPopupVisible, setOrderPlacedPopupVisible] = useState(false)

    const toggleOrderPlacedPopup = () => setOrderPlacedPopupVisible(!isOrderPlacedPopupVisible)
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <TraningCard
                    // onPress={() => navigate(routes.selectDateTime, { training: training })}
                    title={training.title}
                    description={training.description}
                    duration={training.duration}
                    charges={training.charges}
                    location={training.location}
                    userName={training.user.name}
                    userImage={training.user.image}
                    userRating={4.6}
                    userReviewsCount={'234'}
                />
                <Spacer height={sizes.smallMargin} />
                <TimeSlotCard
                    // onPress={() => {
                    //     navigate(routes.payment, { training, timeSlot: timeSlot })
                    // }}
                    date={timeSlot.date}
                    startTime={timeSlot.startTime}
                    endTime={timeSlot.endTime}
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
                <Spacer height={sizes.doubleBaseMargin} />
                <ButtonGradient
                    text="Proceed with Payment"
                    onPress={() => {
                        toggleOrderPlacedPopup()
                    }}
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
                onPressButton1={() => { toggleOrderPlacedPopup(); navigate(routes.mainBottomTab) }}
                topMargin={sizes.statusBarHeight + height(2.5)}
            >
                <Spacer height={sizes.baseMargin} />
                <TraningCard
                    // onPress={() => navigate(routes.selectDateTime, { training: training })}
                    title={training.title}
                    description={training.description}
                    duration={training.duration}
                    charges={training.charges}
                    location={training.location}
                    userName={training.user.name}
                    userImage={training.user.image}
                    userRating={4.6}
                    userReviewsCount={'234'}
                />
                <Spacer height={sizes.smallMargin} />
                <TimeSlotCard
                    // onPress={() => {
                    //     navigate(routes.payment, { training, timeSlot: timeSlot })
                    // }}
                    date={timeSlot.date}
                    startTime={timeSlot.startTime}
                    endTime={timeSlot.endTime}
                />
                <Spacer height={sizes.baseMargin} />
            </PopupPrimary>
        </MainWrapper>
    );
}

export default Payment;
