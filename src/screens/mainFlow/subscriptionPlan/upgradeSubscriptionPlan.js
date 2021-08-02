import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { ButtonGradient, ComponentWrapper, LineHorizontal, MainWrapper, MediumText, PlanCard, PopupPrimary, RegularText, RowWrapperBasic, SmallTitle, Spacer, TinyTitle, TitleValue, Wrapper } from '../../../components';
import { appStyles, colors, routes, sizes } from '../../../services';

function UpgradeSubscriptionPlan(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { plan } = route.params

    const [isOrderPlacedPopupVisible, setOrderPlacedPopupVisible] = useState(false)

    const toggleOrderPlacedPopup = () => setOrderPlacedPopupVisible(!isOrderPlacedPopupVisible)

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
                <LineHorizontal color={colors.appBgColor4}/>
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
                        <Spacer height={sizes.smallMargin} />
                        <MediumText>**** **** **** 4464</MediumText>
                    </Wrapper>
                    <TinyTitle
                        onPress={() => navigate(routes.paymentMethods)}
                        style={[appStyles.textPrimaryColor]}>Change</TinyTitle>
                </RowWrapperBasic>
            </Wrapper>
            <Spacer height={sizes.doubleBaseMargin} />
            <ButtonGradient
            text="Upgrade Subscription Plan"
            onPress={toggleOrderPlacedPopup}
            />
            <PopupPrimary
                visible={isOrderPlacedPopupVisible}
                toggle={toggleOrderPlacedPopup}
                iconName="check"
                iconType="feather"
                title="Subscription Plan Upgraded"
               // info={"You'll be notified when your order is accepted and on it's way to delivery." + '\n\n' + "You can track your order in your purchase history."}
                buttonText1="Continue"
                onPressButton1={() => { toggleOrderPlacedPopup(); navigate(routes.mainBottomTab) }}
                topMargin={height(65)}
            />
        </MainWrapper>
    );
}

export default UpgradeSubscriptionPlan;
