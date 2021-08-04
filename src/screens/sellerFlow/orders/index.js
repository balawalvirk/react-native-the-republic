import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ButtonColored, ButtonColoredSmall, ButtonGroupAnimated, MainWrapper, MediumText, ProductCardSecondary, Purchases, RegularText, RowWrapper, RowWrapperBasic, Spacer, TitleInfoPrimary, TitlePrimary, TitleValue, Wrapper } from '../../../components';
import { appStyles, colors, routes, sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';
import { OrdersList } from './ordersList';


const tabs = [
  {
    title: 'All',
  },
  {
    title: 'New'
  },
  {
    title: 'Active'
  },
  {
    title: 'Delivered'
  },
  {
    title: 'Completed'
  },
  {
    title: 'Cancelled'
  }
]

function Orders(props) {
  const { navigation } = props
  const { navigate } = navigation

  //local states
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [orders, setOrders] = useState(dummyData.orders)

  const filterOrders = () => {
    let tempOrders = []
    if (selectedTabIndex === 0) {
      tempOrders = orders
    } else {
      tempOrders = orders.filter(item => {
        return (
          selectedTabIndex === 1 ? item.status === 'new' :
            selectedTabIndex === 2 ? item.status === 'active' :
              selectedTabIndex === 3 ? item.status === 'delivered' :
                selectedTabIndex === 4 ? item.status === 'completed' :
                  selectedTabIndex === 5 ? item.status === 'cancelled' : null
        )
      })
    }
    return tempOrders
  }


  let filteredOrders = []
  filteredOrders = filterOrders()

  return (
    <MainWrapper>
      <ButtonGroupAnimated
        data={tabs}
        initalIndex={selectedTabIndex}
        text='title'
        onPressButton={(item, index) => setSelectedTabIndex(index)}
        containerStyle={[{ backgroundColor: 'transparent', marginHorizontal: 0, borderBottomWidth: 1, borderBottomColor: colors.appBgColor3 }]}
        inActiveButtonStyle={{ width: width(100) / 4, paddingVertical: height(1.75), backgroundColor: 'transparent', paddingHorizontal: 0, }}
        activeButtonForceStyle={{ position: 'absolute', height: 4, bottom: 0, backgroundColor: colors.appColor1, borderRadius: 5, width: (width((100 / 4))), }}
        // activeButtonContent={<Wrapper></Wrapper>}
        activeTextStyle={[appStyles.textMedium, appStyles.textPrimaryColor]}
        inActiveTextStyle={[appStyles.textMedium, appStyles.textLightGray]}

      />
      <OrdersList
        data={filteredOrders}
        onPressOrder={(item, index) => { navigate(routes.seller.OrderDetail, { order: item }) }}
        onpressAccept={(item, index) => { }}
        onpressCancel={(item, index) => { }}
      />

    </MainWrapper>
  );
}

export default Orders;
