import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { ButtonColoredSmall, ComponentWrapper, DashboardSeller, IconWithText, LineHorizontal, MainWrapper, MediumTitle, RowWrapperBasic, SmallTitle, Spacer, TinyTitle, TitlePrimary, Wrapper } from '../../../components';
import { appStyles, colors, fontFamily, fontSize, sizes } from '../../../services';
import { Text as TextSvg, LinearGradient, Stop, Defs, Rect } from 'react-native-svg'
import { BarChart, Grid, YAxis, XAxis, PieChart, AreaChart } from 'react-native-svg-charts'
import { height, totalSize } from 'react-native-dimension';
import * as shape from 'd3-shape'
import { ScrollView } from 'react-native';

const ReportGraph = ({ title, subTitle, status, percentage, data, }) => {
  const [selectedType, selectType] = useState(1)
  const types = ['Week', 'All Time']

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul']
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun']
  const isLose = status === 'lose'
  const isSuccess = status === 'success'
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
                  const isSelected = index === selectedType
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
                      onPress={() => selectType(index)}
                    />
                  )
                })
              }
            </RowWrapperBasic>
          </Wrapper>
        </RowWrapperBasic>
        <Wrapper style={{ flexDirection: 'row', height: height(27.5), paddingVertical: 20, }}>
          <YAxis
            data={data}
            contentInset={{ top: 20, bottom: 0, }}
            svg={{
              fill: colors.appTextColor4,
              fontSize: fontSize.small,
              fontFamily: fontFamily.appTextRegular
              //  fontWeight: '900'
            }}
            numberOfTicks={5}
            formatLabel={(value) => `${title==='Sales Report'?'$':''}${value}`}
          />
          <Wrapper flex={1} style={{ width: '100%', paddingHorizontal: sizes.marginHorizontal / 2 }}>
            <AreaChart
              style={{ height: height(22) }}
              data={data}
              contentInset={{ top: 20, bottom: 5, right: -2.5, left: -2.5 }}
              svg={{ fill: 'url(#stockPricegradient)', strokeWidth: 1, stroke: 'url(#stockPricegradientStroke)', }}
              curve={shape.curveNatural}

            >
              <StockPriceGradient />
            </AreaChart>
            <XAxis
              style={{}}
              data={selectedType===0?weekDays:months}
             // data={weekDays}
              xAccessor={({ index }) => index}
              //scale={scale.scaleBand}
              //formatLabel={(value, index) => index}
              //formatLabel={(value) => `${value}%`}
              formatLabel={(_, index) => selectedType===0?weekDays[index]:months[index]}
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


function Reports() {

  const orders = [50, 10, 40, 95, 85, 91, 35, 53, 24, 50, 20, 80]
  const salesReport = [100, 200, 400, 300, 500, 300, 900, 1000, 500,]



  return (
    <MainWrapper>
     <ScrollView showsVerticalScrollIndicator={false}>
     <Spacer height={sizes.baseMargin} />
      <DashboardSeller
        title1="Orders Received"
        title2="Orders Completed"
        title3="Earned This Month"
        title4="Earned Overall"
        value1='25'
        value2='10'
        value3="4,679"
        value4="94,328"
      />
      <Spacer height={sizes.doubleBaseMargin} />
      <ReportGraph
        title="Sales Report"
        subTitle="$1,400"
        percentage="1.36"
        data={salesReport}
        status={'lose'}
      />
        <Spacer height={sizes.doubleBaseMargin} />
      <ReportGraph
        title="Orders"
        subTitle="25"
        percentage="2.43"
        data={orders}
        status={'success'}
      />
       <Spacer height={sizes.doubleBaseMargin} />
     </ScrollView>

    </MainWrapper>
  );
}

export default Reports;
