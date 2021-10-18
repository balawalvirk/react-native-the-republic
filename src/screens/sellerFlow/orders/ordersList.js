import { ButtonColored, ButtonColoredSmall, MediumText, ProductCardSecondary, RegularText, RowWrapper, Spacer, Wrapper } from "../../../components"
import { appImages, appStyles, colors, orderStatuses, sizes } from "../../../services"
import React from 'react'
import { FlatList } from "react-native"

export function OrdersList({ data, onPressOrder, onpressAccept, onpressCancel, ListHeaderComponent, ListFooterComponent, loadingAcceptIndex, loadingCancelIndex }) {
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            key={'key'}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(item, index) => (index + 1).toString()}
            renderItem={({ item, index }) => {
                const { user } = item
                const isNew = item.status === orderStatuses.pending
                const isActive = item.status === orderStatuses.accepted
                const isShipping = item.status === orderStatuses.shipping
                const isDelivered = item.status === orderStatuses.delivered
                const isCompleted = item.status === orderStatuses.completed
                const isCancelled = item.status === orderStatuses.cancelled
                const statusText = isNew ? "New" : isActive ? "Waiting for Shipment" : isShipping ? "Shipping" : isDelivered ? "Waiting for review" : isCompleted ? "Completed" : isCancelled ? "Cancelled" : ""

                const deliveryAddress = item.address

                //product info
                let productImage = null
                let productTitle = ''
                let productAverageRating=0
                let productReviewsCount=''
                let productPrice=''
                let productDiscountedPrice=''
                if (item.product) {
                    const {product}=item
                    const images = product.images ? JSON.parse(product.images) : null
                    productImage = images ? images[0] : null
                    productTitle=product.title
                    productAverageRating=product.average_rating&&product.average_rating
                    productReviewsCount=product.reviews_count&&product.reviews_count
                    productPrice=product.price
                    productDiscountedPrice=product.discounted_price
                }


                //user info
                const userImage = item.user.profile_image?item.user.profile_image:appImages.noUser
                const userName = item.user.first_name + ' ' + item.user.last_name
                return (
                    <ProductCardSecondary
                        onPress={() => onPressOrder(item, index)}
                        animation={index <= 5 ? 'fadeInUp' : null}
                        duration={300 + (50 * (index + 1))}
                        containerstyle={
                            { marginBottom: sizes.marginVertical }
                        }
                        image={productImage}
                    
                        description={productTitle}
                        oldPrice={productPrice}
                        newPrice={productDiscountedPrice}
                        //location={item.location}
                        rating={productAverageRating}
                        reviewCount={productReviewsCount}

                        moreInfoImage={userImage}
                        moreInfoTitle={userName}
                        moreInfoSubTitle={'Buyer'}
                        moreInfoRight={
                            !isNew ?
                                <ButtonColoredSmall
                                    disabled
                                    text={statusText}
                                    buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, backgroundColor: isActive ? colors.appColor1 : isCompleted || isDelivered ? colors.success : isCancelled ? colors.error : colors.appColor1 }}
                                    textStyle={[appStyles.textRegular, appStyles.textWhite]}
                                />
                                :
                                null
                        }
                        moreInfoContainerStyle={[isNew && { marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical }]}
                        moreInfo={
                            <Wrapper>
                                {
                                    isNew ?
                                        <Wrapper style={{ marginHorizontal: sizes.marginHorizontalSmall, marginTop: sizes.marginVertical / 2 }}>
                                            <RegularText style={[appStyles.textPrimaryColor, appStyles.fontBold]}>Delivery Address</RegularText>
                                            <Spacer height={sizes.smallMargin} />
                                            <MediumText>{deliveryAddress}</MediumText>
                                        </Wrapper>
                                        :
                                        null
                                }
                            </Wrapper>
                        }
                    >
                        {
                            <>
                                {
                                    isNew ?
                                        <Wrapper>
                                            <RegularText style={[appStyles.fontBold, appStyles.textCenter]}>Do you want to accept this order?</RegularText>
                                            <Spacer height={sizes.baseMargin} />
                                            <RowWrapper style={{ marginHorizontal: sizes.marginHorizontalSmall }}>
                                                <Wrapper flex={1}>
                                                    <ButtonColored
                                                        text="Accept"
                                                        buttonColor={colors.success}
                                                        buttonStyle={{ marginHorizontal: 0 }}
                                                        onPress={() => onpressAccept(item, index)}
                                                        isLoading={loadingAcceptIndex === index}
                                                    />
                                                </Wrapper>
                                                <Spacer width={sizes.marginHorizontal} />
                                                <Wrapper flex={1}>
                                                    <ButtonColored
                                                        text="Cancel"
                                                        buttonColor={colors.error}
                                                        buttonStyle={{ marginHorizontal: 0 }}
                                                        onPress={() => onpressCancel(item, index)}
                                                        isLoading={loadingCancelIndex === index}
                                                    />
                                                </Wrapper>
                                            </RowWrapper>
                                            <Spacer height={sizes.smallMargin} />
                                        </Wrapper>
                                        :
                                        null
                                }
                            </>
                        }
                    </ProductCardSecondary>
                )
            }}
        />
    )
}