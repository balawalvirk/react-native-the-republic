import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Wrapper, RowWrapperBasic, MainWrapper, ComponentWrapper, RowWrapper } from '../wrappers';
import { height, width, totalSize } from 'react-native-dimension';
import { sizes, appStyles, colors } from '../../services';
import { View } from 'react-native';
import { Spacer } from '../spacers';
import styles from './styles';

export const SkeletonPrimary = ({ itemStyle }) => {
    return (
        <SkeletonPlaceholder>

            <Wrapper style={[{ height: height(10), marginHorizontal: sizes.marginHorizontal, borderRadius: sizes.cardRadius }, itemStyle]}>

            </Wrapper>

        </SkeletonPlaceholder>
    )
}
const SkeletonItemPrimary = ({ style, h, w }) => {
    return (
        <Wrapper style={[{ height: h ? h : height(10), width: w, marginHorizontal: sizes.marginHorizontal, borderRadius: sizes.cardRadius }, style]}>

        </Wrapper>
    )
}
export const SkeletonProductDetails = ({ itemStyle }) => {
    return (
        <SkeletonPlaceholder>

            <Wrapper style={[{ height: height(50), borderRadius: sizes.cardRadius }, itemStyle]} />
            {/* <SkeletonItemPrimary /> */}
            <Wrapper style={[styles.horizontalMarginBase]}>
                <Wrapper style={[styles.skeletonItemPrimary, styles.topMarginBase]} />
                <Wrapper style={[styles.skeletonItemPrimary, styles.topMarginSmall, { width: width(70) }]} />
                <Wrapper style={[styles.skeletonItemPrimary, styles.topMarginBase, { width: width(40), height: height(1) }]} />
                <Wrapper style={[styles.skeletonItemPrimary, styles.topMarginSmall, { width: width(80), height: height(1) }]} />
                <Wrapper style={[styles.skeletonItemPrimary, styles.topMarginSmall, { width: width(30), height: height(1) }]} />
                <Wrapper style={[styles.skeletonItemPrimary, styles.topMarginSmall, { width: width(60), height: height(1) }]} />
                <Wrapper style={[styles.skeletonItemPrimary, styles.topMarginBase, { width: width(40), height: height(1) }]} />
                <Wrapper style={[styles.skeletonItemPrimary, styles.topMarginSmall, { width: width(60), height: height(1) }]} />

            </Wrapper>
            <Wrapper style={[styles.skeletonItemPrimary, styles.topMarginBase, styles.horizontalMarginBase, { width: null, height: height(7) }]} />
            <Wrapper style={[styles.topMarginBase,]}>
                <Wrapper style={[styles.rowBasic]}>
                    <Wrapper flex={1}>
                        <Wrapper style={[styles.row]}>
                            <Wrapper style={[styles.skeletonItemPrimary, { width: totalSize(7), height: totalSize(7) }]} />
                            <Wrapper style={[styles.skeletonItemPrimary, styles.horizontalMarginBase, { width: width(20), height: height(1) }]} />
                        </Wrapper>
                    </Wrapper>
                    <Wrapper >
                        <Wrapper style={[styles.skeletonItemPrimary, { width: width(30), height: height(6) }]} />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </SkeletonPlaceholder>
    )
}
export const SkeletonListVerticalPrimary = ({ itemStyle, itemHeight }) => {
    const list = [1, 2, 3,]
    return (
        <SkeletonPlaceholder>
            {
                list.map((item, index) => {
                    return (
                        <Wrapper style={[{ marginLeft: sizes.marginHorizontal, marginTop: sizes.marginVertical, }, itemStyle]}>
                            <Wrapper style={{ height: height(2), width: width(40), borderRadius: sizes.cardRadius, marginBottom: sizes.smallMargin }} />
                            <Wrapper style={[{ height: itemHeight ? itemHeight : height(20), width: width(90), borderRadius: sizes.cardRadius }]} />
                            <Wrapper style={{ marginHorizontal: sizes.marginHorizontal, flexDirection: 'row', justifyContent: 'flex-end', marginVertical: sizes.smallMargin, alignItems: 'center', }}>
                                <Wrapper style={[{ height: height(5), width: totalSize(7), borderRadius: sizes.cardRadius, }]} />
                                <Wrapper style={[styles.horizontalMarginBase]} />
                                <Wrapper style={[{ height: height(5), width: totalSize(7), borderRadius: sizes.cardRadius, }]} />
                            </Wrapper>
                        </Wrapper>
                    )
                })
            }
        </SkeletonPlaceholder>
    )
}
export const SkeletonListVerticalSecondary = ({ itemStyle }) => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <SkeletonPlaceholder>
            {
                list.map((item, index) => {
                    return (
                        <Wrapper style={[{ marginLeft: sizes.marginHorizontal, marginTop: sizes.marginVertical, }, itemStyle]}>
                            {/* <Wrapper style={{ height: height(2), width: width(40), borderRadius: sizes.cardRadius, marginBottom: sizes.smallMargin }} />
                            <Wrapper style={[{ height: height(25), width: width(90), borderRadius: sizes.cardRadius }]} /> */}
                            <Wrapper style={{ flexDirection: 'row', marginVertical: sizes.smallMargin, alignItems: 'center', }}>
                                <Wrapper style={[{ height: totalSize(10), width: totalSize(10), borderRadius: sizes.cardRadius, marginRight: sizes.smallMargin }]} />
                                <Wrapper>
                                    <Wrapper style={{ height: height(0.75), width: width(15), borderRadius: sizes.cardRadius }} />
                                    <Wrapper style={{ height: height(2), width: width(40), borderRadius: sizes.cardRadius, ...styles.topMarginBase }} />
                                    <Wrapper style={{ height: height(1), width: width(25), borderRadius: sizes.cardRadius, ...styles.topMarginBase }} />
                                </Wrapper>
                            </Wrapper>
                        </Wrapper>
                    )
                })
            }
        </SkeletonPlaceholder>
    )
}
export const SkeletonListHorizontalPrimary = ({ itemStyle }) => {
    const list = [1, 2, 3, 4, 5,]
    return (
        <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row' }}>
                {
                    list.map((item, index) => {
                        return (
                            <Wrapper style={[{ marginLeft: index === 0 ? sizes.marginHorizontal : null, marginRight: sizes.marginHorizontal / 2, marginVertical: sizes.marginVertical / 2, }, itemStyle]}>
                                <Wrapper style={[{ height: height(25), width: width(85), borderRadius: sizes.cardRadius }]} />
                                <Wrapper style={{ height: height(1), width: width(25), marginVertical: sizes.smallMargin, borderRadius: sizes.cardRadius }} />
                                <Wrapper style={{ height: height(2), width: width(40), borderRadius: sizes.cardRadius }} />
                                <Wrapper style={[{ position: 'absolute', height: totalSize(7), width: totalSize(7), borderRadius: sizes.cardRadius, top: -height(10), right: sizes.marginHorizontal, borderWidth: 2, borderColor: colors.appBgColor1 }]} />
                            </Wrapper>
                        )
                    })
                }
            </View>
        </SkeletonPlaceholder>
    )
}
export const SkeletonListHorizontalSecondary = ({ itemStyle }) => {
    const list = [1, 2, 3, 4, 5,]
    return (
        <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row' }}>
                {
                    list.map((item, index) => {
                        return (
                            <Wrapper style={[{ marginLeft: index === 0 ? sizes.marginHorizontal : null, marginRight: sizes.marginHorizontal / 2, marginVertical: sizes.marginVertical / 2, }, itemStyle]}>
                                <Wrapper style={[{ height: height(25), width: width(85), borderRadius: sizes.cardRadius }]} />
                                <Wrapper style={{ flexDirection: 'row', marginVertical: sizes.smallMargin, alignItems: 'center', }}>
                                    <Wrapper style={[{ height: totalSize(7), width: totalSize(7), borderRadius: sizes.cardRadius, marginRight: sizes.smallMargin }]} />
                                    <Wrapper>
                                        <Wrapper style={{ height: height(1), width: width(25), borderRadius: sizes.cardRadius, marginBottom: sizes.smallMargin }} />
                                        <Wrapper style={{ height: height(2), width: width(40), borderRadius: sizes.cardRadius }} />
                                    </Wrapper>
                                </Wrapper>
                            </Wrapper>
                        )
                    })
                }
            </View>
        </SkeletonPlaceholder>
    )
}

export const SkeletonListHorizontalTertiary = ({ itemStyle }) => {
    const list = [1, 2, 3, 4, 5,]
    return (
        <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row' }}>
                {
                    list.map((item, index) => {
                        return (
                            <Wrapper style={[{ marginLeft: index === 0 ? sizes.marginHorizontal : null, marginRight: sizes.marginHorizontal / 2, marginVertical: sizes.marginVertical / 2, }, itemStyle]}>
                                <Wrapper style={[{ height: height(35), width: width(85), borderRadius: sizes.cardRadius }]} />
                                <Wrapper style={{ height: height(2.5), width: width(40), borderRadius: sizes.cardRadius, marginTop: sizes.smallMargin }} />
                                <Wrapper style={{ height: height(2.5), width: width(70), borderRadius: sizes.cardRadius, marginVertical: sizes.smallMargin }} />
                                <Wrapper style={{ height: height(1), width: width(25), borderRadius: sizes.cardRadius, }} />
                            </Wrapper>
                        )
                    })
                }
            </View>
        </SkeletonPlaceholder >
    )
}

export const SupportSkeleton = ({ }) => {
    return (
        <MainWrapper>
            <Spacer height={sizes.baseMargin} />
            <SkeletonPrimary
                itemStyle={{ height: height(7) }}
            />
            <Spacer height={sizes.baseMargin} />
            <SkeletonListHorizontalPrimary itemStyle={{ height: height(6), width: width(25) }} />
            <SkeletonListVerticalPrimary itemStyle={{ height: height(8) }} />
        </MainWrapper>
    )
}

export const SkeletonProductsGrid = ({ NumOfItems }) => {

    const defaultItems = NumOfItems ? NumOfItems : 6
    const PlaceholderItems = Array.from(Array(defaultItems).keys())

    return (
        <MainWrapper>
            <RowWrapper style={{ flexWrap: 'wrap', }}>
                {
                    PlaceholderItems.map((item, index) => {
                        return (
                            <SkeletonPrimary
                                itemStyle={{ marginHorizontal: 0, width: width(42.5), height: height(35), marginVertical: sizes.marginVertical / 2 }}
                            />
                        )
                    })
                }
            </RowWrapper>
        </MainWrapper>
    );
}

export const SkeletonPrimaryList = ({ NumOfItems, itemHeight, itemStyle }) => {

    const defaultItems = NumOfItems ? NumOfItems : 6
    const PlaceholderItems = Array.from(Array(defaultItems).keys())

    return (
        <MainWrapper>
            {
                PlaceholderItems.map((item, index) => {
                    return (
                        <SkeletonPrimary
                            itemStyle={[{ height: itemHeight ? itemHeight : height(10), marginVertical: sizes.marginVertical / 2 }, itemStyle]}
                        />
                    )
                })
            }
        </MainWrapper>
    );
}