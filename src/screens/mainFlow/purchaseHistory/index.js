import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ButtonGroupAnimated, MainWrapper, NoDataViewPrimary, SkeletonListVerticalPrimary, Spacer } from '../../../components';
import { appStyles, Backend, colors, orderStatuses, routes, sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';
import PurchasesList from './purchasesList'
const tabs = [
    {
        title: 'All',
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

function PurchaseHistory(props) {
    const { navigation } = props
    const { navigate } = navigation

    //local states
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [orders, setOrders] = useState(null)

    // useEffect(() => {
    //     getSetOrders()
    // }, [])
    useFocusEffect(
        React.useCallback(() => {
            getSetOrders()
        }, [])
      )
 
    const getSetOrders = async () => {
        await Backend.getUserOrders().
            then(res => {
                if (res) {
                    setOrders(res.data)
                }
            })
    }

    // const filterOrderss = () => {
    //     let tempOrders = []
    //     tempOrders = orders.filter(item => {
    //         return (
    //             selectedTabIndex === 0 ? item.status === 'active' || item.status === 'completed' :
    //                 selectedTabIndex === 1 ? item.status === 'active' :
    //                     selectedTabIndex === 2 ? item.status === 'completed' : null
    //         )
    //     })
    //     return tempOrders
    // }
    const filterOrders = () => {
        let tempOrders = []
        if (selectedTabIndex === 0) {
            tempOrders = orders
        } else {
            tempOrders = orders.filter(item => {
                return (
                    selectedTabIndex === 1 ? item.status === orderStatuses.pending || item.status ===orderStatuses.accepted ||item.status === orderStatuses.shipping :
                    selectedTabIndex === 2 ? item.status === orderStatuses.delivered : 
                        selectedTabIndex === 3? item.status === orderStatuses.completed :
                            selectedTabIndex === 4 ? item.status === orderStatuses.cancelled : null
                )
            })
        }
        return tempOrders
    }


    let filteredOrders = []
    filteredOrders = filterOrders()

    if (!orders) {
        return (
            <SkeletonListVerticalPrimary />
        )
    }
    if (!orders.length) {
        return (
            <MainWrapper>
                <NoDataViewPrimary
                    title="Purchase History"
                    showIcon
                    iconName="cart-off"
                //iconName="history"
                />
            </MainWrapper>
        )
    }
    return (
        <MainWrapper>
            <ButtonGroupAnimated
                data={tabs}
                initalIndex={selectedTabIndex}
                text='title'
                onPressButton={(item, index) => setSelectedTabIndex(index)}
                containerStyle={[{ backgroundColor: 'transparent', marginHorizontal: 0, borderBottomWidth: 1, borderBottomColor: colors.appBgColor3 }]}
                inActiveButtonStyle={{ width: width(100) / 3, paddingVertical: height(1.75), backgroundColor: 'transparent', paddingHorizontal: 0, marginLeft: 0, marginRight: 0 }}
                activeButtonForceStyle={{ position: 'absolute', height: 4, bottom: 0, backgroundColor: colors.appColor1, borderRadius: 5, width: (width((100 / 3) - 10)), left: width(5) }}
                // activeButtonContent={<Wrapper></Wrapper>}
                activeTextStyle={[appStyles.textMedium, appStyles.textPrimaryColor]}
                inActiveTextStyle={[appStyles.textMedium, appStyles.textLightGray]}
            />
            <PurchasesList
                data={filteredOrders}
                onPressItem={(item, index) => { navigate(routes.orderDetail, { order: item }) }}
                ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
            />
        </MainWrapper>
    );
}

export default PurchaseHistory;
