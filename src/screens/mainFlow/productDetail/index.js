import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { AbsoluteWrapper, RenderTags, MainWrapper, Spacer, ButtonGradient, Wrapper, IconHeart, ComponentWrapper, SmallTitle, RowWrapperBasic, MediumText, RegularText, TinyText, SmallText, TinyTitle, RenderKeyPoints, UserCardPrimary, ArmerInfo, KeyboardAvoidingScrollView, Reviews, Products, TitlePrimary, IconButton, BackIconAbsolute, RowWrapper, SkeletonProductDetails } from '../../../components';
import { appIcons, appImages, appStyles, Backend, colors, HelpingMethods, routes, sizes } from '../../../services';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import dummyData from '../../../services/constants/dummyData';
import { useFocusEffect } from '@react-navigation/core';
import { useSelector } from 'react-redux';



function ProductDetail(props) {
    //navigation states
    const { navigation, route } = props
    const { navigate, replace, push, goBack } = navigation
    const { product, productId } = route.params
    const product_id = productId ? productId : product ? product.id : ''

    //redux states
    const userData = useSelector(state => state.user)
    const { userDetail } = userData

    //local states
    const [isLoading, setLoading] = useState(true)
    const [productDetail, setProductDetail] = useState(null)
    const [productReviews, setProductReviews] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])

    //constants
    let user = {}
    let productInfo = {}
    //let productReviews = []
    let productImage = null
    let productTags = []


    useEffect(() => {
        getSetData()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            if (props.route.params) {
                const { product, productId } = props.route.params
                const new_product_id = productId ? productId : product ? product.id : ''
                console.log('New Params --->', props.route.params)
                console.log('new_product_id --->', new_product_id)
                console.log('old_product_id --->', product_id)
                if (productDetail) {
                    console.log('productDetail_id --->', productDetail.id)

                    if (productDetail.id != product_id) {
                        setLoading(true)
                        // props.navigation.setParams({ product: product && product, productId: productId && productId })
                        getSetData()
                    }

                }
            }
        }, [props, productDetail])
    )
    const getSetData = async () => {
        if (productId) {
            await Backend.getProductDetail(productId).
                then(res => {
                    if (res) {
                        setProductDetail(res.data)
                    }
                })
            setProductReviews(product.reviews)

        } else if (product) {
            setProductDetail(product)
        }
        await Backend.getProductReviews(product_id).
            then(res => {
                if (res) {
                    setProductReviews(res.data)
                }
            })
        await Backend.getRelatedProducts({ product_id }).
            then(res => {
                if (res) {
                    setRelatedProducts(res.data.data)
                }
            })
        setLoading(false)
    }

    if (isLoading) {
        return (
            <SkeletonProductDetails />
        )
    } else if (productDetail) {
        const { item, type, manufacturer, caliber, action, condition, images, reviews } = productDetail
        const productImages = images ? JSON.parse(images) : null
        productImage = productImages ? productImages[0] : appImages.noImageAvailable
        user = productDetail.user
        const tempProdInfo = {
            item, type, manufacturer, caliber, action, condition
        }
        productInfo = tempProdInfo
        productTags = Object.keys(tempProdInfo).map((key) => tempProdInfo[key])
        //productReviews = reviews
    }
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.statusBarHeight} />
                <Wrapper>
                    <Image
                        source={{ uri: productImage }}
                        style={{ height: height(50), width: null }}
                        resizeMode="contain"
                    />
                    <AbsoluteWrapper style={{ top: 0, bottom: 0, left: 0, right: 0, }}>
                        <LinearGradient
                            style={{ flex: 1 }}
                            locations={[0.8, 1]}
                            colors={['transparent', colors.appBgColor5 + '80']}
                        />
                        <IconHeart
                            value={HelpingMethods.checkIsProductFavourite(productDetail.id)}
                            containerStyle={{ position: 'absolute', bottom: sizes.smallMargin, right: sizes.marginHorizontalSmall }}
                            containerSize={totalSize(4.5)}
                            containerColor={colors.appBgColor1}
                            onPress={() => Backend.handleAddRemoveFavouriteProduct(productDetail.id)}
                        />
                    </AbsoluteWrapper>
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <SmallTitle>{productDetail.title}</SmallTitle>
                    <Spacer height={sizes.smallMargin} />
                    <RowWrapperBasic>
                        <TinyTitle style={[appStyles.fontBold, appStyles.textPrimaryColor]}>${productDetail.discounted_price}</TinyTitle>
                        <Spacer width={sizes.smallMargin} />
                        <RegularText style={[appStyles.textColorError, appStyles.textLineThrough]}>${productDetail.price}</RegularText>
                    </RowWrapperBasic>
                    <Spacer height={sizes.smallMargin} />
                    <RowWrapperBasic>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={productDetail.avg_rating}
                            fullStarColor={colors.rating}
                            starSize={totalSize(1.75)}
                            starStyle={{ marginRight: totalSize(0.2) }}
                        />
                        <Spacer width={sizes.TinyMargin} />
                        <SmallText>{productDetail.rating} ({productDetail.reviews_count})</SmallText>
                    </RowWrapperBasic>
                    <Spacer height={sizes.baseMargin} />
                    <RenderTags tags={productTags.slice(0, 3)} />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <UserCardPrimary
                    imageUri={user ? user.profile_image ? user.profile_image : appImages.noUser : appImages.noUser}
                    title={user ? user.first_name + ' ' + user.last_name : 'Anonynous'}
                    subTitle={'3 miles away'}
                    gradiant
                    onPressViewProfile={() => navigate(routes.userProfile, { user })}
                />
                <Spacer height={sizes.baseMargin} />
                <ArmerInfo
                    info={productInfo}
                />
                <Spacer height={sizes.baseMargin} />
                {/* <RenderKeyPoints
                    keyPoints={keyPoints}
                /> */}
                <ComponentWrapper>
                    <RegularText>{productDetail.description}</RegularText>
                </ComponentWrapper>
                {
                    productReviews.length ?
                        <>
                            <Spacer height={sizes.baseMargin} />
                            <TitlePrimary
                                title="Reviews"
                                onPressRight={() => navigate(routes.reviews,{product_id})}
                               // rightText={<RegularText style={[appStyles.fontBold, appStyles.textGray]}>Not Reviewed Yet</RegularText>}
                            />
                            <Spacer height={sizes.smallMargin} />
                            <Reviews
                                data={productReviews.length>3?productReviews.slice(0,3):productReviews}
                            />
                        </>
                        :
                        null
                }
                <Spacer height={sizes.baseMargin} />
                <TitlePrimary
                    title="Related Products"
                />
                <Spacer height={sizes.smallMargin} />
                <Products
                    data={relatedProducts}
                    onPressProduct={(item, index) => push(routes.productDetail, { product })}
                    viewType={'grid'}
                    // ListHeaderComponent={() => {
                    //     return <Spacer height={sizes.baseMargin * 4} />
                    // }}
                    ListFooterComponent={() => {
                        return <Spacer height={sizes.doubleBaseMargin * 4} />
                    }}
                />
            </KeyboardAvoidingScrollView>
            <AbsoluteWrapper style={{ bottom: 0, right: 0, left: 0, backgroundColor: colors.appBgColor1, ...appStyles.shadow, paddingVertical: sizes.baseMargin }}>
                <RowWrapper style={[{}]}>
                    <FooterButton
                        text="Enquire"
                        onPress={() => {
                            navigate(routes.chatScreen, { enquire: productDetail, userId: user.id })
                        }}
                    />
                    {/* <FooterButton
                        text="Request Demo"
                    /> */}
                    <Spacer width={sizes.marginHorizontal} />
                    <FooterButton
                        text="Buy Now"
                        onPress={() => navigate(routes.buyNow, { product: productDetail })}
                    />
                </RowWrapper>
            </AbsoluteWrapper>
            <BackIconAbsolute
                onPress={goBack}
            />
        </MainWrapper>
    );
}

export default ProductDetail;

const FooterButton = ({ text, onPress }) => {
    return (
        <ButtonGradient
            text={text}
            buttonStyle={{ flex: 1, marginHorizontal: 0, }}
            gradiantContainerStyle={{ paddingHorizontal: sizes.marginHorizontal }}
            onPress={onPress}
        />
    )
}