import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { InvoiceCard, MainWrapper, Spacer } from '../../../components';
import { DummyData, HelpingMethods, routes, sizes } from '../../../services';

function Invoices(props) {
  const { navigation } = props
  const { navigate } = navigation
  const invoices = DummyData.invoices
  return (
    <MainWrapper>
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
              amount={'$ ' + item.amount}
              orderNum={item.orderNumber}
              date={HelpingMethods.formateDate1(item.date)}
              onPress={() => navigate(routes.orderInvoice,{order:DummyData.orders[2]})}
            />
          )
        }}
      />
    </MainWrapper>
  );
}

export default Invoices;
