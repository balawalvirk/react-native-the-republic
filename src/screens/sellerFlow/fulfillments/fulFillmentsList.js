import { ButtonColored, ButtonColoredSmall, IconButton, MediumText, ProductCardSecondary, RegularText, RowWrapper, RowWrapperBasic, Spacer, TinyTitle, UserCardPrimary, Wrapper } from "../../../components"
import { appStyles, colors, fontSize, sizes } from "../../../services"
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
    newPrice, oldPrice,
    sellerImage, sellerName, orderNumber,
    buyerImage, buyerName, buyerAddress,
    containerstyle, status, showContactOptions
}) => {

    const isReceived = status === 'received'
    const isShipmentPending = status === 'shipmentPending'
    const isCompleted = status === 'completed'
    const statusText = isReceived ? "Waiting for collection from Buyer" : isShipmentPending ? "Shipment Pending" : isCompleted ? "Completed" : ""

   
    return (
        <ProductCardSecondary
            containerstyle={containerstyle}
            animation={animation}
            duration={duration}
            onPress={onPress}
            image={image}
            imag
            description={description}
            newPrice={newPrice}
            oldPrice={oldPrice}
            content={
                <Wrapper style={{ alignItems: 'flex-end', }}>
                    <Spacer height={sizes.smallMargin} />
                    <ButtonColoredSmall
                        text={statusText}
                        buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: isCompleted ? colors.success : colors.appColor1, }}
                        textStyle={{ fontSize: isReceived ? fontSize.small:fontSize.regular }}
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
                                    onPress={() => { }}
                                />
                                <Spacer width={sizes.marginHorizontal} />
                                <CallButton
                                    onPress={() => { }}
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
            moreInfoContainerStyle={[{ marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical/2 }]}
            moreInfoRight={
                showContactOptions ?
                    <RowWrapperBasic>
                        <ChatButton
                            onPress={() => { }}
                        />
                        <Spacer width={sizes.marginHorizontal} />
                        <CallButton
                            onPress={() => { }}
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
                                <MediumText>14 Wall Street, New York City, NY, USA </MediumText>
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
                const { seller, buyer } = item
                const isReceived = item.status === 'received'
                const isShipmentPending = item.status === 'shipmentPending'
                const isCompleted = item.status === 'completed'
                const statusText = isReceived ? "Waiting for collection from Buyer" : isShipmentPending ? "Shipment Pending" : isCompleted ? "Completed" : ""
                return (
                    <FulfillmentCard
                        onPress={() => onPressOrder(item, index)}
                        animation={index <= 5 ? 'fadeInUp' : null}
                        duration={300 + (50 * (index + 1))}
                        containerstyle={
                            { marginBottom: sizes.marginVertical }
                        }
                        image={item.image}
                        description={item.description}
                        newPrice={item.new_price}
                        oldPrice={item.old_price}
                        sellerImage={seller.image}
                        sellerName={seller.name}
                        orderNumber={item.id}
                        buyerImage={buyer.image}
                        buyerName={buyer.name}
                        buyerAddress={'14 Wall Street, New York City, NY, USA'}
                        status={item.status}
                    />

                )
            }}
        />
    )
}