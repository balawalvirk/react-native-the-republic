import { ButtonColored, ButtonColoredSmall, IconButton, MediumText, ProductCardSecondary, RegularText, RowWrapper, RowWrapperBasic, Spacer, TinyTitle, UserCardPrimary, Wrapper } from "../../../components"
import { appStyles, colors, fontSize, fulfillmentStatuses, HelpingMethods, sizes } from "../../../services"
import React from 'react'
import { FlatList } from "react-native"
import { totalSize } from "react-native-dimension"

export const ContactButtons = ({ iconName, iconType, onPress }) => {
    return (
        <IconButton
            iconName={iconName}
            iconType={iconType}
            iconSize={totalSize(2.5)}
            buttonStyle={{ borderRadius: sizes.baseRadius }}
            buttonSize={totalSize(4.5)}
            buttonColor={colors.appColor1}
            iconColor={colors.appTextColor6}
            onPress={onPress}
        />
    )
}

export const ChatButton = ({ onPress }) => {
    return (
        <ContactButtons
            iconName="message-circle"
            iconType="feather"
            onPress={onPress}
        />
    )
}
export const CallButton = ({ onPress }) => {
    return (
        <ContactButtons
            iconName="phone"
            iconType="feather"
            onPress={onPress}
        />
    )
}
export const FulfillmentCard = ({
    animation, duration,
    onPress, image, description,
    discountedPrice, price,
    sellerImage, sellerName, sellerPhone,
    orderNumber,
    buyerImage, buyerName, buyerPhone, buyerAddress,
    containerstyle, status, showContactOptions
}) => {

    const isInProgess = status === fulfillmentStatuses.inProgess
    const isReceived = status === fulfillmentStatuses.received
    const isShipmentPending = status === fulfillmentStatuses.shipmentPending
    const isSentForShipment = status === fulfillmentStatuses.sentForShipment
    const isDelivered = status === fulfillmentStatuses.delivered
    const isCompleted = status === fulfillmentStatuses.completed
    const statusText = isInProgess ? 'In Progress' : isReceived ? "Waiting for collection from Buyer" : isShipmentPending ? "Shipment Pending" :isSentForShipment?'Sent For Shipment': isDelivered ? 'Delivered' : isCompleted ? "Completed" : ""


    return (
        <ProductCardSecondary
            containerstyle={containerstyle}
            animation={animation}
            duration={duration}
            onPress={onPress}
            image={image}
            imag
            description={description}
            discountedPrice={discountedPrice}
            price={price}
            content={
                <Wrapper style={{ alignItems: 'flex-end', }}>
                    <Spacer height={sizes.smallMargin} />
                    <ButtonColoredSmall
                        text={statusText}
                        buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: isCompleted ? colors.success : colors.appColor1, }}
                        textStyle={{ fontSize: isReceived ? fontSize.small : fontSize.regular }}
                    />
                </Wrapper>
            }
            perMoreInfo={
                <UserCardPrimary
                    containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical / 2 }}
                    imageUri={sellerImage}
                    title={sellerName}
                    subTitle={'Seller'}
                    bottom={
                        <Wrapper style={{ marginHorizontal: sizes.marginHorizontalSmall }}>
                            <Spacer height={sizes.smallMargin} />
                            <TinyTitle>Order #{orderNumber}</TinyTitle>
                        </Wrapper>
                    }
                    right={
                        showContactOptions ?
                            <RowWrapperBasic>
                                <ChatButton
                                    onPress={() => { HelpingMethods.smsComposer(sellerPhone) }}
                                />
                                <Spacer width={sizes.marginHorizontal} />
                                <CallButton
                                    onPress={() => { HelpingMethods.dialPhoneNumber(sellerPhone) }}
                                />
                            </RowWrapperBasic>
                            :
                            null
                    }
                />
            }
            moreInfoImage={buyerImage}
            moreInfoTitle={buyerName}
            moreInfoSubTitle={'Buyer'}
            moreInfoContainerStyle={[{ marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical / 2 }]}
            moreInfoRight={
                showContactOptions ?
                    <RowWrapperBasic>
                        <ChatButton
                            onPress={() => { HelpingMethods.smsComposer(sellerPhone) }}
                        />
                        <Spacer width={sizes.marginHorizontal} />
                        <CallButton
                            onPress={() => { HelpingMethods.dialPhoneNumber(sellerPhone) }}
                        />
                    </RowWrapperBasic>
                    :
                    null
            }
            moreInfo={
                <Wrapper>
                    {
                        buyerAddress ?
                            <Wrapper style={{ marginHorizontal: sizes.marginHorizontalSmall, marginTop: sizes.marginVertical / 2 }}>
                                <RegularText style={[appStyles.textPrimaryColor, appStyles.fontBold]}>Delivery Address</RegularText>
                                <Spacer height={sizes.smallMargin} />
                                <MediumText>{buyerAddress}</MediumText>
                            </Wrapper>
                            :
                            null
                    }
                </Wrapper>
            }
        >

        </ProductCardSecondary>
    )
}
export function FulfillmentsList({ data, onPressOrder, ListHeaderComponent, ListFooterComponent }) {
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            key={'key'}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(item, index) => (index + 1).toString()}
            renderItem={({ item, index }) => {
                const { seller, buyer, product,order } = item
                //const {buyer_dealer,seller_dealer}=order
                // const isInProgess = item.status === fulfillmentStatuses.inProgess
                // const isReceived = item.status === fulfillmentStatuses.received
                // const isShipmentPending = item.status === fulfillmentStatuses.shipmentPending
                // const isDelivered = item.status === fulfillmentStatuses.delivered
                // const isCompleted = item.status === fulfillmentStatuses.completed
                // const statusText = isReceived ? "Waiting for collection from Buyer" : isShipmentPending ? "Shipment Pending" : isCompleted ? "Completed" : ""

                const productImagesParsed = JSON.parse(product.images)
                const productImage = productImagesParsed[0]
                return (
                    <FulfillmentCard
                        onPress={() => onPressOrder(item, index)}
                        animation={index <= 5 ? 'fadeInUp' : null}
                        duration={300 + (50 * (index + 1))}
                        containerstyle={
                            { marginBottom: sizes.marginVertical }
                        }
                        image={productImage}
                        description={product.title}
                        discountedPrice={product.discounted_price}
                        price={product.price}
                        sellerImage={seller.profile_image}
                        sellerName={seller.first_name + ' ' + seller.last_name}
                        //sellerPhone={'+' + seller.country_phone_code + seller.phone}
                        orderNumber={order&&order.order_no}
                        buyerImage={buyer.profile_image}
                        buyerName={buyer.first_name + ' ' + buyer.last_name}
                        //buyerPhone={'+' + buyer.country_phone_code + buyer.phone}
                        buyerAddress={order&&order.address}
                        status={item.status}
                    />

                )
            }}
        />
    )
}