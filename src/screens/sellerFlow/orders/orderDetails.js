import React, { Component, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { AbsoluteWrapper, ButtonColoredSmall, ButtonGradient, ComponentWrapper, IconWithText, LineHorizontal, MainWrapper, MediumText, ProductCardSecondary, RegularText, RowWrapperBasic, Spacer, TitleValue, Wrapper, OrderStatusWizard, TinyTitle, UserCardPrimary, PopupPrimary, ReviewCardPrimary, ButtonColored, OptionsPopup, Toasts, LoaderAbsolute } from '../../../components';
import { appImages, appStyles, Backend, colors, fulfillmentStatuses, orderStatuses, routes, sizes } from '../../../services';
import { OrdersList } from './ordersList';



function OrderDetail(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //navigation params
    const orderDetail = route.params.order
    // const { user } = order

    const steps = ['Order\nrecieved', 'Order\naccepted', 'Delivery\non the way', 'Delivered\nto customer']
    const statuses = ['Shipping', 'Delivered', 'Cancel Order']



    //redux states
    const user = useSelector(state => state.user)
    const { userDetail } = user
    //Local status

    const [order, setOrder] = useState(orderDetail)
    const [loadingAcceptIndex, setLoadingAcceptIndex] = useState(-1)
    const [loadingCancelIndex, setLoadingCancelIndex] = useState(-1)
    const [isLoadingStatus, setLoadingStatus] = useState(false)
    const [isUpdateStatusPopupVisible, setUpdateStatusPopupVisibility] = useState(false)

    const isNew = order.status === orderStatuses.pending
    const isActive = order.status === orderStatuses.accepted || order.status === orderStatuses.shipping
    const isDelivered = order.status === orderStatuses.delivered
    const isCompleted = order.status === orderStatuses.completed
    const isCancelled = order.status === orderStatuses.cancelled
    const orderStep = isNew ? 1 : isActive ? 2 : isDelivered ? 3 : isCompleted ? 4 : 1
    const statusText = isNew ? "New" : isActive ? "Waiting for Shipment" : isDelivered ? "Waiting for review" : isCompleted ? "Completed" : isCancelled ? "Cancelled" : ""

    const toggleUpdateStatusPopup = () => setUpdateStatusPopupVisibility(!isUpdateStatusPopupVisible)


    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Order #' + order.order_no,
        });
    }, [navigation]);

    const handleAcceptOrder = async (item, index) => {
        setLoadingAcceptIndex(index)
        await Backend.updateOrderStatus({
            order_id: item.id,
            status: orderStatuses.accepted
        }).then(async res => {
            if (item.private_sale === false) {
                 await Backend.updateOrder({order_id:item.id,seller_dealer_id:'18'})
                // const fulfillmentData = {
                //     dealer_id: '18',
                //     seller_id: userDetail.id,
                //     buyer_id:item.user.id,
                //     buyer_dealer_id:item.buyer_dealer_id,
                //     seller_dealer_id:'18',
                //     product_id:item.product.id,
                //     status:fulfillmentStatuses.shipmentPending
                // }
                // await Backend.addFulfillment(fulfillmentData)
            }
            setLoadingAcceptIndex(-1)
            if (res) {
                setOrder(res.order)
                Toasts.success('Order has been accepted')
            }
        })
    }

    const handleCancelOrder = async (item, index) => {
        setLoadingCancelIndex(index)
        await Backend.updateOrderStatus({
            order_id: item.id,
            status: orderStatuses.cancelled
        }).
            then(async res => {
                setLoadingCancelIndex(-1)
                if (res) {
                    setOrder(res.order)
                    Toasts.success('Order has been cancelled')
                }
            })
    }

    const handleUpdateOrderStatus = async (selectedStatus, index) => {
        const tempStatus = selectedStatus === 'Shipping' ? orderStatuses.shipping :
            selectedStatus === 'Delivered' ? orderStatuses.delivered :
                selectedStatus === 'Cancel Order' ? orderStatuses.cancelled : ''
        toggleUpdateStatusPopup()
        setLoadingStatus(true)
        await Backend.updateOrderStatus({
            order_id: order.id,
            status: tempStatus
        }).
            then(async res => {
                setLoadingStatus(false)
                if (res) {
                    setOrder(res.order)
                    Toasts.success('Order status updated')
                }
            })
    }

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
                        onpressAccept={handleAcceptOrder}
                        onpressCancel={handleCancelOrder}
                        loadingAcceptIndex={loadingAcceptIndex}
                        loadingCancelIndex={loadingCancelIndex}
                    />

                </Wrapper>
                {
                    isNew  ?
                        order.private_sale === true ?
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
                            order.private_sale === false ?
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
                    <MediumText>{order.address}</MediumText>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <LineHorizontal color={colors.appBgColor4} />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Subtotal'}
                    value={'$ ' + order.sub_total}
                />
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Tax (10%)'}
                    value={'$ ' + order.tax}
                />
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Transaction Charges'}
                    value={'$ ' + order.transaction_charges}
                />
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <LineHorizontal color={colors.appBgColor4} />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <TitleValue
                    title={'Total'}
                    value={'$ ' + order.total}
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
                    handleUpdateOrderStatus(item)
                }}
                options={statuses}
            />
            <LoaderAbsolute
                isVisible={isLoadingStatus}
                title="Updating Order Status"
            />
        </MainWrapper>
    );
}

export default OrderDetail;


