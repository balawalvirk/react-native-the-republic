import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ButtonColored, ButtonColoredSmall, ButtonGroupAnimated, MainWrapper, MediumText, NoDataViewPrimary, ProductCardSecondary, RegularText, RowWrapper, RowWrapperBasic, SkeletonListVerticalPrimary, Spacer, TitleInfoPrimary, TitlePrimary, TitleValue, Wrapper } from '../../../components';
import { appStyles, Backend, colors, fulfillmentStatuses, routes, sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';
import { FulfillmentsList } from './fulFillmentsList';


const tabs = [
  {
    title: 'All',
  },
  {
    title: 'In Progress'
  },
  {
    title: 'Received'
  },
  {
    title: 'Shipment Pending'
  },
  // {
  //   title: 'Delivered'
  // },
  {
    title: 'Sent For Shipment'
  },
  {
    title: 'Completed'
  },
]

function Fulfillments(props) {
  const { navigation } = props
  const { navigate } = navigation

  //local states
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [fulfillments, setFulfillments] = useState(null)
  // const fulfillments = dummyData.fulfillments

  useFocusEffect(
    React.useCallback(() => {
      getSetFulfillments()
    }, [])
  )


  const getSetFulfillments = () => {
    Backend.getFulfillments().
      then(res => {
        if (res) {
          setFulfillments(res.data)
        }
      })
  }


  const filterFulfillments = () => {
    let tempOrders = []
    if (fulfillments) {
      if (selectedTabIndex === 0) {
        tempOrders = fulfillments
      } else {
        tempOrders = fulfillments.filter(item => {
          return (
            selectedTabIndex === 1 ? item.status === fulfillmentStatuses.inProgess :
              selectedTabIndex === 2 ? item.status === fulfillmentStatuses.received :
                selectedTabIndex === 3 ? item.status === fulfillmentStatuses.shipmentPending :
                  // selectedTabIndex === 4 ? item.status === fulfillmentStatuses.delivered :
                  selectedTabIndex === 4 ? item.status === fulfillmentStatuses.sentForShipment :
                    selectedTabIndex === 5 ? item.status === fulfillmentStatuses.completed : null
          )
        })
      }
    }
    return tempOrders
  }


  let filteredFulfillments = []
  filteredFulfillments = filterFulfillments()


  if (!fulfillments) {
    return (
      <SkeletonListVerticalPrimary />
    )
  }
  return (
    <MainWrapper>
      {
        fulfillments.length ?
          <>
            <ButtonGroupAnimated
              data={tabs}
              initalIndex={selectedTabIndex}
              text='title'
              onPressButton={(item, index) => setSelectedTabIndex(index)}
              containerStyle={[{ backgroundColor: 'transparent', marginHorizontal: 0, borderBottomWidth: 1, borderBottomColor: colors.appBgColor3 }]}
              inActiveButtonStyle={{ paddingVertical: height(1.75), backgroundColor: 'transparent', }}
              activeButtonForceStyle={{ position: 'absolute', height: 4, bottom: 0, backgroundColor: colors.appColor1, borderRadius: 5, }}
              // activeButtonContent={<Wrapper></Wrapper>}
              activeTextStyle={[appStyles.textMedium, appStyles.textPrimaryColor]}
              inActiveTextStyle={[appStyles.textMedium, appStyles.textLightGray]}

            />
            <FulfillmentsList
              data={filteredFulfillments}
              onPressOrder={(item, index) => { navigate(routes.dealer.fulfillmentDetail, { item }) }}
              ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
              ListFooterComponent={() => <Spacer height={sizes.doubleBaseMargin} />}
            />
          </>
          :
          <NoDataViewPrimary
            title="Fulfillment"
          />
      }

    </MainWrapper>
  );
}

export default Fulfillments;
