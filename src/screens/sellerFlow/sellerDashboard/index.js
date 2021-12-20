import React, { Component, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import StarRating from 'react-native-star-rating';
import { useSelector } from 'react-redux';
import { DashboardSeller, MainWrapper, MediumTitle, OptionsListPrimary, ProfileTop, RowWrapperBasic, Spacer, TinyText, Wrapper } from '../../../components';
import { appStyles, Backend, colors, DummyData, routes, sizes } from '../../../services';

const options = [
  'Products Inventory',
  'Requests', 'Orders',
  'Fulfillments', 'Earnings', 'Services',
  'Trainings', 'Coupons', 'Invoices', 'Reports',
]

function SellerDashboard(props) {
  const { navigation } = props
  const { navigate, goBack } = navigation
  //const { userData } = DummyData

  //redux states
  const user = useSelector(state => state.user)
  const { userDetail, reports } = user

  //local states
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSetSellerReports()
  }, [])

  const getSetSellerReports = () => {
    Backend.getSellerReports()
  }
  const handlePressOption = (item) => {
    if (item === 'Products Inventory') navigate(routes.seller.yourProducts)
    else if (item === 'Requests') navigate(routes.seller.requests)
    else if (item === 'Reports') navigate(routes.seller.reports)
    else if (item === 'Orders') navigate(routes.seller.orders)
    else if (item === 'Fulfillments') navigate(routes.dealer.fulfillments)
    else if (item === 'Services') navigate(routes.seller.services)
    else if (item === 'Earnings') navigate(routes.seller.earnings)
    else if (item === 'Trainings') navigate(routes.seller.trainings)
    else if (item === 'Coupons') navigate(routes.seller.coupons)
    else if (item === 'Invoices') navigate(routes.seller.invoices)
  }
  return (
    <MainWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileTop
          imageUri={userDetail.profile_image}
          title={userDetail.first_name + ' ' + userDetail.last_name}
          content={
            <Wrapper style={{ alignItems: 'flex-start', }}>
              <Spacer height={sizes.smallMargin} />
              <RowWrapperBasic>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={4.6}
                  fullStarColor={colors.rating}
                  starSize={totalSize(1.5)}
                  starStyle={{ marginRight: totalSize(0.2) }}
                />
                <Spacer width={sizes.TinyMargin} />
                <TinyText>4.6 (105)</TinyText>
              </RowWrapperBasic>
            </Wrapper>
          }
        />
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
        <Spacer height={sizes.baseMargin} />
        <OptionsListPrimary
          options={options}
          onPressOption={handlePressOption}
        />
        <Spacer height={sizes.baseMargin} />
      </ScrollView>
    </MainWrapper>
  );
}

export default SellerDashboard;
