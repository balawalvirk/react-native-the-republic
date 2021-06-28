import React from 'react';
import { Text, View, Image } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { AbsoluteWrapper, RenderTags, MainWrapper, Spacer, ButtonGradient, Wrapper, IconHeart, ComponentWrapper, SmallTitle, RowWrapperBasic, MediumText, RegularText, TinyText, SmallText, TinyTitle, RenderKeyPoints, UserCardGradiant, ArmerInfo, KeyboardAvoidingScrollView, Reviews, Products, TitlePrimary, IconButton, BackIconAbsolute } from '../../../components';
import { appIcons, appImages, appStyles, colors, HelpingMethods, routes, sizes } from '../../../services';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import dummyData from '../../../services/constants/dummyData';

const FooterButton = ({ text, onPress }) => {
    return (
        <ButtonGradient
            text={text}
            buttonStyle={{ marginHorizontal: 0, }}
            gradiantContainerStyle={{ paddingHorizontal: sizes.marginHorizontal }}
            onPress={onPress}
        />
    )
}

function ProductDetail(props) {
    const { navigation, route } = props
    const { navigate, replace, push,goBack } = navigation
    const { product } = route.params
    const { info, user } = product
    const tags = ['Handguns', 'Semi Automatic', 'Suppressor']
    const keyPoints = [
        {
            title: 'See the light.',
            description: 'This is the detail and modal description for the following point lorem ipsum'
        },
        {
            title: 'See the light.',
            description: 'This is the detail and modal description for the following point lorem ipsum'
        },
        {
            title: 'See the light.',
            description: 'This is the detail and modal description for the following point lorem ipsum'
        },
        {
            title: 'See the light.',
            description: 'This is the detail and modal description for the following point lorem ipsum'
        }
    ]
    const reviews = dummyData.reviews
    const relatedProducts = dummyData.products.slice().reverse()
    return (
        <MainWrapper>
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.statusBarHeight} />
                <Wrapper>
                    <Image
                        source={{ uri: product.image?product.image:product.images?product.images[0]:appImages.noImageAvailable }}
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
                            value={HelpingMethods.checkIsProductFavourite(product.id)}
                            containerStyle={{ position: 'absolute', bottom: sizes.smallMargin, right: sizes.marginHorizontalSmall }}
                            containerSize={totalSize(4.5)}
                            containerColor={colors.appBgColor1}
                        />
                    </AbsoluteWrapper>
                </Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <SmallTitle>{product.description}</SmallTitle>
                    <Spacer height={sizes.smallMargin} />
                    <RowWrapperBasic>
                        <TinyTitle style={[appStyles.fontBold, appStyles.textPrimaryColor]}>${product.new_price}</TinyTitle>
                        <Spacer width={sizes.smallMargin} />
                        <RegularText style={[appStyles.textColorError, appStyles.textLineThrough]}>${product.old_price}</RegularText>
                    </RowWrapperBasic>
                    <Spacer height={sizes.smallMargin} />
                    <RowWrapperBasic>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={product.rating}
                            fullStarColor={colors.rating}
                            starSize={totalSize(1.75)}
                            starStyle={{ marginRight: totalSize(0.2) }}
                        />
                        <Spacer width={sizes.TinyMargin} />
                        <SmallText>{product.rating} ({product.review_count})</SmallText>
                    </RowWrapperBasic>
                    <Spacer height={sizes.baseMargin} />
                    <RenderTags tags={tags} />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <UserCardGradiant
                    imageUri={user.image}
                    name={user.name}
                    distance={'3 miles away'}
                />
                <Spacer height={sizes.baseMargin} />
                <ArmerInfo
                    info={info}
                />
                <Spacer height={sizes.baseMargin} />
                <RenderKeyPoints
                    keyPoints={keyPoints}
                />
                <Spacer height={sizes.baseMargin} />
                <TitlePrimary
                    title="Reviews"
                    onPressRight={() => navigate(routes.reviews)}
                />
                <Spacer height={sizes.smallMargin} />
                <Reviews
                    data={reviews}
                />
                <Spacer height={sizes.baseMargin} />
                <TitlePrimary
                    title="Related Products"
                />
                <Spacer height={sizes.smallMargin} />
                <Products
                    data={relatedProducts}
                    onPressProduct={(item, index) => push(routes.productDetail, { product: item })}
                    viewType={'grid'}
                    // ListHeaderComponent={() => {
                    //     return <Spacer height={sizes.baseMargin * 4} />
                    // }}
                    ListFooterComponent={() => {
                        return <Spacer height={sizes.doubleBaseMargin * 2} />
                    }}
                />
            </KeyboardAvoidingScrollView>
            <AbsoluteWrapper  style={{ bottom: 0, right: 0, left: 0, backgroundColor: colors.appBgColor1, ...appStyles.shadow, paddingVertical: sizes.baseMargin }}>
                <RowWrapperBasic style={[{ justifyContent: 'space-evenly', }]}>
                    <FooterButton
                        text="Enquire"
                        onPress={() => { }}
                    />
                    <FooterButton
                        text="Request Demo"
                    />
                    <FooterButton
                        text="Buy Now"
                    />
                </RowWrapperBasic>
            </AbsoluteWrapper>
            <BackIconAbsolute
            onPress={goBack}
            />
        </MainWrapper>
    );
}

export default ProductDetail;
