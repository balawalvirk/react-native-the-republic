import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { width } from 'react-native-dimension';
import { ButtonColoredSmall, ButtonGradient, ComponentWrapper, DashboardSeller, MainWrapper, ProductCardSecondary, Spacer, TinyTitle } from '../../../components';
import { appStyles, DummyData, routes, sizes } from '../../../services';




function Earnings(props) {
  const { navigation } = props
  const { navigate } = navigation

  let earningHistory = []
  const getSetEarningHistory = () => {
    let tempData = []
    for (const item of DummyData.products) {
      const obj = {
        ...item,
        date: '15 / 06 / 2021',
        amount: item.new_price
      }
      tempData.push(obj)
    }
    return tempData
  }
  earningHistory = getSetEarningHistory()
  return (
    <MainWrapper>
      <ScrollView>
        <Spacer height={sizes.baseMargin} />
        <DashboardSeller
          ordersRecieved='25'
          ordersCompleted='10'
          earnedThisMonth="4,679"
          earnedOverall="94,328"
        />
        <Spacer height={sizes.doubleBaseMargin} />
        <ButtonGradient
          text="Withdraw"
          shadow
          onPress={() => navigate(routes.seller.withdrawEarnings)}
        />
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper>
          <TinyTitle>Earning History</TinyTitle>
        </ComponentWrapper>
        <Spacer height={sizes.smallMargin} />
        <EarningHistory
          data={earningHistory}
          onPressItem={(item, index) => { }}
        />
        <Spacer height={sizes.doubleBaseMargin} />
      </ScrollView>
    </MainWrapper>
  );
}

export default Earnings;

function EarningHistory({ data, ListHeaderComponent, ListFooterComponent, onPressItem }) {

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      key={'key'}
      //numColumns={isGridView && 2}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      keyExtractor={(item, index) => (index + 1).toString()}
      renderItem={({ item, index }) => {
        const { user } = item
        return (
          <ProductCardSecondary
            onPress={() => onPressItem(item, index)}
            imageStyle={{ height: width(26), width: width(26) }}
            animation={index <= 5 ? 'fadeInUp' : null}
            duration={300 + (50 * (index + 1))}
            containerstyle={
              { marginBottom: sizes.marginVertical }
            }
            image={item.image}
            description={item.description}
            newPrice={item.new_price}
            oldPrice={item.old_price}
            //location={item.location}
            date={item.date}
            rating={item.rating}
            reviewCount={item.review_count}
            moreInfo={true}
            moreInfoImage={user.image}
            moreInfoTitle={user.name}
            moreInfoSubTitle={'Buyer'}
            moreInfoRight={
              <ButtonColoredSmall
                text={'$' + item.amount}
                buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, }}
                textStyle={[appStyles.textRegular, appStyles.textWhite]}
              />
            }
          />
        )
      }}
    />
  )
}