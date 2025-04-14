import { BorderedWrapper, ButtonColored, ButtonColoredSmall, MediumText, ProductCardSecondary, RegularText, RowWrapper, RowWrapperBasic, Spacer, TinyTitle, UserCardPrimary, Wrapper } from "../../../components"
import { appImages, appStyles, colors, orderStatuses, routes, sizes } from "../../../services"
import React from 'react'
import { FlatList } from "react-native"
import { totalSize } from "react-native-dimension"
import { navigate } from "../../../services/navigation/rootNavigation"
import { useSelector } from "react-redux"

export function OrdersList({ data, onPressOrder, onpressAccept, onpressCancel, ListHeaderComponent, ListFooterComponent, loadingAcceptIndex, loadingCancelIndex }) {

      //redux states
      const user = useSelector(state => state.user)
      const { default_dealer_id,default_dealer } = user.userDetail
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
                let productAverageRating = 0
                let productReviewsCount = ''
                let productPrice = ''
                let productDiscountedPrice = ''
                if (item.product) {
                    const { product } = item
                    const images = product.images ? JSON.parse(product.images) : null
                    productImage = images ? images[0] : null
                    productTitle = product.title
                    productAverageRating = product.avg_rating && product.avg_rating
                    productReviewsCount = product.reviews_count && product.reviews_count
                    productPrice = product.price
                    productDiscountedPrice = product.discounted_price
                }


                //user info
                const userImage = item.user.profile_photo_path ? item.user.profile_photo_path : appImages.noUser
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
                        price={productPrice}
                        discountedPrice={productDiscountedPrice}
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
                                    buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, 
                                        backgroundColor: isActive ? colors.appColor1 : isCompleted || isDelivered ? colors.success : isCancelled ? colors.error : colors.appColor1 
                                    }}
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
                                            {
                                                item.private_sale === true ?
                                                    <Wrapper style={[appStyles.grayWrapper, { marginHorizontal:sizes.marginHorizontal/2,marginBottom: sizes.baseMargin, backgroundColor: colors.success }]}>
                                                        <RowWrapperBasic>
                                                            <Wrapper flex={1}>
                                                                <TinyTitle style={[appStyles.textWhite]}>Private Sale</TinyTitle>
                                                            </Wrapper>
                                                        </RowWrapperBasic>
                                                        <Spacer height={sizes.baseMargin} />
                                                        <RegularText style={[appStyles.textWhite]}>
                                                            The buyer want this sale to be private.
                                                        </RegularText>
                                                    </Wrapper>
                                                    :
                                                    item.private_sale === false ?
                                                        <BorderedWrapper style={[{ marginHorizontal: sizes.marginHorizontal / 2, marginBottom: sizes.baseMargin }]}>
                                                            <RowWrapperBasic>
                                                                <Wrapper flex={1}>
                                                                    <TinyTitle>Select Your Nearest Dealer</TinyTitle>
                                                                </Wrapper>
                                                            </RowWrapperBasic>
                                                            <Spacer height={sizes.smallMargin} />
                                                            <RegularText style={[appStyles.textDarkGray]}>
                                                                The buyer opted to this sale through FFL Dealer. Please select your nearest FFL Dealer to deliver the product.
                                                            </RegularText>
                                                            <Wrapper>
                                                                <Spacer height={sizes.baseMargin} />
                                                                <UserCardPrimary
                                                                    containerStyle={{ marginHorizontal: 0 }}
                                                                    imageSize={totalSize(4.5)}
                                                                    imageUri={default_dealer_id?default_dealer?default_dealer.profile_photo_path:appImages.noUser:appImages.noUser}
                                                                    title={default_dealer_id?default_dealer?default_dealer.first_name+' '+default_dealer.last_name:'':''}
                                                                    subTitle={default_dealer_id?'3 miles away':''}
                                                                    right={
                                                                        <TinyTitle onPress={() => navigate(routes.fflDealers)} style={[appStyles.textPrimaryColor]}>{default_dealer_id?'Change':'Select'}</TinyTitle>
                                                                    }
                                                                />
                                                            </Wrapper>

                                                        </BorderedWrapper>
                                                        :
                                                        null
                                            }
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