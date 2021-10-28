import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { InvoiceCard, MainWrapper, NoDataViewPrimary, SkeletonPrimary, Spacer } from '../../../components';
import { Backend, DummyData, HelpingMethods, routes, sizes } from '../../../services';

function Invoices(props) {
  const { navigation } = props
  const { navigate } = navigation
  //const invoices = DummyData.invoices

  //local states
  const [invoices, setInvoices] = useState(null)

  useFocusEffect(
    React.useCallback(() => {
      getSetInvoices()
    }, [])
  )
  const getSetInvoices = async () => {
    await Backend.getInvoices().
      then(res => {
        if (res) {
          setInvoices(res.invoices)
        }
      })
  }

  if (!invoices) {
    return (
      <>
      <Spacer height={sizes.baseMargin}/>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <SkeletonPrimary itemStyle={{ height: height(18), marginBottom: sizes.smallMargin }} />
          )
        })}
      </>
    )
  }
  return (
    <MainWrapper>
      {
        invoices.length ?
          <FlatList
            data={invoices}
            key={'key'}
            keyExtractor={(item, index) => index.toString}
            ItemSeparatorComponent={() => <Spacer height={sizes.marginVertical} />}
            ListHeaderComponent={() => <Spacer height={sizes.marginVertical} />}
            ListFooterComponent={() => <Spacer height={sizes.marginVertical} />}
            renderItem={({ item, index }) => {
              return (
                <InvoiceCard
                  amount={'$ ' + item.total}
                  orderNum={item.order_no}
                  date={HelpingMethods.formateDate1(item.created_at)}
                  onPress={() => navigate(routes.orderInvoice, { order: item })}
                />
              )
            }}
          />
          :
          <NoDataViewPrimary
            title="Invoices"
          />
      }
    </MainWrapper>
  );
}

export default Invoices;
