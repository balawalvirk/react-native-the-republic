import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { appIcons, appStyles, colors, HelpingMethods, sizes } from '../../services';
import { Spacer, Wrapper, AbsoluteWrapper, LineHorizontal, LineVertical, ComponentWrapper, MediumText, RowWrapperBasic, RowWrapper, TinyText, RegularText, IconWithText, ImageRound } from '..';
import styles from './styles'
import { IconHeart } from '../icons';
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
import { SmallText, TinyTitle } from '../text';
import { ButtonColoredSmall } from '../buttons';
import { ImageThumbnailGrid } from '../images';

export const ProductCardPrimary = ({ onPress, animation, duration, isFavourite, image, images, containerstyle, description, onPressHeart, newPrice, oldPrice, userName, userImage, viewType, rating, reviewCount }) => {
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
                            <RegularText numberOfLines={2}>{description}</RegularText>
                        </Wrapper>
                        <Spacer height={sizes.smallMargin} />
                        <Wrapper >
                            <RowWrapperBasic>
                                <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>${newPrice}</RegularText>
                                <Spacer width={sizes.smallMargin} />
                                <TinyText style={[appStyles.textColorError, appStyles.textLineThrough]}>${oldPrice}</TinyText>
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

export const UserCardGradiant = ({ containerStyle, imageUri, name, distance, onPress, shadow, onPressViewProfile }) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={[{ backgroundColor: 'white', borderRadius: sizes.buttonRadius, marginHorizontal: sizes.marginHorizontal, }, shadow && appStyles.shadow, containerStyle]}>
            <LinearGradient
                colors={colors.appGradiantColors}
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.9]}
                style={[{ borderRadius: sizes.buttonRadius, paddingVertical: sizes.smallMargin },]}>
                <RowWrapper style={[styles.smallMarginHorizontal, {}]}>
                    <Wrapper >
                        <RowWrapperBasic>
                            <ImageRound
                                source={{ uri: imageUri }}
                            />
                            <Spacer width={sizes.TinyMargin} />
                            <Wrapper>
                                <MediumText style={[appStyles.textWhite]}>{name}</MediumText>
                                <Spacer height={sizes.smallMargin} />
                                <SmallText style={[{ color: appStyles.textWhite.color + '80' }]}>{distance}</SmallText>
                            </Wrapper>
                        </RowWrapperBasic>
                    </Wrapper>
                    <Wrapper style={{}}>
                        <ButtonColoredSmall
                            text="View Dealer Profile"
                            onPress={onPressViewProfile}
                            buttonStyle={{ backgroundColor: colors.appBgColor1, borderRadius: 100 }}
                            textStyle={[appStyles.textRegular]}
                        />
                    </Wrapper>

                </RowWrapper>
            </LinearGradient>
        </TouchableOpacity>
    )
}


export const ReviewCardPrimary = ({ containerStyle, imageUrl, name, rating, reviewCount, comment, date }) => {
    return (
        <Wrapper style={[styles.reviewContainer, containerStyle]}>
            <RowWrapperBasic style={{ alignItems: 'flex-start', }}>
                <ImageRound
                    source={{ uri: imageUrl }}
                />
                <Spacer width={sizes.smallMargin} />
                <Wrapper flex={1}>
                    <RegularText style={[appStyles.fontBold]}>{name}</RegularText>
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
                        <SmallText>{rating} ({reviewCount})</SmallText>
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


