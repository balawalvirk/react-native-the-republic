import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ButtonColoredSmall, ComponentWrapper, DashboardSeller, IconWithText, LineHorizontal, MainWrapper, MediumTitle, RowWrapperBasic, SkeletonListVerticalPrimary, SkeletonPrimary, SkeletonProductDetails, SmallTitle, Spacer, TinyTitle, TitlePrimary, Wrapper } from '../../../components';
import { appStyles, Backend, colors, fontFamily, fontSize, sizes } from '../../../services';
import { Text as TextSvg, LinearGradient, Stop, Defs, Rect } from 'react-native-svg'
import { BarChart, Grid, YAxis, XAxis, PieChart, AreaChart } from 'react-native-svg-charts'
import { height, totalSize, width } from 'react-native-dimension';
import * as shape from 'd3-shape'
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from './skeletonPlaceholder';
import ReportGraph from './reportGraph';




function Reports() {


  //redux states
  const user = useSelector(state => state.user)
  const { userDetail, reports } = user

  //local states
  const [loading, setLoading] = useState(true)
  const [salesReportsType, setSalesReportsType] = useState('All Time')
  const [orderReportsType, setOrderReportsType] = useState('All Time')
  const [weeklySales, setWeeklySales] = useState(null)
  const [allTimeSales, setAlltimeSales] = useState(null)
  const [weeklyOrders, setWeeklyOrders] = useState(null)
  const [alltimeOrders, setAlltimeOrders] = useState(null)

  useEffect(() => {
    getAllReportsData()
  }, [])

  const getAllReportsData = async () => {
    await Backend.getSellerReports()
    getAdvanceReportd()
  }
  const getAdvanceReportd = async () => {
    await Backend.getAdvanceReports().
      then(res => {
        if (res) {
          setWeeklySales(res.weeklySales)
          setAlltimeSales(res.overall_sales)
          setWeeklyOrders(res.weeklyOrder)
          setAlltimeOrders(res.overall_orders)
        }
      })
    setLoading(false)
  }

  const orders = [50, 10, 40, 95, 85, 91, 35, 53, 24, 50, 20, 80]
  const salesReport = [100, 200, 400, 300, 500, 300, 900, 1000, 500,]

  //const result = Object.keys(weeklySales.reports).map((key) => key);

  //console.log(result);

  return (
    <MainWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer height={sizes.baseMargin} />
        <DashboardSeller
          isLoading={!reports}
          title1="Orders Received"
          title2="Orders Completed"
          title3="Earned This Month"
          title4="Earned Overall"
          value1={reports && reports.orders}
          value2={reports && reports.completed_orders}
          value3={reports && `$${reports.earned_thisMonth}`}
          value4={reports && `$${reports.earned_overall}`}
        />
        <Spacer height={sizes.doubleBaseMargin} />
        {
          !loading ?
            <>
              <ReportGraph
                title="Sales Report"
                subTitle={"$" + (salesReportsType === 'Week' ? weeklySales.total : allTimeSales.total_sales)}
                percentage={salesReportsType === 'Week' ? weeklySales.change : allTimeSales.change}
                //data={salesReport}
                data={salesReportsType === 'Week' ? weeklySales.reports : allTimeSales.reports}
                status={salesReportsType === 'Week' ? weeklySales.change_type : allTimeSales.change_type}
                onPressType={(item, index) => setSalesReportsType(item)}
              />
              <Spacer height={sizes.doubleBaseMargin} />
              <ReportGraph
                title="Orders"
                subTitle={orderReportsType === 'Week' ? weeklyOrders.total_orders : alltimeOrders.total_orders}
                percentage={orderReportsType === 'Week' ? weeklyOrders.change : alltimeOrders.change}
                //data={orders}
                data={orderReportsType === 'Week' ? weeklyOrders.reports : alltimeOrders.reports}
                status={orderReportsType === 'Week' ? weeklyOrders.change_type : alltimeOrders.change_type}
                onPressType={(item, index) => setOrderReportsType(item)}
              />
            </>
            :
            <>
              <SkeletonPlaceholder />
              <Spacer height={sizes.doubleBaseMargin} />
              <SkeletonPlaceholder />

            </>
        }
        <Spacer height={sizes.doubleBaseMargin} />
      </ScrollView>

    </MainWrapper>
  );
}

export default Reports;

