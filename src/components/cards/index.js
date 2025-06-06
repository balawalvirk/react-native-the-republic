import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { appIcons, appImages, appStyles, colors, fontFamily, HelpingMethods, sizes } from '../../services';
import { IconWithText, } from '../icons';
import { ImageRound } from '../images';
import { Wrapper, AbsoluteWrapper, RowWrapperBasic, RowWrapper, } from '../wrappers'
import { MediumText, TinyText, RegularText, } from '../text'
import { Spacer } from '../spacers';
import { LineHorizontal, LineVertical } from '../lines';
import styles from './styles'
import { IconButton, IconHeart } from '../icons';
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
import { LargeText, MediumTitle, SmallText, SmallTitle, TinyTitle } from '../text';
import { ButtonColoredSmall } from '../buttons';
import { ImageSqareRound, ImageThumbnailGrid } from '../images';
import { TitleValue } from '../common';
import { BallIndicator, DotIndicator, MaterialIndicator } from 'react-native-indicators';
import { CustomIcon } from '../icons'
import moment from 'moment';


export const ProductCardPrimary = ({ onPress, animation, duration, isFavourite, image, images, containerstyle, description, onPressHeart, discountedPrice, price, userName, userImage, viewType, rating, reviewCount, isSponsered }) => {
    const defaultViewType = viewType ? viewType : 'grid'
    const isGridView = defaultViewType === 'grid'
    const isListView = defaultViewType === 'list'
    return (
        <Wrapper animation={animation} duration={duration} style={[isGridView ? styles.productContainerGrid : isListView ? styles.productContainerList : null, containerstyle]}>
            <Wrapper style={{ justifyContent: 'center' }}>
                <TouchableOpacity activeOpacity={1} onPress={onPress}>
                    {
                        images ?
                            <Wrapper style={{ height: height(45) }}>
                                <ImageThumbnailGrid
                                    images={images}
                                />
                            </Wrapper>
                            :
                            image ?
                                <Image
                                    source={{ uri: image }}
                                    style={{ height: isGridView ? height(20) : height(10), width: isListView ? width(25) : null }}
                                    resizeMode="contain"
                                />
                                :
                                null
                    }
                    {
                        isSponsered && isGridView ?
                            <AbsoluteWrapper style={[{ right: sizes.TinyMargin, bottom: sizes.TinyMargin },]}>
                                <ButtonColoredSmall
                                    text="Sponsored"
                                    textStyle={[appStyles.textSmall, appStyles.textWhite]}
                                    buttonStyle={[{ paddingHorizontal: sizes.TinyMargin, paddingVertical: sizes.TinyMargin }]}
                                />
                            </AbsoluteWrapper>
                            :
                            null

                    }

                </TouchableOpacity>
            </Wrapper>
            {
                isGridView ?
                    <LineHorizontal />
                    :
                    <LineVertical />
            }
            <Wrapper>
                <TouchableOpacity activeOpacity={1} onPress={onPress}>
                    <Spacer height={sizes.smallMargin} />
                    <Wrapper style={[styles.smallMarginHorizontal,]}>
                        <Wrapper style={isListView ? { width: width(60) } : null}>
                            <RegularText numberOfLines={1}>{description}</RegularText>
                        </Wrapper>
                        <Spacer height={sizes.smallMargin} />
                        <Wrapper >
                            <RowWrapperBasic>
                                <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>${discountedPrice ? discountedPrice : price ? price : ''}</RegularText>
                                {
                                    discountedPrice && price ?
                                        <>
                                            <Spacer width={sizes.smallMargin} />
                                            <TinyText style={[appStyles.textColorError, appStyles.textLineThrough]}>${price}</TinyText>
                                        </>
                                        :
                                        null
                                }
                            </RowWrapperBasic>
                        </Wrapper>
                        <Spacer height={sizes.smallMargin} />
                        <RowWrapperBasic>
                            <ImageRound
                                source={{ uri: userImage }}
                                size={totalSize(4)}
                            />
                            <Spacer width={sizes.smallMargin} />
                            <Wrapper style={{ alignItems: 'flex-start', }}>
                                <RegularText>{userName}</RegularText>
                                <Spacer height={sizes.TinyMargin} />
                                {
                                    rating && reviewCount ?
                                        <RowWrapperBasic>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={rating}
                                                fullStarColor={colors.rating}
                                                starSize={totalSize(0.75)}
                                                starStyle={{ marginRight: totalSize(0.2) }}
                                            />
                                            <Spacer width={sizes.TinyMargin} />
                                            <TinyText>{rating} ({reviewCount})</TinyText>
                                        </RowWrapperBasic>
                                        :
                                        //  <TinyText style={[appStyles.textGray]}>Not Rated</TinyText>
                                        <IconWithText
                                            iconName="star"
                                            text="Not Rated"
                                            iconSize={totalSize(1.5)}
                                            tintColor={colors.appTextColor5}
                                            textStyle={[appStyles.textTiny, appStyles.textLightGray]}
                                            textContainerStyle={{ marginHorizontal: sizes.marginHorizontalSmall / 2 }}
                                        />
                                }

                            </Wrapper>
                        </RowWrapperBasic>
                    </Wrapper>
                    <Spacer height={sizes.smallMargin} />
                </TouchableOpacity>
            </Wrapper>
            {
                onPressHeart ?
                    <AbsoluteWrapper style={[{ right: 0 }, isGridView ? { top: 0, } : isListView ? { bottom: 0 } : null]}>
                        <IconHeart
                            value={isFavourite}
                            onPress={onPressHeart}
                            size={totalSize(1.75)}
                        />
                    </AbsoluteWrapper>
                    :
                    null

            }


        </Wrapper>
    );
}

export const UserCardPrimary = ({ containerStyle, imageSize, imageUri, title, subTitle, onPress, left, shadow, onPressViewProfile, gradiant, subContainerStyle, right, top, bottom }) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={[{ backgroundColor: colors.appBgColor3, borderRadius: sizes.buttonRadius, marginHorizontal: sizes.marginHorizontal, }, shadow && appStyles.shadow, containerStyle]}>
            {
                gradiant ?
                    <LinearGradient
                        colors={colors.appGradiantColors}
                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.9]}
                        style={[{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderRadius: sizes.buttonRadius, },]} />
                    :
                    null
            }
            <Wrapper style={[{ paddingVertical: sizes.smallMargin }, subContainerStyle]}>
                {top ? top : null}
                <RowWrapper style={[styles.smallMarginHorizontal, {}]}>
                    {
                        left && left
                    }
                    <Wrapper flex={1}>
                        <RowWrapperBasic>
                            <ImageRound
                                source={{ uri: imageUri ? imageUri : appImages.noUser }}
                                size={imageSize}
                            />
                            <Spacer width={sizes.smallMargin} />
                            <Wrapper flex={1}>
                                <MediumText numberOfLines={1} style={[gradiant && appStyles.textWhite]}>{title}</MediumText>
                                {
                                    subTitle ?
                                        <>
                                            <Spacer height={sizes.smallMargin} />
                                            <SmallText style={[gradiant ? { color: appStyles.textWhite.color + '80' } : appStyles.textGray]}>{subTitle}</SmallText>
                                        </>
                                        :
                                        null
                                }

                            </Wrapper>
                        </RowWrapperBasic>
                    </Wrapper>
                    <Spacer width={sizes.smallMargin} />
                    <Wrapper style={{}}>
                        {
                            right ? right :
                                onPressViewProfile ?
                                    <ButtonColoredSmall
                                        text="View Dealer Profile"
                                        onPress={onPressViewProfile}
                                        buttonStyle={{ backgroundColor: colors.appBgColor1, borderRadius: 100 }}
                                        textStyle={[appStyles.textSmall]}
                                    />
                                    :
                                    null
                        }
                    </Wrapper>
                </RowWrapper>
                {bottom ? bottom : null}
            </Wrapper>
        </TouchableOpacity>
    )
}


export const ReviewCardPrimary = ({ containerStyle, imageUrl, title, rating, reviewCount, comment, date }) => {
    return (
        <Wrapper style={[styles.reviewContainer, containerStyle]}>
            <RowWrapperBasic style={{ alignItems: 'flex-start', }}>
                <ImageRound
                    source={{ uri: imageUrl }}
                />
                <Spacer width={sizes.smallMargin} />
                <Wrapper flex={1}>
                    <RegularText style={[appStyles.fontBold]}>{title}</RegularText>
                    <Spacer height={sizes.smallMargin} />
                    <RowWrapperBasic>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={rating}
                            fullStarColor={colors.rating}
                            starSize={totalSize(1.75)}
                            starStyle={{ marginRight: totalSize(0.2) }}
                        />
                        <Spacer width={sizes.TinyMargin} />
                        <SmallText>{rating} {reviewCount ? ' (' + reviewCount + ')' : ''}</SmallText>
                    </RowWrapperBasic>
                </Wrapper>
                <Spacer width={sizes.smallMargin} />
                <SmallText style={[appStyles.textGray]}>{date}</SmallText>
            </RowWrapperBasic>
            <Spacer height={sizes.smallMargin} />
            <RegularText>{comment}</RegularText>
        </Wrapper>
    )
}
export const ProductCardSecondary = ({ perMoreInfo, content, onPress, animation, duration, image, imageStyle, containerstyle, description, discountedPrice, price, rating, reviewCount, moreInfo, moreInfoImage, moreInfoTitle, moreInfoSubTitle, moreInfoRight, moreInfoContainerStyle, children, date }) => {

    return (
        <Wrapper animation={animation} duration={duration} style={[styles.ProductCardSecondaryContainer, containerstyle]}>
            <RowWrapperBasic style={[{ alignItems: 'flex-start', paddingVertical: sizes.marginVertical / 2, paddingHorizontal: sizes.marginHorizontalSmall }]}>
                <Wrapper style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: sizes.cardRadius, borderColor: colors.appBgColor3 }} activeOpacity={1} onPress={onPress}>
                        <Image
                            source={{ uri: image ? image : appImages.noImageAvailable }}
                            style={[{ height: width(25), width: width(25) }, imageStyle]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </Wrapper>
                <LineHorizontal />
                <Wrapper flex={1}>
                    <TouchableOpacity activeOpacity={1} onPress={onPress}>
                        <Wrapper style={[styles.smallMarginHorizontal,]}>
                            <Wrapper >
                                <RegularText numberOfLines={2}>{description}</RegularText>
                            </Wrapper>
                            <Spacer height={sizes.smallMargin} />
                            <Wrapper >
                                <RowWrapperBasic>
                                    <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>${discountedPrice}</RegularText>
                                    <Spacer width={sizes.smallMargin} />
                                    <TinyText style={[appStyles.textColorError, appStyles.textLineThrough]}>${price}</TinyText>
                                </RowWrapperBasic>
                            </Wrapper>
                            {
                                rating ?
                                    <>
                                        <Spacer height={sizes.smallMargin} />
                                        <RowWrapperBasic>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={rating}
                                                fullStarColor={colors.rating}
                                                starSize={totalSize(1.75)}
                                                starStyle={{ marginRight: totalSize(0.2) }}
                                            />
                                            <Spacer width={sizes.TinyMargin} />
                                            <TinyText>{rating} ({reviewCount})</TinyText>
                                        </RowWrapperBasic>
                                    </>
                                    :
                                    null
                            }
                            {
                                date ?
                                    <>
                                        <Spacer height={sizes.TinyMargin} />
                                        <TinyText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>{date}</TinyText>
                                    </>
                                    : null
                            }
                            {content}
                        </Wrapper>
                        <Spacer height={sizes.smallMargin} />
                    </TouchableOpacity>
                </Wrapper>
            </RowWrapperBasic>
            {perMoreInfo}
            {
                moreInfo ?
                    <Wrapper style={[{ backgroundColor: colors.appBgColor3, paddingVertical: sizes.marginVertical / 2, borderRadius: sizes.cardRadius }, moreInfoContainerStyle]}>
                        <RowWrapperBasic style={{ marginHorizontal: sizes.marginHorizontalSmall }}>
                            <Wrapper flex={1}>
                                <RowWrapperBasic>
                                    <ImageRound
                                        source={{ uri: moreInfoImage }}
                                        size={totalSize(5)}
                                    />
                                    <Spacer width={sizes.smallMargin} />
                                    <Wrapper style={{ alignItems: 'flex-start', }}>
                                        <MediumText>{moreInfoTitle}</MediumText>
                                        <Spacer height={sizes.TinyMargin} />
                                        <SmallText style={[appStyles.textGray]}>{moreInfoSubTitle}</SmallText>
                                    </Wrapper>
                                </RowWrapperBasic>
                            </Wrapper>
                            <Wrapper>
                                {
                                    moreInfoRight
                                }
                            </Wrapper>
                        </RowWrapperBasic>
                        {moreInfo ? moreInfo : null}
                    </Wrapper>
                    : null
            }
            {children}
        </Wrapper>
    );
}

export const CreditCardPrimary = ({ containerStyle, name, cardNumber, expiry, onPress, shadow, gradiant, subContainerStyle, isDefault, onPressSelect, isLoading }) => {
    const isMaster = HelpingMethods.getCardType(cardNumber) === 'Mastercard'
    const isVisa = HelpingMethods.getCardType(cardNumber) === 'Visa'
    const cardTypeIcon = isMaster ? appImages.masterLogo : isVisa ? appImages.visaLogo : appImages.noImageAvailable
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={[{ backgroundColor: colors.appBgColor2, borderRadius: sizes.buttonRadius, marginHorizontal: sizes.marginHorizontal, }, shadow && appStyles.shadow, containerStyle]}>
            <LinearGradient
                colors={gradiant ? gradiant : colors.appGradiantColors}
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.9]}
                style={[{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderRadius: sizes.buttonRadius, },]} />

            <Wrapper style={[{ paddingBottom: sizes.marginVertical / 2, paddingTop: sizes.marginVertical, paddingHorizontal: sizes.marginHorizontal }, subContainerStyle]}>
                <RowWrapperBasic style={{ alignItems: 'flex-start', }}>
                    <Wrapper flex={1}>
                        <RegularText style={[appStyles.textWhite, appStyles.fontBold]}>{name}</RegularText>
                    </Wrapper>
                    <Wrapper style={{}}>
                        {
                            isLoading ?
                                <AbsoluteWrapper style={{ right: 0, left: 0, alignItems: 'center' }}>
                                    <BallIndicator
                                        size={totalSize(2)}
                                        color={colors.appTextColor6}
                                    />
                                </AbsoluteWrapper>
                                :
                                null
                        }

                        <Wrapper style={{ opacity: isLoading ? 0 : 1 }}>
                            <ButtonColoredSmall
                                text={isDefault ? 'Default' : 'Select'}
                                onPress={onPressSelect}
                                buttonStyle={{ backgroundColor: colors.appBgColor1, borderRadius: 100, paddingHorizontal: sizes.marginHorizontalSmall, paddingVertical: sizes.marginVertical / 4 }}
                                textStyle={[appStyles.textSmall]}
                            />
                        </Wrapper>

                    </Wrapper>
                </RowWrapperBasic>
                <Spacer height={sizes.smallMargin} />
                <SmallTitle style={[{ color: appStyles.textWhite.color }, appStyles.fontMedium]}>{HelpingMethods.getHiddenCardNumber(cardNumber)}</SmallTitle>
                <Spacer height={sizes.baseMargin} />
                <RowWrapperBasic>
                    <Wrapper flex={1}>
                        <TinyText style={[{ color: appStyles.textWhite.color + '80' }]}>Expiry</TinyText>
                        <Spacer height={sizes.TinyMargin} />
                        <RegularText style={[appStyles.textWhite,]}>{expiry}</RegularText>
                    </Wrapper>
                    <Wrapper style={{}}>
                        <Image
                            source={{ uri: cardTypeIcon }}
                            resizeMode="contain"
                            style={{ width: width(15), height: width(15) }}
                        />
                    </Wrapper>
                </RowWrapperBasic>
            </Wrapper>

        </TouchableOpacity>
    )
}


export const NotificationCardPrimary = ({ onPress, disabled, text, image, type, time, containerStyle }) => {
    const isProduct = type === 'product' || type === 'order'
    const isUser = type === 'postReaction' || type === 'postComment' || type === 'followRequestAccepted' || type === 'newFollowRequest' || type === 'followUser'
    const isApp = type === 'app'
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={1} style={[{ paddingVertical: sizes.marginVertical / 2, borderBottomWidth: 1, borderBottomColor: colors.appBgColor3 }, containerStyle]}>
            <RowWrapperBasic style={{ alignItems: 'flex-start', marginHorizontal: sizes.marginHorizontalSmall }}>
                <Wrapper>
                    {

                        isUser && image ?
                            <ImageRound
                                source={{ uri: image }}
                                size={totalSize(5)}
                            />
                            :
                            isProduct && image ?
                                <ImageSqareRound
                                    source={{ uri: image }}
                                    size={totalSize(5)}
                                    style={{ borderWidth: 1, borderColor: colors.appBgColor3 }}
                                    resizeMode="contain"
                                />
                                :
                                <IconButton
                                    iconName="bell"
                                    iconType="feather"
                                    iconSize={totalSize(2.25)}
                                    buttonSize={totalSize(5)}
                                    buttonColor={colors.appColor1}
                                    iconColor={colors.appTextColor6}
                                />
                    }
                </Wrapper>
                <Spacer width={sizes.marginHorizontalSmall} />
                <Wrapper flex={1}>
                    <MediumText style={[]}>{text}</MediumText>
                </Wrapper>
                <Spacer width={sizes.marginHorizontal} />
                <Wrapper>
                    <SmallText style={[appStyles.textLightGray]}>{time}</SmallText>
                </Wrapper>
            </RowWrapperBasic>
        </TouchableOpacity>
    )

}

export const MessageCardPrimary = ({ onPress, name, message, image, isOnline, time, containerStyle, newMessagesCount }) => {

    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={[{ paddingVertical: sizes.marginVertical / 2, borderBottomWidth: 1, borderBottomColor: colors.appBgColor3, }, containerStyle]}>
            <RowWrapper style={{ alignItems: 'flex-start', }}>
                <Wrapper>
                    <ImageRound
                        source={{ uri: image }}
                        size={totalSize(5)}
                    />
                </Wrapper>
                <Spacer width={sizes.marginHorizontalSmall} />
                <Wrapper flex={1}>
                    <RowWrapperBasic>
                        <Wrapper flex={1}>
                            <MediumText style={[]}>{name}</MediumText>
                        </Wrapper>
                        <SmallText style={[appStyles.textLightGray]}>{time}</SmallText>
                    </RowWrapperBasic>
                    <Spacer height={sizes.smallMargin} />
                    <RowWrapperBasic>
                        <Wrapper flex={1}>
                            <SmallText numberOfLines={1} num style={[appStyles.textLightGray]}>{message}</SmallText>

                        </Wrapper>
                        {
                            newMessagesCount ?
                                <IconButton
                                    text={newMessagesCount}
                                    buttonColor={colors.error}
                                    textStyle={[appStyles.textSmall, appStyles.fontMedium, appStyles.textWhite]}
                                    buttonSize={totalSize(2.5)}
                                />
                                :
                                null
                        }

                    </RowWrapperBasic>
                </Wrapper>

            </RowWrapper>
        </TouchableOpacity>
    )

}

export const PlanCard = ({ onPress, title, price, keyPoints, isSelected }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1} style={[appStyles.borderedWrapper, { borderColor: isSelected ? colors.appColor1 : colors.appBgColor3, borderWidth: isSelected ? 2 : 1, marginBottom: sizes.marginVertical }]}>
            <RowWrapperBasic>
                <Wrapper flex={1}>
                    <SmallTitle style={[appStyles.textSocondaryColor]}>{title}</SmallTitle>
                </Wrapper>
                <SmallTitle style={[{ color: colors.success, fontFamily: fontFamily.appTextRegular, fontStyle: 'italic' }]}>{price}</SmallTitle>
            </RowWrapperBasic>
            <Spacer height={sizes.smallMargin} />
            <RegularText>{keyPoints.split("• ").join("\n• ")}</RegularText>
        </TouchableOpacity>
    )
}

export const TraningCard = ({ onPress, title, duration, charges, location, userName, userImage, userRating, userReviewsCount, description, containerStyle,startDate,endDate }) => {
    const TitleValueSecondary = ({ title, value }) => {
        return (
            <TitleValue
                title={title}
                value={value}
                containerStyle={{ flexDirection: 'column', marginHorizontal: 0, alignItems: 'flex-start', }}
                titleStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textDarkGray]}
                valueStyle={[appStyles.textMedium, { marginTop: sizes.smallMargin }]}
            />
        )
    }
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            activeOpacity={1} style={[appStyles.borderedWrapper, {}, containerStyle]}>
            <Wrapper>
                <SmallTitle style={[appStyles.textSocondaryColor]}>{title}</SmallTitle>
                <Spacer height={sizes.baseRadius} />
                <TitleValueSecondary
                    title="Description"
                    value={description}
                />
                <Spacer height={sizes.baseRadius} />
                <RowWrapperBasic>
                    <Wrapper flex={2}>
                        {/* <TitleValueSecondary
                            title="Duration"
                            value={duration}
                        /> */}
                        <TitleValueSecondary
                        title="Start - End Date"
                        value={HelpingMethods.formateDate1(moment(startDate).add(1,'day'))+' - '+HelpingMethods.formateDate1(endDate)}
                    />
                    </Wrapper>
                    <Wrapper flex={1}>
                        <TitleValueSecondary
                            title="Charges"
                            value={charges}
                        />
                    </Wrapper>
                </RowWrapperBasic>
            </Wrapper>
            <Spacer height={sizes.baseRadius} />
            <IconWithText
                iconName="location-outline"
                iconType="ionicon"
                text={location}
                tintColor={colors.appColor1}
                textStyle={[appStyles.textMedium, appStyles.fontBold, appStyles.textPrimaryColor]}
            />
            <Spacer height={sizes.baseRadius} />
            <RowWrapperBasic>
                <Wrapper>
                    <ImageRound
                        source={{ uri: userImage }}
                        size={totalSize(4)}
                    />
                </Wrapper>
                <Spacer width={sizes.TinyMargin} />

                <Wrapper style={{ alignItems: 'flex-start', }}>
                    <RegularText>{userName}</RegularText>
                    <Spacer height={sizes.TinyMargin} />
                    <RowWrapperBasic>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={userRating}
                            fullStarColor={colors.rating}
                            starSize={totalSize(1)}
                            starStyle={{ marginRight: totalSize(0.2) }}
                        />
                        <Spacer width={sizes.TinyMargin} />
                        <TinyText>{userRating} ({userReviewsCount})</TinyText>
                    </RowWrapperBasic>
                </Wrapper>
            </RowWrapperBasic>

        </TouchableOpacity>
    )
}
export const TraningRequestCard = ({ onPress, title, userName, userImage, startDate, endDate, containerStyle }) => {
    const TitleValuePrimary = ({ title, value }) => {
        return (
            <TitleValue
                title={title}
                value={value}
                containerStyle={{ flexDirection: 'column', marginHorizontal: 0, alignItems: 'flex-start', }}
                titleStyle={[appStyles.textRegular, appStyles.textDarkGray]}
                valueStyle={[appStyles.textMedium, appStyles.fontBold, { marginTop: sizes.smallMargin }]}
            />
        )
    }
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            activeOpacity={1} style={[appStyles.borderedWrapper, containerStyle]}>
            <Wrapper>
                <SmallTitle style={[appStyles.textSocondaryColor]}>{title}</SmallTitle>
                <Spacer height={sizes.baseRadius} />
            </Wrapper>
            <Spacer height={sizes.baseRadius} />
            <RowWrapperBasic>
                <Wrapper flex={1}>
                    <TitleValuePrimary
                        title="Start Date"
                        value={HelpingMethods.formateDate1(startDate)}
                    />
                </Wrapper>
                <Wrapper flex={1}>
                    <TitleValuePrimary
                        title="End Date"
                        value={HelpingMethods.formateDate1(endDate)}
                    />
                </Wrapper>
            </RowWrapperBasic>
            <Spacer height={sizes.baseRadius} />
            <Wrapper style={{ marginHorizontal: -sizes.marginHorizontal / 1.25, marginBottom: -sizes.marginVertical / 1.5, backgroundColor: colors.appColor1, paddingHorizontal: sizes.marginHorizontalSmall, paddingVertical: sizes.marginVertical / 2, borderRadius: sizes.cardRadius }}>
                <RowWrapperBasic>
                    <Wrapper>
                        <ImageRound
                            source={{ uri: userImage ? userImage : appImages.noUser }}
                            size={totalSize(4)}
                        />
                    </Wrapper>
                    <Spacer width={sizes.smallMargin} />
                    <Wrapper style={{ flex: 1 }}>
                        <MediumText style={[appStyles.textWhite]}>
                            {userName} requested a training.
                            {'\n'}
                            Please approve the request according to your availability.
                        </MediumText>
                    </Wrapper>
                </RowWrapperBasic>
            </Wrapper>

        </TouchableOpacity>
    )
}
export const TraningSellerCard = ({ onPress, title, duration, charges, containerStyle, onPressDelete, onPressEdit,startDate,endDate }) => {
    const TitleValuePrimary = ({ title, value }) => {
        return (
            <TitleValue
                title={title}
                value={value}
                containerStyle={{ flexDirection: 'column', marginHorizontal: 0, alignItems: 'flex-start', }}
                titleStyle={[appStyles.textRegular,appStyles.fontBold, appStyles.textDarkGray]}
                valueStyle={[appStyles.textMedium,  { marginTop: sizes.smallMargin }]}
            />
        )
    }
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            activeOpacity={1} style={[appStyles.borderedWrapper, containerStyle]}>
            <Wrapper>
                <SmallTitle style={[appStyles.textSocondaryColor]}>{title}</SmallTitle>
                <Spacer height={sizes.baseRadius} />
            </Wrapper>
            <Spacer height={sizes.baseRadius} />
            <RowWrapperBasic>
                <Wrapper flex={2}>
                    {/* <TitleValuePrimary
                        title="Duration"
                        value={duration+' days'}
                    /> */}
                    <TitleValuePrimary
                        title="Start - End Date"
                        value={HelpingMethods.formateDate1(moment(startDate).add(1,'day'))+' - '+HelpingMethods.formateDate1(endDate)}
                    />
                </Wrapper>
                <Wrapper flex={1}>
                    <TitleValuePrimary
                        title="Charges"
                        value={'$'+charges}
                    />
                </Wrapper>
            </RowWrapperBasic>
            <Spacer height={sizes.baseRadius} />
            <Wrapper style={{ marginHorizontal: -sizes.marginHorizontal / 1.25, marginBottom: -sizes.marginVertical / 1.5, backgroundColor: colors.appBgColor3, paddingHorizontal: sizes.marginHorizontalSmall, paddingVertical: sizes.marginVertical / 2, borderRadius: sizes.cardRadius }}>
                <RowWrapperBasic>
                    <Wrapper flex={1}>
                        {/* <ImageRound
                            source={{ uri: userImage }}
                            size={totalSize(4)}
                        /> */}
                    </Wrapper>
                    <Spacer width={sizes.smallMargin} />
                    <Wrapper >
                        <RowWrapperBasic>
                            <ButtonColoredSmall
                                onPress={onPressEdit}
                                text="Edit"
                                buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100 }}
                            />
                            <Spacer width={sizes.smallMargin} />
                            <ButtonColoredSmall
                                onPress={onPressDelete}
                                text="Delete"
                                buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: colors.error }}
                            />
                        </RowWrapperBasic>
                    </Wrapper>
                </RowWrapperBasic>
            </Wrapper>

        </TouchableOpacity>
    )
}
export const CouponCard = ({ onPress, title, discountType, discount, expiry, containerStyle, onPressDelete, onPressEdit }) => {
    const TitleValuePrimary = ({ title, value }) => {
        return (
            <TitleValue
                title={title}
                value={value}
                containerStyle={{ flexDirection: 'column', marginHorizontal: 0, alignItems: 'flex-start', }}
                titleStyle={[appStyles.textRegular, appStyles.textDarkGray]}
                valueStyle={[appStyles.textMedium, appStyles.fontBold, { marginTop: sizes.smallMargin }]}
            />
        )
    }
    const fixedDiscount = discountType === 'fixed'
    const percentageDiscount = discountType === 'percentage'
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            activeOpacity={1} style={[appStyles.borderedWrapper, containerStyle]}>
            <Wrapper>
                <SmallTitle style={[appStyles.textSocondaryColor]}>{title}</SmallTitle>
                <Spacer height={sizes.baseRadius} />
            </Wrapper>
            <Spacer height={sizes.baseRadius} />
            <RowWrapperBasic>
                <Wrapper flex={1}>
                    {
                        fixedDiscount ?
                            <TitleValuePrimary
                                title="Fixed Discount"
                                value={'-$' + discount}
                            />
                            :
                            percentageDiscount ?
                                <TitleValuePrimary
                                    title="%age Discount"
                                    value={discount + '%'}
                                />
                                : null
                    }

                </Wrapper>
                <Wrapper flex={1}>
                    <TitleValuePrimary
                        title="Expiry"
                        value={expiry}
                    />
                </Wrapper>
            </RowWrapperBasic>
            <Spacer height={sizes.baseRadius} />
            <Wrapper style={{ marginHorizontal: -sizes.marginHorizontal / 1.25, marginBottom: -sizes.marginVertical / 1.5, backgroundColor: colors.appBgColor3, paddingHorizontal: sizes.marginHorizontalSmall, paddingVertical: sizes.marginVertical / 2, borderRadius: sizes.cardRadius }}>
                <RowWrapperBasic>
                    <Wrapper flex={1}>
                        {/* <ImageRound
                            source={{ uri: userImage }}
                            size={totalSize(4)}
                        /> */}
                    </Wrapper>
                    <Spacer width={sizes.smallMargin} />
                    <Wrapper >
                        <RowWrapperBasic>
                            <ButtonColoredSmall
                                onPress={onPressEdit}
                                text="Edit"
                                buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100 }}
                            />
                            <Spacer width={sizes.smallMargin} />
                            <ButtonColoredSmall
                                onPress={onPressDelete}
                                text="Delete"
                                buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: colors.error }}
                            />
                        </RowWrapperBasic>
                    </Wrapper>
                </RowWrapperBasic>
            </Wrapper>

        </TouchableOpacity>
    )
}
export const InvoiceCard = ({ onPress, amount, orderNum, date, containerStyle }) => {
    const TitleValuePrimary = ({ title, value }) => {
        return (
            <TitleValue
                title={title}
                value={value}
                containerStyle={{ flexDirection: 'column', marginHorizontal: 0, alignItems: 'flex-start', }}
                titleStyle={[appStyles.textRegular, appStyles.textDarkGray]}
                valueStyle={[appStyles.textMedium, appStyles.fontBold, { marginTop: sizes.smallMargin }]}
            />
        )
    }
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            activeOpacity={1} style={[appStyles.borderedWrapper, containerStyle]}>

            <RowWrapperBasic>
                <Wrapper flex={1}>
                    <TitleValuePrimary
                        title="Order #"
                        value={orderNum}
                    />
                </Wrapper>
                <Wrapper>
                    <MediumTitle style={[appStyles.textPrimaryColor]}>{amount}</MediumTitle>
                </Wrapper>

            </RowWrapperBasic>
            <Spacer height={sizes.baseRadius * 1.5} />
            <Wrapper >
                <TitleValuePrimary
                    title="Date"
                    value={date}
                />
            </Wrapper>
        </TouchableOpacity>
    )
}
export const TimeSlotCard = ({ onPress, date, startTime, endTime, containerStyle, onPressDelete }) => {
    const TitleValueSecondary = ({ title, value }) => {
        return (
            <TitleValue
                title={title}
                value={value}
                containerStyle={{ flexDirection: 'column', marginHorizontal: 0, alignItems: 'flex-start', }}
                titleStyle={[appStyles.textRegular, appStyles.fontBold, appStyles.textDarkGray]}
                valueStyle={[appStyles.textMedium, { marginTop: sizes.smallMargin }]}
            />
        )
    }
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={[appStyles.grayWrapper, containerStyle]}>
            <Wrapper>
                <TinyTitle>{date}</TinyTitle>
                <Spacer height={sizes.baseMargin} />
                <RowWrapperBasic>
                    <Wrapper flex={1}>
                        <TitleValueSecondary
                            title="Start Time"
                            value={startTime}
                        />
                    </Wrapper>
                    <Wrapper flex={1}>
                        <TitleValueSecondary
                            title="End Time"
                            value={endTime}
                        />
                    </Wrapper>
                </RowWrapperBasic>
            </Wrapper>
            {
                onPressDelete ?
                    <AbsoluteWrapper style={{ right: sizes.marginHorizontalSmall, top: 0, bottom: 0, justifyContent: 'center' }}>
                        <IconButton
                            iconName="trash-2"
                            iconType="feather"
                            iconColor={colors.appTextColor6}
                            buttonColor={colors.error}
                            buttonSize={totalSize(4)}
                            iconSize={totalSize(2.25)}
                            onPress={onPressDelete}
                        />
                    </AbsoluteWrapper>
                    :
                    null
            }
        </TouchableOpacity>
    )
}

export const IconTitleCrossCard = ({ style, onPress, hideLine, iconSize, title, icon, titleStyle, onPressCross, containerStyle }) => {
    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress} activeOpacity={1}>
            <Wrapper style={style}>
                <RowWrapper style={[{ marginVertical: sizes.baseMargin }, containerStyle]}>
                    <Wrapper flex={1}>
                        <IconWithText
                            text={title}
                            //customIcon={icon}
                            iconName="map-pin"
                            iconType="feather"
                            textStyle={[
                                appStyles.textMedium,
                                { marginLeft: sizes.marginHorizontalSmall },
                                titleStyle
                            ]}
                            iconSize={iconSize ? iconSize : sizes.icons.medium}
                        />
                    </Wrapper>
                    {
                        onPressCross ?
                            <Icon
                                name="close"
                                type="evilicon"
                                size={sizes.icons.large}
                                onPress={onPressCross}
                            /> :
                            null
                    }
                </RowWrapper>

            </Wrapper>
        </TouchableOpacity>
    );
}

export const UnderlinedWithArrowCard = ({
    onPress, containerStyle, title, titleStyle, subContainerStyle, preRight,
    animation, duration,
    //right params
    right, iconNameRight, iconTypeRight, iconSizeRight, iconColorRight, iconStyleRight, onPressIconRight,
    //left params
    left, customIconLeft, iconNameLeft, iconTypeLeft, iconColorLeft, iconSizeLeft, iconStyleLeft, onPressIconLeft,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
        >
            <Wrapper animation={animation} duration={duration} style={[{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: sizes.marginHorizontal, paddingVertical: sizes.baseMargin, borderBottomWidth: 1, borderBottomColor: colors.appBgColor2 }, containerStyle]}>
                {
                    left ?
                        left
                        :
                        customIconLeft ?
                            <View style={{ alignItems: 'center', marginLeft: sizes.marginHorizontal }}>
                                <CustomIcon icon={customIconLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor1} containerStyle={iconStyleLeft} />
                            </View>
                            :
                            iconNameLeft ?
                                <View style={{ alignItems: 'center', marginLeft: sizes.marginHorizontal }}>
                                    <Icon name={iconNameLeft} type={iconTypeLeft} size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium} color={iconColorLeft ? iconColorLeft : colors.appTextColor4} iconStyle={iconStyleLeft} onPress={onPressIconLeft} />
                                </View>
                                :
                                null
                }
                <Wrapper style={[{ flex: 1 }, subContainerStyle]}>
                    <MediumText style={titleStyle}>{title}</MediumText>
                </Wrapper>

                <RowWrapperBasic>
                    {
                        preRight && preRight
                    }
                    {
                        right ?
                            right
                            :
                            iconNameRight ?
                                <View style={{ alignItems: 'center', marginRight: sizes.marginHorizontal }}>
                                    <Icon name={iconNameRight} type={iconTypeRight} size={iconSizeRight ? iconSizeRight : sizes.icons.medium} color={iconColorRight ? iconColorRight : colors.appTextColor5} iconStyle={iconStyleRight} onPress={onPressIconRight} />
                                </View>
                                :
                                <Icon
                                    name={'chevron-forward'}
                                    type={'ionicon'}
                                    size={totalSize(2)}
                                    color={colors.appBgColor3}
                                />
                    }
                </RowWrapperBasic>
            </Wrapper>
        </TouchableOpacity>
    )
}