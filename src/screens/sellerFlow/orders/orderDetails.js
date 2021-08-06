import React, { Component, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { AbsoluteWrapper, ButtonColoredSmall, ButtonGradient, ComponentWrapper, IconWithText, LineHorizontal, MainWrapper, MediumText, ProductCardSecondary, RegularText, RowWrapperBasic, Spacer, TitleValue, Wrapper, OrderStatusWizard, TinyTitle, UserCardPrimary, PopupPrimary, ReviewCardPrimary, ButtonColored, OptionsPopup } from '../../../components';
import { appImages, appStyles, colors, routes, sizes } from '../../../services';
import { OrdersList } from './ordersList';



function OrderDetail(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //navigation params
    const { order } = route.params
    const { user } = order
    const steps = ['Order\nrecieved', 'Order\naccepted', 'Delivery\non the way', 'Delivered\nto customer']
    const statuses = ['Shipping', 'Delivered', 'Cancel Order']

    const isNew = order.status === 'new'
    const isActive = order.status === 'active'
    const isDelivered = order.status === 'delivered'
    const isCompleted = order.status === 'completed'
    const isCancelled = order.status === 'cancelled'
    const orderStep = isNew ? 1 : isActive ? 2 : isDelivered ? 3 : isCompleted ? 4 : 1
    const statusText = isNew ? "New" : isActive ? "Waiting for Shipment" : isDelivered ? "Waiting for review" : isCompleted ? "Completed" : isCancelled ? "Cancelled" : ""


    //Local status
    const [isUpdateStatusPopupVisible, setUpdateStatusPopupVisibility] = useState(false)

    const toggleUpdateStatusPopup = () => setUpdateStatusPopupVisibility(!isUpdateStatusPopupVisible)


    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Order #' + order.id,
        });
    }, [navigation]);

    return (
        <MainWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Spacer height={sizes.baseMargin} />
                {
                    !isCancelled ?
                        <>
                            <OrderStatusWizard
                                activeStep={orderStep}
                                steps={steps}
                            />
                            <Spacer height={sizes.baseMargin} />
                        </>
                        :
                        null
                }
                <Wrapper>
                    <OrdersList
                        data={[order]}
                        onPressOrder={() => { }}
                        onpressAccept={(item, index) => { }}
                        onpressCancel={(item, index) => { }}
                    />

                </Wrapper>
                {
                    isNew || isActive ?
                        order.isPrivate ?
                            <Wrapper style={[appStyles.grayWrapper, { marginBottom: sizes.baseMargin, backgroundColor: colors.success }]}>
                                <RowWrapperBasic>
                                    <Wrapper flex={1}>
                                        <TinyTitle style={[appStyles.textWhite]}>Private Sale</TinyTitle>
                                    </Wrapper>
                                    {/* <SwitchPrimary
                                    value={privateSale}
                                    onPress={() => setPrivateSale(!privateSale)}
                                /> */}
                                </RowWrapperBasic>
                                <Spacer height={sizes.baseMargin} />
                                <RegularText style={[appStyles.textWhite]}>
                                    The buyer want this sale to be private.
                                </RegularText>
                            </Wrapper>
                            :
                            !order.isPrivate ?
                                <Wrapper style={[appStyles.borderedWrapper, { marginBottom: sizes.baseMargin }]}>
                                    <RowWrapperBasic>
                                        <Wrapper flex={1}>
                                            <TinyTitle>Select Your Nearest Dealer</TinyTitle>
                                        </Wrapper>
                                        {/* <SwitchPrimary
                                    value={privateSale}
                                    onPress={() => setPrivateSale(!privateSale)}
                                /> */}
                                    </RowWrapperBasic>
                                    <Spacer height={sizes.baseMargin} />
                                    <RegularText style={[appStyles.textDarkGray]}>
                                        The buyer opted to this sale through FFL Dealer. Please select you nearest FFL Dealer to deliver the product.
                                    </RegularText>
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

                                </Wrapper>
                                :
                                null
                        :
                        isDelivered || isCompleted ?
                            order.review ?
                                <ReviewCardPrimary
                                    containerStyle={{ marginBottom: sizes.baseMargin }}
                                    imageUrl={appImages.user3}
                                    title="Davin Grimes"
                                    rating={4.6}
                                    reviewCount={233}
                                    comment="Phasellus risus turpis, pretium sit amet magna non, molestie ultricies enim. Nullam pulvinar felis at metus malesuada, nec convallis lacus commodo."
                                    date="2 months ago"
                                />
                                :
                                null
                            :
                            null
                }
                <ComponentWrapper style={{}}>
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
            {
                isCompleted || isActive ?
                    <AbsoluteWrapper style={{ bottom: sizes.doubleBaseMargin, right: 0, left: 0 }}>
                        <ButtonGradient
                            text={isCompleted ? "View Invoice" : isActive ? "Update Status" : ''}
                            onPress={() => {
                                isCompleted ?
                                    navigate(routes.orderInvoice, { order }) :
                                    isActive ?
                                        toggleUpdateStatusPopup() :
                                        null
                            }}
                        />
                    </AbsoluteWrapper>
                    :
                    isCancelled ?
                        <Wrapper>
                            <ButtonColored
                                text="You cancelled this order"
                                buttonColor={colors.appBgColor3}
                                textStyle={{ color: appStyles.textGray.color }}
                            />
                            <Spacer height={sizes.doubleBaseMargin} />
                        </Wrapper>
                        :
                        null
            }
            <OptionsPopup
                visible={isUpdateStatusPopupVisible}
                toggle={toggleUpdateStatusPopup}
                onPressStatus={(item, index) => {
                    console.log('status-->', item)
                    toggleUpdateStatusPopup()
                }}
                options={statuses}
                
            />
        </MainWrapper>
    );
}

export default OrderDetail;


