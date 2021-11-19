import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import StarRating from 'react-native-star-rating';
import { ButtonColoredSmall, ButtonGradient, ComponentWrapper, IconWithText, LineHorizontal, MainWrapper, ProductCardSecondary, RowWrapperBasic, Spacer, TitleValue, Wrapper, OrderStatusWizard, Toasts, ButtonColored, PopupPrimary, TextInputUnderlined, ReviewCardPrimary, ButtonBordered } from '../../../components';
import { appImages, appStyles, Backend, colors, orderStatuses, routes, sizes } from '../../../services';
import PurchasesList from '../purchaseHistory/purchasesList';
const steps = ['Order\nPlaced', 'Order\naccepted', 'Delivery\non the way', 'Delivered\nto you']

const testReview = {
    "id": 2,
    "user_id": 2,
    "product_id": 1,
    "rating": 3,
    "comment": "not good",
    "created_at": "2021-09-11T10:03:09.000000Z",
    "updated_at": "2021-09-11T10:03:09.000000Z",
    "order_id": null,
    "user": {
        "id": 2,
        "first_name": "ubaid",
        "last_name": "raza",
        "email": "ubaid1@mail.com",
        "username": "ubaid1",
        "gender": "male",
        "birthday": "any string",
        "phone": "111222333",
        "email_verified_at": null,
        "profile_image": null,
        "country_code": "92",
        "country_phone_code": "9211",
        "created_at": "2021-09-08T11:09:37.000000Z",
        "updated_at": "2021-11-08T09:06:57.000000Z",
        "identity_approved": false,
        "fcm_token": null,
        "subscription_id": "sub_3214568765",
        "customer_id": "cus_1239874567",
        "payment_id": "pm_1233213455",
        "user_type": "user",
        "latitude": "54.000876",
        "longitude": "109,876569",
        "distance": "10",
        "subscription_plan": "free",
        "default_card_id": "2",
        "default_dealer_id": 17,
        "address": null,
        "profile_photo_url": "https://ui-avatars.com/api/?name=&color=7F9CF5&background=EBF4FF"
    }
}

function OrderDetail(props) {
    const { navigation, route } = props
    const { navigate, goBack, setParams } = navigation
    //navigation params
    const { order } = route.params
    const { user } = order

    const isNew = order.status === orderStatuses.pending
    const isActive = order.status === orderStatuses.accepted
    const isShipping = order.status === orderStatuses.shipping
    const isDelivered = order.status === orderStatuses.delivered
    const isCompleted = order.status === orderStatuses.completed
    const isCancelled = order.status === orderStatuses.cancelled
    const orderStep = isNew ? 1 : isActive ? 2 : isShipping ? 3 : isDelivered ? 4 : 1

    //local states
    const [loadingCancel, setLoadingCancel] = useState(false)
    const [loadingComplete, setLoadingComplete] = useState(false)
    const [isOrderRecievedPopupVisible, setOrderRecievedPopupVisibility] = useState(false)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(5)
    const [isReviewPopupVisible, setReviewPopupVisibility] = useState(false)
    const [loadingReview, setLoadingReview] = useState(false)
    const [review, setReview] = useState(null)


    const toggleOrderRecievedPopup = () => setOrderRecievedPopupVisibility(!isOrderRecievedPopupVisible)
    const toggleReviewPopup = () => setReviewPopupVisibility(!isReviewPopupVisible)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Order #' + order.order_no,
            headerRight: () => (
                isNew || isActive ?
                    <ComponentWrapper>
                        <ButtonColoredSmall
                            text="Cancel Order"
                            buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: colors.error }}
                            isLoading={loadingCancel}
                            onPress={handleCancelOrder}
                        />
                    </ComponentWrapper>
                    :
                    null
            )
        });
    }, [navigation, order, loadingCancel]);

    const handleCancelOrder = async () => {
        setLoadingCancel(true)
        await Backend.updateOrderStatus({
            order_id: order.id,
            status: orderStatuses.cancelled
        }).
            then(async res => {
                setLoadingCancel(false)
                if (res) {
                    setParams({ order: res.data })
                    Toasts.success('Order has been cancelled')
                }
            })

        //testing
        // setTimeout(() => {
        //     setParams({ order: { ...order, status: orderStatuses.cancelled } })
        //     setLoadingCancel(false)
        //     Toasts.success('Order has been cancelled')
        // }, 2000);
    }
    const handleCompleteOrder = async () => {
        setLoadingComplete(true)
        await Backend.updateOrderStatus({
            order_id: order.id,
            status: orderStatuses.completed
        }).
            then(async res => {
                setLoadingComplete(false)
                if (res) {
                    setParams({ order: res.data })
                    toggleOrderRecievedPopup()
                    Toasts.success('Order has been completed')
                    setTimeout(() => {
                        toggleReviewPopup()
                    }, 500);
                }
            })

        //testing 
        // setTimeout(() => {
        //     setParams({ order: { ...order, status: orderStatuses.completed } })
        //     setLoadingComplete(false)
        //     toggleOrderRecievedPopup()
        //     Toasts.success('Order has been completed')
        //     setTimeout(() => {
        //         toggleReviewPopup()
        //     }, 500);
        // }, 2000);
    }
    const handleSubmitReview = async () => {
        setLoadingReview(true)
        // await Backend.addProductReview({
        //     order_id: order.id,
        //     product_id: order.product.id,
        //     comment,
        //     rating
        // }).
        //     then(async res => {
        //         setLoadingReview(false)
        //         if (res) {
        //             setReview(res.data)
        //             toggleReviewPopup()
        //             Toasts.success('Review has been submitted')
        //         }
        //     })

        // testing
        setTimeout(() => {
            setReview(testReview)
            setLoadingReview(false)
            toggleReviewPopup()
            Toasts.success('Review has been submitted')
        }, 2000);

    }
    return (
        <MainWrapper>
            <Spacer height={sizes.baseMargin} />
            {
                !isCancelled && !isCompleted ?
                    <>
                        <OrderStatusWizard
                            steps={steps}
                            activeStep={orderStep}
                        />
                        <Spacer height={sizes.baseMargin} />
                    </>
                    :
                    null
            }
            <Wrapper>
                <PurchasesList
                    data={[order]}
                    onPressItem={() => { }}
                />
            </Wrapper>
            <Spacer height={sizes.baseMargin} />
            {/* <>
                <ReviewCardPrimary
                    imageUrl={appImages.user2}
                    title={'Max Will'}
                    rating="4"
                    comment="Nice gun, very good work"
                />
                <Spacer height={sizes.baseMargin} />
            </> */}
            {
                isCompleted ?
                    review ?
                        <>
                            <ReviewCardPrimary
                                imageUrl={appImages.user2}
                                title={review.user.first_name + ' ' + review.user.last_name}
                                rating={review.rating}
                                comment={review.comment}
                            />
                            <Spacer height={sizes.baseMargin} />
                        </>
                        :
                        <ButtonBordered
                            text="Write a Review"
                            onPress={toggleReviewPopup}
                            tintColor={colors.appTextColor5}
                            buttonStyle={{ marginBottom: sizes.baseMargin }}
                        />
                    :
                    null
            }
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
            <Spacer height={sizes.doubleBaseMargin * 2} />
            {/* <ButtonGradient
                text="View Invoice"
                onPress={() => navigate(routes.orderInvoice, { order })}
            /> */}
            {
                isCompleted || isDelivered ?
                    <Wrapper style={{ bottom: sizes.doubleBaseMargin, right: 0, left: 0 }}>
                        <ButtonGradient
                            text={isCompleted ? "View Invoice" : isDelivered ? "Order Recieved" : ''}
                            onPress={() => {
                                isCompleted ?
                                    navigate(routes.orderInvoice, { order }) :
                                    isDelivered ?
                                        toggleOrderRecievedPopup() :
                                        null
                            }}
                        />
                    </Wrapper>
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
            <Spacer height={sizes.doubleBaseMargin} />
            <PopupPrimary
                visible={isOrderRecievedPopupVisible}
                toggle={toggleOrderRecievedPopup}
                title={"Are you sure you recieved your order #" + order.order_no}
                info={"Once you marked your order as recieved, we will transfer the payment to seller"}
                buttonText1="Yes"
                buttonText2="No"
                onPressButton1={handleCompleteOrder}
                onPressButton2={toggleOrderRecievedPopup}
                loadingButton1={loadingComplete}
                topMargin={height(65)}
            />
            <PopupPrimary
                visible={isReviewPopupVisible}
                toggle={toggleReviewPopup}
                title={'Write a Review'}
                buttonText1="Submit"
                buttonText2="Skip"
                onPressButton1={handleSubmitReview}
                onPressButton2={toggleReviewPopup}
                loadingButton1={loadingReview}
                topMargin={height(40)}
            >
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper style={{ alignItems: 'center', }}>
                    <StarRating
                        rating={rating}
                        starSize={totalSize(5)}
                        fullStarColor={colors.rating}
                        selectedStar={rate => setRating(rate)}
                        starStyle={{ marginHorizontal: sizes.marginHorizontalSmall / 2 }}
                    />
                </ComponentWrapper>
                <Spacer height={sizes.doubleBaseMargin} />
                <TextInputUnderlined
                    value={comment}
                    onChangeText={t => {
                        setComment(t)
                    }}
                    titleStatic="Comment"
                    placeholder="Write here..."
                    multiline
                    inputStyle={{ height: height(15), textAlignVertical: 'top', marginVertical: sizes.smallMargin }}
                />
                <Spacer height={sizes.doubleBaseMargin} />

            </PopupPrimary>

        </MainWrapper>
    );
}

export default OrderDetail;
