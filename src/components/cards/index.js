import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { appIcons, appStyles, colors, HelpingMethods, sizes } from '../../services';
import { Spacer, Wrapper, AbsoluteWrapper, LineHorizontal, LineVertical, ComponentWrapper, MediumText, RowWrapperBasic, RowWrapper, TinyText, RegularText, IconWithText, ImageRound } from '..';
import styles from './styles'
import { IconHeart } from '../icons';
import StarRating from 'react-native-star-rating';

export const ProductCardPrimary = ({ animation,duration,isFavourite, image, containerstyle, description, onPressHeart, newPrice, oldPrice, userName, userImage, viewType, rating, reviewCount }) => {
    const defaultViewType = viewType ? viewType : 'grid'
    const isGridView = defaultViewType === 'grid'
    const isListView = defaultViewType === 'list'
    return (
        <Wrapper animation={animation} duration={duration} style={[isGridView ? styles.productContainerGrid : isListView ? styles.productContainerList : null, containerstyle]}>
            <Wrapper style={{justifyContent: 'center'}}>
                <Image
                    source={{ uri: image }}
                    style={{ height: isGridView ? height(20) : height(10), width: isListView ? width(25) : null }}
                    resizeMode="contain"
                />
            </Wrapper>
            {
                isGridView ?
                    <LineHorizontal />
                    :
                    <LineVertical />
            }
            <Wrapper>
                <Spacer height={sizes.smallMargin} />
                <Wrapper style={[styles.smallMarginHorizontal,]}>
                    <Wrapper style={isListView?{ width: width(60) }:null}>
                        <RegularText numberOfLines={2}>{description}</RegularText>
                    </Wrapper>
                    <Spacer height={sizes.smallMargin} />
                    <Wrapper flex={1}>
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
            </Wrapper>

            <AbsoluteWrapper style={[{ right: sizes.smallMargin }, isGridView ? { top: sizes.smallMargin, } : isListView ? { bottom: sizes.smallMargin } : null]}>
                <IconHeart
                    value={isFavourite}
                    onPress={onPressHeart}
                    size={totalSize(1.75)}
                />
            </AbsoluteWrapper>
        </Wrapper>
    );
}



