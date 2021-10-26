import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { ButtonColored, ButtonColoredSmall, ButtonGroupAnimated, MainWrapper, MediumText, NoDataViewPrimary, ProductCardSecondary, Purchases, RegularText, RowWrapper, RowWrapperBasic, SkeletonListVerticalPrimary, Spacer, TitleInfoPrimary, TitlePrimary, TitleValue, Toasts, Wrapper } from '../../../components';
import { appStyles, Backend, colors, fulfillmentStatuses, fulfillmentTypes, orderStatuses, routes, sizes } from '../../../services';
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

  //redux states
  const order = useSelector(state => state.order)
  const user = useSelector(state => state.user)
  const { allOrders } = order
  const { userDetail } = user
  const { default_dealer_id, default_dealer } = userDetail


  //local states
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  //const [orders, setOrders] = useState(null)
  const [loadingAcceptIndex, setLoadingAcceptIndex] = useState(-1)
  const [loadingCancelIndex, setLoadingCancelIndex] = useState(-1)

  useFocusEffect(
    React.useCallback(() => {
      Backend.getOrders()
    }, [])
  )

  const validateOrder = (item, index) => {
    if (item.private_sale === true) {
      return true
    } else if (item.private_sale === false) {
      if (default_dealer_id) {
        return true
      } else {
        Toasts.error('Please select your nearest FFL Dealer')
      }
    }
  }
  const handleAcceptOrder = async (item, index) => {
    if (validateOrder(item)) {
      setLoadingAcceptIndex(index)
      await Backend.updateOrderStatus({
        order_id: item.id,
        status: orderStatuses.accepted
      }).
        then(async res => {
          if (item.private_sale === false && default_dealer_id) {
            await Backend.updateOrder({ order_id: item.id, seller_dealer_id: default_dealer_id })
            const fulfillmentData = {
              dealer_id: default_dealer_id,
              seller_id: userDetail.id,
              buyer_id: item.user.id,
              // buyer_dealer_id: item.buyer_dealer_id,
              // seller_dealer_id: '18',
              product_id: item.product.id,
              order_id:item.id,
              status: fulfillmentStatuses.shipmentPending,
              type:fulfillmentTypes.sellerDealer
            }
            await Backend.addFulfillment(fulfillmentData)
          }
          await Backend.getOrders()
          setLoadingAcceptIndex(-1)
          if (res) {
            Toasts.success('Order has been accepted')
          }
        })
    }
  }

  const handleCancelOrder = async (item, index) => {
    setLoadingCancelIndex(index)
    await Backend.updateOrderStatus({
      order_id: item.id,
      status: orderStatuses.cancelled
    }).
      then(async res => {
        await Backend.getOrders()
        setLoadingCancelIndex(-1)
        if (res) {
          Toasts.success('Order has been cancelled')
        }
      })
  }

  const filterOrders = () => {
    let tempOrders = []
    if (selectedTabIndex === 0) {
      tempOrders = allOrders
    } else {
      tempOrders = allOrders.filter(item => {
        return (
          selectedTabIndex === 1 ? item.status === orderStatuses.pending :
            selectedTabIndex === 2 ? item.status === orderStatuses.accepted || item.status === orderStatuses.shipping :
              selectedTabIndex === 3 ? item.status === orderStatuses.delivered :
                selectedTabIndex === 4 ? item.status === orderStatuses.completed :
                  selectedTabIndex === 5 ? item.status === orderStatuses.cancelled : null
        )
      })
    }
    return tempOrders
  }


  let filteredOrders = []
  filteredOrders = filterOrders()


  if (!allOrders) {
    return (
      <SkeletonListVerticalPrimary />
    )
  }
  return (
    <MainWrapper>
      {
        allOrders.length ?
          <>
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
              onpressAccept={handleAcceptOrder}
              onpressCancel={handleCancelOrder}
              loadingAcceptIndex={loadingAcceptIndex}
              loadingCancelIndex={loadingCancelIndex}
              ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
              ListFooterComponent={() => <Spacer height={sizes.doubleBaseMargin} />}
            />
          </>
          :
          <NoDataViewPrimary
            title="Order"
          />

      }

    </MainWrapper>
  );
}

export default Orders;
