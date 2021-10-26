import { useFocusEffect } from '@react-navigation/core';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { ButtonColoredSmall, ButtonGradient, ComponentWrapper, DashboardSeller, MainWrapper, NoDataViewPrimary, ProductCardSecondary, SkeletonListVerticalPrimary, Spacer, TinyTitle } from '../../../components';
import { appImages, appStyles, Backend, DummyData, HelpingMethods, orderStatuses, routes, sizes } from '../../../services';




function Earnings(props) {
  const { navigation } = props
  const { navigate } = navigation

  //redux states
  const order = useSelector(state => state.order)
  const user = useSelector(state => state.user)
  const { allOrders } = order
  const { reports } = user

  useFocusEffect(
    React.useCallback(() => {
      Backend.getOrders()
    }, [])
  )


  let earningHistory = []
  const getSetEarningHistory = () => {
    let tempData = []
    if (allOrders) {
      tempData = allOrders.filter(item => {
        return (
          item.status === orderStatuses.completed
        )
      })
    }
    return tempData
  }
  earningHistory = getSetEarningHistory()

  // if (!allOrders) {
  //   return (
  //     <SkeletonListVerticalPrimary />
  //   )
  // }
  return (
    <MainWrapper>
      <ScrollView>
        <Spacer height={sizes.baseMargin} />
        <DashboardSeller
          isLoading={!reports}
          title1="Earned This Month"
          title2="Earned Overall"
          title3="Pending for Clearance"
          title4="Available for Withdrawal"
          value1={reports && `$${reports.earned_thisMonth}`}
          value2={reports && `$${reports.earned_overall}`}
          value3={reports && `$${reports.clearance_pending}`}
          value4={reports && `$${reports.available_withdraw}`}

        />
        <Spacer height={sizes.doubleBaseMargin} />
        <ButtonGradient
          text="Withdraw Earnings"
          shadow
          onPress={() => navigate(routes.seller.withdrawEarnings)}
        />
        <Spacer height={sizes.doubleBaseMargin} />


        {allOrders ?
          <EarningHistory
            data={earningHistory}
            // onPressItem={(item, index) => { }}
            onPressItem={(item, index) => { navigate(routes.seller.OrderDetail, { order: item }) }}
          />
          :
          <SkeletonListVerticalPrimary />
        }

        {/* <EarningHistory
          data={earningHistory}
          onPressItem={(item, index) => { }}
        /> */}
        <Spacer height={sizes.doubleBaseMargin} />
      </ScrollView>
    </MainWrapper>
  );
}


export default Earnings;

function EarningHistory({ data, ListHeaderComponent, ListFooterComponent, onPressItem }) {

  return (
    <>
      {
        data.length ?
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            key={'key'}
            //numColumns={isGridView && 2}
            //ListHeaderComponent={ListHeaderComponent}
            ListHeaderComponent={() => {
              return (
                <ComponentWrapper>
                  <TinyTitle>Earning History</TinyTitle>
                  <Spacer height={sizes.smallMargin} />
                </ComponentWrapper>
              )
            }}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(item, index) => (index + 1).toString()}
            renderItem={({ item, index }) => {
              const { user } = item

              //product info
              let productImage = null
              let productTitle = ''
              let productAverageRating = 0
              let productReviewsCount = ''
              let productPrice = ''
              let productDiscountedPrice = ''
              if (item.product) {
                const { product } = item
                const images = product.images ? JSON.parse(product.images) : null
                productImage = images ? images[0] : null
                productTitle = product.title
                productAverageRating = product.average_rating && product.average_rating
                productReviewsCount = product.reviews_count && product.reviews_count
                productPrice = product.price
                productDiscountedPrice = product.discounted_price
              }


              //user info
              const userImage = item.user.profile_image ? item.user.profile_image : appImages.noUser
              const userName = item.user.first_name + ' ' + item.user.last_name
              return (
                <ProductCardSecondary
                  onPress={() => onPressItem(item, index)}
                  imageStyle={{ height: width(26), width: width(26) }}
                  animation={index <= 5 ? 'fadeInUp' : null}
                  duration={300 + (50 * (index + 1))}
                  containerstyle={
                    { marginBottom: sizes.marginVertical }
                  }
                  image={productImage}
                  description={productTitle}
                  price={productPrice}
                  discountedPrice={productDiscountedPrice}
                  //location={item.location}
                  date={HelpingMethods.formateDate1(item.date)}
                  rating={productAverageRating}
                  reviewCount={productReviewsCount}
                  moreInfo={true}
                  moreInfoImage={userImage}
                  moreInfoTitle={userName}
                  moreInfoSubTitle={'Buyer'}
                  moreInfoRight={
                    <ButtonColoredSmall
                      text={'$' + item.total}
                      buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, }}
                      textStyle={[appStyles.textRegular, appStyles.textWhite]}
                    />
                  }
                />
              )
            }}
          />
          :
          <NoDataViewPrimary
            title="Earning History"
          />
      }
    </>
  )
}