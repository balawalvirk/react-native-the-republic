import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { AbsoluteWrapper, ButtonColoredSmall, ButtonGradient, ComponentWrapper, IconWithText, LineHorizontal, MainWrapper, MediumText, ProductCardSecondary, RegularText, RowWrapperBasic, Spacer, TitleValue, Wrapper } from '../../../components';
import { appStyles, colors, routes, sizes } from '../../../services';
import { OrdersList } from './ordersList';


const OrderStatusWizard = ({ step }) => {
    const steps = ['Order\nrecieved', 'Order\naccepted', 'Delivery\non the way', 'Delivered\nto customer']


    return (
        <Wrapper>
            <RowWrapperBasic style={{ justifyContent: 'center', }}>
                {
                    steps.map((item, index) => {
                        const wizardStep = index + 1
                        return (
                            <RowWrapperBasic style={{ alignItems: 'flex-start', }}>
                                {
                                    index != 0 ?
                                        <LineHorizontal
                                            height={2}
                                            width={width(12)}
                                            color={wizardStep <= step ? colors.success : colors.appBgColor4}
                                            style={{ marginTop: totalSize(1.5), marginHorizontal: sizes.marginHorizontalSmall }}
                                        />
                                        :
                                        null
                                }
                                <IconWithText
                                    iconName="check-circle"
                                    iconType="feather"
                                    iconSize={totalSize(3)}
                                    tintColor={wizardStep <= step ? colors.success : colors.appBgColor4}
                                    text={item}
                                    direction="column"
                                    textStyle={[appStyles.textRegular, appStyles.textCenter]}
                                    textContainerStyle={{ position: 'absolute', width: width(20), top: totalSize(3) }}
                                />

                            </RowWrapperBasic>
                        )
                    })
                }
            </RowWrapperBasic>
            <Spacer height={sizes.doubleBaseMargin} />
        </Wrapper>
    )
}
function OrderDetail(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //navigation params
    const { order } = route.params
    const { user } = order

    const orderStep = order.status === 'active' ? 2 : order.status === 'completed' ? 4 : 1


    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Order #' + order.id,
            // headerRight: () => (
            //     <ComponentWrapper>
            //         <ButtonColoredSmall
            //             text="Cancel Order"
            //             buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: colors.error }}
            //         />
            //     </ComponentWrapper>
            // )
        });
    }, [navigation]);

    return (
        <MainWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Spacer height={sizes.baseMargin} />
                <OrderStatusWizard
                    step={orderStep}
                />
                <Wrapper>
                    <OrdersList
                        data={[order]}
                    />
                </Wrapper>
                <ComponentWrapper style={{ }}>
                    <RegularText style={[appStyles.textPrimaryColor, appStyles.fontBold]}>Delivery Address</RegularText>
                    <Spacer height={sizes.smallMargin} />
                    <MediumText>14 Wall Street, New York City, NY, USA </MediumText>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <LineHorizontal color={colors.appBgColor4} />
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
                <ComponentWrapper>
                    <LineHorizontal color={colors.appBgColor4} />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Total'}
                    value={'$ 834.98'}
                    titleStyle={[appStyles.h5]}
                    valueStyle={[appStyles.h5, appStyles.textPrimaryColor]}
                />
                <Spacer height={sizes.doubleBaseMargin * 3} />
            </ScrollView>
            <AbsoluteWrapper style={{ bottom: sizes.doubleBaseMargin, right: 0, left: 0 }}>
                <ButtonGradient
                    text="View Invoice"
                    onPress={() => navigate(routes.orderInvoice, { order })}
                />
            </AbsoluteWrapper>
        </MainWrapper>
    );
}

export default OrderDetail;
