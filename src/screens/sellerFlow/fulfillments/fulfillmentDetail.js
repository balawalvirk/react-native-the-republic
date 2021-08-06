import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { ButtonGradient, MainWrapper, MediumText, OptionsPopup, PopupPrimary, RegularText, RowWrapperBasic, Spacer, UserCardPrimary, Wrapper } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';
import { CallButton, ChatButton, FulfillmentCard } from './fulFillmentsList';

function FulfillmentDetail(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //navigation params
    const { item } = route.params
    const { buyer, seller } = item
    const buyerDealer = buyer.dealer
    const sellerDealer = seller.dealer
    const statuses = ['Sent For Shipment', 'Received', 'Completed']

    const isReceived = item.status === 'received'
    const isShipmentPending = item.status === 'shipmentPending'
    const isCompleted = item.status === 'completed'
    const statusText = isReceived ? "Waiting for collection from Buyer" : isShipmentPending ? "Shipment Pending" : isCompleted ? "Completed" : ""

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Order #' + item.id,
        });
    }, [navigation]);

    //Local status
    const [isUpdateStatusPopupVisible, setUpdateStatusPopupVisibility] = useState(false)
    const [isNotifyBuyerPopupVisible, setNotifyBuyerPopupVisibility] = useState(false)

    const toggleUpdateStatusPopup = () => setUpdateStatusPopupVisibility(!isUpdateStatusPopupVisible)
    const toggleNotifyBuyerPopup = () => setNotifyBuyerPopupVisibility(!isNotifyBuyerPopupVisible)

    return (
        <MainWrapper>
            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin} />
                <FulfillmentCard
                    // onPress={() => onPressOrder(item, index)}
                    // containerstyle={
                    //     { marginBottom: sizes.marginVertical }
                    // }
                    image={item.image}
                    description={item.description}
                    newPrice={item.new_price}
                    oldPrice={item.old_price}
                    sellerImage={seller.image}
                    sellerName={seller.name}
                    orderNumber={item.id}
                    buyerImage={buyer.image}
                    buyerName={buyer.name}
                    // buyerAddress={'14 Wall Street, New York City, NY, USA'}
                    status={item.status}
                    showContactOptions={true}
                />
                <Spacer height={sizes.baseMargin} />
                {
                    isShipmentPending ?
                        <Wrapper>
                            <UserCardPrimary
                                // containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical / 2 }}
                                imageUri={buyerDealer.image}
                                title={buyerDealer.name}
                                subTitle={'FFL Dealer'}
                                top={
                                    <RowWrapperBasic style={{marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical / 2}}>
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
                                            <MediumText>14 Wall Street, New York City, NY, USA </MediumText>
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
                    isReceived || isShipmentPending ?
                        <>
                            <ButtonGradient
                                text="Update Status"
                                onPress={toggleUpdateStatusPopup}
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
                onPressStatus={(item, index) => {
                    console.log('status-->', item)
                    toggleUpdateStatusPopup()
                }}
                options={statuses}
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
