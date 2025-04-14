import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import { appStyles, colors, HelpingMethods, orderStatuses, sizes } from '../../../services';
import { ProductCardSecondary, ProductCardPrimary,ButtonColoredSmall } from "../../../components";
import * as RootNavigation from '../../../services/navigation/rootNavigation'

export default function PurchasesList({ data, ListHeaderComponent, ListFooterComponent, onPressItem }) {
   
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            key={'key'}
            //numColumns={isGridView && 2}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(item, index) => (index + 1).toString()}
            renderItem={({ item, index }) => {
                const { user } = item
               // const isActive = item.status === 'active'
               // const isCompleted = item.status === 'completed'
               // const statusText = isActive ? "Order accepted" : isCompleted ? "Completed" : ''
                const isNew = item.status === orderStatuses.pending
                const isActive = item.status === orderStatuses.accepted
                const isShipping = item.status === orderStatuses.shipping
                const isDelivered = item.status === orderStatuses.delivered
                const isCompleted = item.status === orderStatuses.completed
                const isCancelled = item.status === orderStatuses.cancelled
                const statusText = isNew ? "Pending" : isActive ? "Waiting for Shipment" : isShipping ? "Shipping" : isDelivered ? "Delivered" : isCompleted ? "Completed" : isCancelled ? "Cancelled" : ""

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
                        onPress={() => onPressItem(item, index)}
                        animation={index <= 5 ? 'fadeInUp' : null}
                        duration={300 + (50 * (index + 1))}
                        containerstyle={
                            { marginBottom: sizes.marginVertical }
                        }
                        isFavourite={HelpingMethods.checkIsProductFavourite(item.id)}
                        onPressHeart={() => { }}
                        image={productImage}
                        description={productTitle}
                        price={productPrice}
                        discountedPrice={productDiscountedPrice}
                        //location={item.location}
                        rating={productAverageRating}
                        reviewCount={productReviewsCount}
                        moreInfo={true}
                        moreInfoImage={userImage}
                        moreInfoTitle={userName}
                        moreInfoSubTitle={index + 1 * 3 + ' miles away'}
                        moreInfoRight={
                            <ButtonColoredSmall
                                text={statusText}
                                buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, 
                                    backgroundColor: isActive ? colors.appColor1 : isCompleted || isDelivered ? colors.success : isCancelled ? colors.error : colors.appColor1 
                                 }}
                                textStyle={[appStyles.textRegular, appStyles.textWhite]}
                            />
                        }
                    />
                )
            }}
        />
    )
}



