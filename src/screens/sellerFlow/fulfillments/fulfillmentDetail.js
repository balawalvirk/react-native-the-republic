import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { BorderedWrapper, ButtonGradient, ColoredWrapper, MainWrapper, MediumText, OptionsPopup, PopupPrimary, RegularText, RowWrapperBasic, Spacer, Toasts, UserCardPrimary, Wrapper } from '../../../components';
import { appImages, appStyles, Backend, colors, fulfillmentStatuses, sizes } from '../../../services';
import { CallButton, ChatButton, FulfillmentCard } from './fulFillmentsList';

function FulfillmentDetail(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //navigation params
    const { item } = route.params
    const { buyer, seller, product, order } = item
    const buyer_dealer = order && order.buyer_dealer
    const seller_dealer = order && order.seller_dealer

    //statues
    const isInProgess = item.status === fulfillmentStatuses.inProgess
    const isReceived = item.status === fulfillmentStatuses.received
    const isShipmentPending = item.status === fulfillmentStatuses.shipmentPending
    const isSentForShipment = item.status === fulfillmentStatuses.sentForShipment
    const isDelivered = item.status === fulfillmentStatuses.delivered
    const isCompleted = item.status === fulfillmentStatuses.completed
    const statusText = isReceived ? "Waiting for collection from Buyer" : isShipmentPending ? "Shipment Pending" : isCompleted ? "Completed" : ""

    const statuses = ['Sent For Shipment', 'Received', 'Completed']
    const buyersDealerStatuses = isInProgess ? ['Received', 'Completed'] : ['Completed']
    const sellersDealerStatuses = isShipmentPending ? ['Sent For Shipment', 'Completed'] : ['Completed']



    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Order #' + (order&&order.order_no),
        });
    }, [navigation]);

    //Local status
    const [isUpdateStatusPopupVisible, setUpdateStatusPopupVisibility] = useState(false)
    const [isNotifyBuyerPopupVisible, setNotifyBuyerPopupVisibility] = useState(false)
    const [loading, setLoading] = useState(false)

    const toggleUpdateStatusPopup = () => setUpdateStatusPopupVisibility(!isUpdateStatusPopupVisible)
    const toggleNotifyBuyerPopup = () => setNotifyBuyerPopupVisibility(!isNotifyBuyerPopupVisible)


    const productImagesParsed = JSON.parse(product.images)
    const productImage = productImagesParsed[0]


    const handleUpdateFulfillmentStatus = async (statusItem, index) => {
        console.log('status-->', statusItem)
        toggleUpdateStatusPopup()
        const status = statusItem === 'Received' ? fulfillmentStatuses.received :
            statusItem === 'Sent For Shipment' ? fulfillmentStatuses.sentForShipment :
                statusItem === 'Completed' ? fulfillmentStatuses.completed : ''
        setLoading(true)
        await Backend.updateFulfillment({ fullfillment_id: item.id, status }).
            then(async res => {
                setLoading(false)
                if (res) {
                    await props.navigation.setParams({ item: res.data })
                    Toasts.success('Status Updated Successfully')
                }
            })

    }
    return (
        <MainWrapper>
            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin} />
                <FulfillmentCard
                    // onPress={() => onPressOrder(item, index)}
                    // containerstyle={
                    //     { marginBottom: sizes.marginVertical }
                    // }
                    image={productImage}
                    description={product.title}
                    discountedPrice={product.discounted_price}
                    price={product.price}
                    sellerImage={seller.profile_image}
                    sellerName={seller.first_name + ' ' + seller.last_name}
                    sellerPhone={'+' + seller.country_phone_code + seller.phone}
                    orderNumber={order && order.order_no}
                    buyerImage={buyer.profile_image}
                    buyerName={buyer.first_name + ' ' + buyer.last_name}
                    buyerPhone={'+' + buyer.country_phone_code + buyer.phone}
                    // buyerAddress={'14 Wall Street, New York City, NY, USA'}
                    status={item.status}
                    showContactOptions={true}
                />
                <Spacer height={sizes.baseMargin} />
                {
                    isShipmentPending ?
                        buyer_dealer ?
                            <Wrapper>
                                <UserCardPrimary
                                    // containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical / 2 }}
                                    imageUri={buyer_dealer.profile_image}
                                    title={buyer_dealer.first_name + ' ' + buyer_dealer.last_name}
                                    subTitle={'FFL Dealer'}
                                    top={
                                        <RowWrapperBasic style={{ marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical / 2 }}>
                                            <Wrapper flex={1}>
                                                <RegularText style={[appStyles.textDarkGray]}>Please send the product to this dealer</RegularText>
                                            </Wrapper>
                                            <Icon
                                                name="info"
                                                type="feather"
                                                color={colors.appColor2}
                                                size={totalSize(2)}
                                            />
                                        </RowWrapperBasic>
                                    }
                                    bottom={
                                        <Wrapper>
                                            <Wrapper style={{ marginHorizontal: sizes.marginHorizontalSmall, marginTop: sizes.marginVertical / 2 }}>
                                                <RegularText style={[appStyles.textPrimaryColor, appStyles.fontBold]}>Delivery Address</RegularText>
                                                <Spacer height={sizes.smallMargin} />
                                                <MediumText>{order && order.address}</MediumText>
                                            </Wrapper>
                                        </Wrapper>
                                    }
                                    right={
                                        <RowWrapperBasic>
                                            <ChatButton
                                                onPress={() => { }}
                                            />
                                            <Spacer width={sizes.marginHorizontal} />
                                            <CallButton
                                                onPress={() => { }}
                                            />
                                        </RowWrapperBasic>
                                    }

                                />
                            </Wrapper>
                            :
                            null
                        :
                        null
                }
                {
                    isInProgess ?
                        <Wrapper>
                           {
                               seller_dealer?
                               <UserCardPrimary
                               // containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical / 2 }}
                               imageUri={seller_dealer.profile_image ? seller_dealer.profile_image : appImages.noUser}
                               title={seller_dealer.first_name + ' ' + seller_dealer.last_name}
                               subTitle={'FFL Dealer'}
                               top={
                                   <RowWrapperBasic style={{ marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical / 2 }}>
                                       <Wrapper flex={1}>
                                           <RegularText style={[appStyles.textDarkGray]}>You will recieve product from this dealer</RegularText>
                                       </Wrapper>
                                       <Icon
                                           name="info"
                                           type="feather"
                                           color={colors.appColor2}
                                           size={totalSize(2)}
                                       />
                                   </RowWrapperBasic>
                               }
                               right={
                                   <RowWrapperBasic>
                                       <ChatButton
                                           onPress={() => { }}
                                       />
                                       <Spacer width={sizes.marginHorizontal} />
                                       <CallButton
                                           onPress={() => { }}
                                       />
                                   </RowWrapperBasic>
                               }

                           />
                           :
                           <ColoredWrapper>
                               <MediumText>No Dealer has been selected by the seller yet</MediumText>
                           </ColoredWrapper>
                           }
                        </Wrapper>
                        :
                        null
                }
            </Wrapper>
            <Wrapper>
                {
                    isReceived ?
                        <>
                            <ButtonGradient
                                text="Notify Buyer For Collection"
                                onPress={toggleNotifyBuyerPopup}
                            />
                            <Spacer height={sizes.baseMargin} />
                        </>
                        :
                        null
                }
                {
                    isInProgess || isReceived || isShipmentPending || isDelivered || isSentForShipment ?
                        <>
                            <ButtonGradient
                                text="Update Status"
                                onPress={toggleUpdateStatusPopup}
                                loading={loading}
                            />
                            <Spacer height={sizes.doubleBaseMargin} />
                        </>
                        :
                        null
                }
            </Wrapper>
            <OptionsPopup
                visible={isUpdateStatusPopupVisible}
                toggle={toggleUpdateStatusPopup}
                onPressStatus={handleUpdateFulfillmentStatus}
                //options={statuses}
                options={isInProgess || isReceived ? buyersDealerStatuses : isShipmentPending || isSentForShipment ? sellersDealerStatuses : []}
            />
            <PopupPrimary
                visible={isNotifyBuyerPopupVisible}
                toggle={toggleNotifyBuyerPopup}
                iconName="check"
                iconType="feather"
                title="The buyer has been notified that their product is ready for pickup"
                onPressButton1={toggleNotifyBuyerPopup}
                buttonText1={"Continue"}
            />
        </MainWrapper>
    );
}

export default FulfillmentDetail;
