import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ButtonColoredSmall, ComponentWrapper, DashboardSeller, IconWithText, LineHorizontal, MainWrapper, MediumTitle, RowWrapperBasic, SkeletonListVerticalPrimary, SkeletonPrimary, SkeletonServiceDetails, SmallTitle, Spacer, TinyTitle, TitlePrimary, Wrapper } from '../../../components';
import { appStyles, Backend, colors, fontFamily, fontSize, sizes } from '../../../services';
import { Text as TextSvg, LinearGradient, Stop, Defs, Rect } from 'react-native-svg'
import { BarChart, Grid, YAxis, XAxis, PieChart, AreaChart } from 'react-native-svg-charts'
import { height, totalSize, width } from 'react-native-dimension';
import * as shape from 'd3-shape'
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from './skeletonPlaceholder';

export default function ReportGraph({ title, subTitle, status, percentage, data, onPressType }) {

    const reportResults = Object.keys(data).map((key) => data[key]);
    const reportKeys = Object.keys(data).map((key) => key);
    //contstants
    const types = ['Week', 'All Time']
    //local states
    const [selectedTypeIndex, selectTypeIndex] = useState(1)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul']
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun']
    const isLose = status === 'negative'
    const isSuccess = status === 'positive'
    const tintColor = isLose ? colors.error : colors.success

    const StockPriceGradient = ({ index }) => (
        <Defs key={index}>
            <LinearGradient id={'stockPricegradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
                <Stop offset={'0%'} stopColor={colors.appColor2} stopOpacity={0.5} />
                <Stop offset={'100%'} stopColor={'#FFFFFF'} stopOpacity={0} />
            </LinearGradient>
            <LinearGradient id={'stockPricegradientStroke'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                <Stop offset={'0%'} stopColor={colors.appColor1} />
                <Stop offset={'100%'} stopColor={colors.appColor2} />
            </LinearGradient>
        </Defs>
    )

    return (
        <Wrapper>
            <Wrapper style={{ marginHorizontal: sizes.marginHorizontalSmall }}>
                <TinyTitle style={[appStyles.textPrimaryColor]}>{title}</TinyTitle>
                <Spacer height={sizes.baseMargin} />
                <SmallTitle style={{ color: tintColor }}>{subTitle}</SmallTitle>
                <Spacer height={sizes.TinyMargin} />
                <RowWrapperBasic>
                    <Wrapper flex={1}>
                        <IconWithText
                            tintColor={tintColor}
                            text={percentage + '%'}
                            iconSize={totalSize(1.5)}
                            iconName={isLose ? "caret-down" : isSuccess ? "caret-up" : ''}
                            iconType="ionicon"
                            textContainerStyle={{ marginHorizontal: 2.5 }}
                        />
                    </Wrapper>
                    <Wrapper>
                        <RowWrapperBasic>
                            {
                                types.map((item, index) => {
                                    const isSelected = index === selectedTypeIndex
                                    return (
                                        <ButtonColoredSmall
                                            text={item}
                                            buttonStyle={[
                                                {
                                                    paddingHorizontal: sizes.marginHorizontalSmall / 2,
                                                    borderRadius: sizes.baseRadius,
                                                    marginLeft: sizes.marginHorizontalSmall,
                                                    backgroundColor: isSelected ? colors.appColor1 : colors.appBgColor3,

                                                },
                                            ]}
                                            textStyle={[{
                                                color: isSelected ? colors.appTextColor6 : colors.appTextColor3
                                            }]}
                                            onPress={() => {
                                                selectTypeIndex(index)
                                                onPressType && onPressType(item, index)
                                            }}
                                        />
                                    )
                                })
                            }
                        </RowWrapperBasic>
                    </Wrapper>
                </RowWrapperBasic>
                <Wrapper style={{ flexDirection: 'row', height: height(27.5), paddingVertical: 20, }}>
                    <YAxis
                        data={reportResults}
                        contentInset={{ top: 20, bottom: 20, }}
                        svg={{
                            fill: colors.appTextColor4,
                            fontSize: fontSize.small,
                            fontFamily: fontFamily.appTextRegular
                            //  fontWeight: '900'
                        }}
                        numberOfTicks={5}
                        formatLabel={(value) => `${title === 'Sales Report' ? '$' : ''}${value}`}
                    />
                    <Wrapper flex={1} style={{ width: '100%', paddingHorizontal: sizes.marginHorizontal / 2 }}>
                        <AreaChart
                            style={{ height: height(22) }}
                            data={reportResults}
                            contentInset={{ top: 20, bottom: 10, right: -2.5, left: -2.5 }}
                            svg={{ fill: 'url(#stockPricegradient)', strokeWidth: 1, stroke: 'url(#stockPricegradientStroke)', }}
                            curve={shape.curveNatural}
                        >
                            <StockPriceGradient />
                        </AreaChart>
                        <XAxis
                            style={{}}
                            data={reportKeys}
                            // data={weekDays}
                            xAccessor={({ index }) => index}
                            //scale={scale.scaleBand}
                            //formatLabel={(value, index) => index}
                            //formatLabel={(value) => `${value}%`}
                            formatLabel={(_, index) => reportKeys[index].slice(0,3)}
                            spacing={0.2}
                            contentInset={{ left: 15, right: 15, }}
                            svg={{
                                fill: colors.appTextColor4,
                                fontSize: fontSize.small,
                                fontFamily: fontFamily.appTextRegular
                                //  fontWeight: '900'
                            }}

                        />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    )
}